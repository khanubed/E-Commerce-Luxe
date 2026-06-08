import express from "express"
import { getAdminOrderStats, getAdminOrders, updateOrderStatus } from "../controllers/admin.order.controller.js";
import { protect , protectAdmin } from "../middleware/auth.middleware.js";

const adminOrderRouter = express.Router();

   

adminOrderRouter.get('/',protect , protectAdmin , getAdminOrders);
adminOrderRouter.get('/stats',protect , protectAdmin , getAdminOrderStats);
adminOrderRouter.patch('/:id/status',protect , protectAdmin , updateOrderStatus);

export default adminOrderRouter;