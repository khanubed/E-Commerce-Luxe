import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { deleteUserAddressApi, saveAddressApi } from "../../features/orders/orderApi";
import { setAddresses } from "../../features/auth/authSlice";

export const AddressViewPage = () => {
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

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Fixed mismatched API invocation (was: addUserAddressApi)
      const data = await saveAddressApi(formData, accessToken);

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
      confirmButtonColor: "#dc2626",
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

                    <button
                      type="button"
                      disabled={deletingId === addr._id}
                      onClick={() => handleDeleteAddress(addr._id)}
                      className="text-slate-300 hover:text-red-600 transition-colors duration-200"
                      title="Delete Address"
                    >
                      <Trash2
                        size={15}
                        className={deletingId === addr._id ? "animate-pulse text-red-400" : ""}
                      />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}, {addr.country}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
