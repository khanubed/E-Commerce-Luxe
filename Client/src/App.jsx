import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { router } from "./router/router.jsx";
import { setCredentials, setLoading } from "./features/auth/authSlice.js";
import API from "./api/axios.js";

const App = () => {
  const dispatch = useDispatch();
  // Local state to keep the router unmounted until the network check completes
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Ensure your server is configured to read cookies (withCredentials: true)
        // if you aren't storing the token explicitly in localStorage!
        const response = await API.get("/api/auth/me");

        if (response.data.success) {
          dispatch(
            setCredentials({
              user: response.data.user,
            }),
          );
          console.log(response.data)
          console.log("Authentication successfully initialized.");
        }
      } catch (error) {
        console.warn("Session verification failed: User is unauthenticated.");
      } finally {
        dispatch(setLoading(false));
        // The check is complete — safe to unlock the UI layer
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  // 🛑 THE LOADING GATE: Do not evaluate routes while the request is in flight
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-slate-700 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            SYS_BOOT: Verifying Core Session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "0px",
            background: "#020617",
            color: "#fff",
            padding: "16px",
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "0.2em",
            border: "1px solid #ffffff10",
            textTransform: "uppercase",
          },
          success: {
            iconTheme: {
              primary: "#d97706", // amber-600
              secondary: "#fff",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
