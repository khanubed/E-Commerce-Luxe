import { useState, useEffect } from "react";
import { Loader2, PackageX } from "lucide-react";
import toast from "react-hot-toast";
import { OrderRow } from "../../features/orders/components/OrderRow";
import { getUserOrdersApi } from "../../features/orders/orderApi";

export const OrdersViewPage = () => {
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