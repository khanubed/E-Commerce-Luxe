
import express from "express"
import { addUserAddress, deleteUserAddress, getMe, login, logout, refreshAccessToken, register } from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const authRouter = express.Router()

authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.post("/refresh", refreshAccessToken);
authRouter.get("/me", protect, getMe);
authRouter.post("/add-address", protect, addUserAddress);
authRouter.delete("/delete-address/:addressId", protect, deleteUserAddress);

authRouter.post("/logout", logout);

export default authRouter