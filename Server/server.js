import app from "./src/app.js";

app.listen(process.env.PORT, () => {
  console.log("Server started at : ", process.env.PORT);
});
