import app from "./src/app.js";

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Local dev engine initialized at: http://localhost:${PORT}`);
  });
}
