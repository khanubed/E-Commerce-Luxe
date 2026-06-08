import {
  Bell,
  Fingerprint,
  Lock,
  MapPin,
  Plus,
  Trash2,
  Loader2,
  PackageX,
  User,
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { OrderRow } from "./OrderRow";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  deleteUserAddressApi,
  getUserOrdersApi,
  saveAddressApi,
} from "../../services/orderApi";
import { setAddresses } from "../../features/auth/authSlice";

// 1. DASHBOARD VIEW
export const DashboardView = () => {
  const { user } = useOutletContext();

  return (
    <div className="space-y-12">
      <section className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 ring-8 ring-slate-50">
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
            <User size={24} />
          </div>
        </div>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            {user.name}
          </h1>
          <p className="text-slate-500 font-medium">
            {user.tier} Member since May 2026
          </p>
        </div>
        <button
          onClick={() => setActiveTab("Settings")}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest"
        >
          Edit Profile
        </button>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Orders" value="24" />
        <StatCard label="Reward Points" value="1,250" />
        <StatCard label="Wishlist" value="12 Items" />
      </div>
    </div>
  );
};

// 2. ORDERS VIEW
export const OrdersView = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getUserOrdersApi();
        if (data.success) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Failed fetching orders:", error);
        toast.error("Could not synchronize historical order listings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-lg font-black uppercase tracking-widest">
          Your Orders
        </h2>
        <span className="text-xs bg-slate-100 font-black px-3 py-1 rounded-full text-slate-600">
          {orders.length} TOTAL
        </span>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
          <Loader2 className="animate-spin text-slate-900" size={32} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Retrieving Purchases...
          </span>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
          <PackageX size={48} className="text-slate-300" />
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">
            No orders placed yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  id={`#${order._id.slice(-7).toUpperCase()}`}
                  dbOrderId={order._id}
                  status={order.orderStatus}
                  total={order.totalAmount.toFixed(2)}
                  date={new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  rawDate={order.createdAt}
                  order={order}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const AddressView = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.auth.user?.addresses || []);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    type: "Home",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- SAVE ADDRESS ---
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Execute abstracted API Call function
      const data = await addUserAddressApi(formData, accessToken);

      if (data.success) {
        toast.success(data.message || "Address added successfully!");
        dispatch(setAddresses(data.addresses));
        setFormData({
          fullName: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          type: "Home",
        });
        setShowForm(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    const result = await Swal.fire({
      title: "Delete Address?",
      text: "Are you sure you want to delete this address?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626", // red
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setDeletingId(addressId);

    try {
      const data = await deleteUserAddressApi(addressId);

      if (data.success) {
        toast.success(data.message || "Address deleted successfully");
        dispatch(setAddresses(data.addresses));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete address.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black uppercase tracking-widest">
          Address Book
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          <Plus size={14} /> Add New
        </button>
      </div>

      {/* NEW ADDRESS FORM */}
      {showForm && (
        <form
          onSubmit={handleSaveAddress}
          className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-900 shadow-2xl space-y-4"
        >
          <h3 className="font-black uppercase tracking-widest text-xs mb-2">
            New Address Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider mb-1 block text-slate-500">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Alex Sterling"
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider mb-1 block text-slate-500">
                Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="Home"
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-black uppercase tracking-wider mb-1 block text-slate-500">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                required
                value={formData.street}
                onChange={handleInputChange}
                placeholder="Suite 400, Alpha Plaza"
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider mb-1 block text-slate-500">
                City
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Indore"
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider mb-1 block text-slate-500">
                State
              </label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleInputChange}
                placeholder="MP"
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider mb-1 block text-slate-500">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                required
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="452010"
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-black uppercase tracking-wider mb-1 block text-slate-500">
                Country
              </label>
              <input
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleInputChange}
                placeholder="India"
                className="w-full p-3 border rounded-xl"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-grow py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest disabled:bg-slate-400"
            >
              {isSubmitting ? "Saving..." : "Save Address"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-8 py-4 bg-slate-100 text-slate-400 rounded-xl font-black uppercase text-[10px] tracking-widest"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* RENDER DYNAMIC DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.length === 0 ? (
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider col-span-2">
            No addresses saved yet.
          </p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between group relative hover:border-slate-400 transition-all"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-900">{addr.fullName}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-black px-2 py-1 rounded uppercase tracking-wider">
                      {addr.type}
                    </span>

                    {/* DELETE BUTTON */}
                    <button
                      type="button"
                      disabled={deletingId === addr._id}
                      onClick={() => handleDeleteAddress(addr._id)}
                      className="text-slate-300 hover:text-red-600 transition-colors duration-200"
                      title="Delete Address"
                    >
                      <Trash2
                        size={15}
                        className={
                          deletingId === addr._id
                            ? "animate-pulse text-red-400"
                            : ""
                        }
                      />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  {addr.street}, {addr.city}, {addr.state} - {addr.postalCode},{" "}
                  {addr.country}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 4. PAYMENT VIEW


// 5. SECURITY VIEW
export const SecurityView = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-black uppercase tracking-widest">
      Security Settings
    </h2>
    <div className="grid gap-4">
      <SecurityOption
        icon={<Lock size={18} />}
        title="Password"
        desc="Last changed 3 months ago"
        action="Change"
      />
      <SecurityOption
        icon={<Fingerprint size={18} />}
        title="2-Step Verification"
        desc="Currently Enabled"
        action="Manage"
      />
      <SecurityOption
        icon={<Bell size={18} />}
        title="Login Alerts"
        desc="Email notifications for new logins"
        action="Config"
      />
    </div>
  </div>
);

// 6. SETTINGS VIEW (Edit Profile)
export const SettingsView = () => {
  const { user } = useOutletContext();

  return (
    <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
      <div>
        <h2 className="text-xl font-black uppercase tracking-widest mb-2">
          Account Settings
        </h2>
        <p className="text-slate-400 text-sm">
          Update your public profile and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField label="Display Name" value={user.name} />
        <InputField label="Email Address" value={user.email} />
        <InputField label="Phone Number" value={user.phone} />
        <div className="flex items-end">
          <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE MINI COMPONENTS ---

const InputField = ({ label, value }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-300"
    />
  </div>
);

const AddressCard = ({ title, address, type }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-slate-900 transition-all group">
    <div className="flex justify-between mb-6">
      <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
        <MapPin size={18} />
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
        {type}
      </span>
    </div>
    <h4 className="text-xl font-black tracking-tighter mb-2">{title}</h4>
    <p className="text-sm text-slate-400 leading-relaxed">{address}</p>
  </div>
);

const SecurityOption = ({ icon, title, desc, action }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 flex justify-between items-center">
    <div className="flex items-center gap-6">
      <div className="p-3 bg-slate-50 text-slate-900 rounded-2xl">{icon}</div>
      <div>
        <p className="font-black text-xs uppercase tracking-widest">{title}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
      {action}
    </button>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
      {label}
    </p>
    <p className="text-3xl font-black text-slate-900 tracking-tighter">
      {value}
    </p>
  </div>
);
