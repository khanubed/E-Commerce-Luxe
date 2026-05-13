import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  X,
  Star,
  Edit3,
  Trash2,
  Package,
  Settings,
  Loader2,
  Save,
  Image as ImageIcon,
  Tag,
  Truck,
  ShieldCheck,
  Box,
  Barcode,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProductsManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate()

  // 1. DATA INITIALIZATION (Mapping to your specific JSON format)
  useEffect(() => {
    // Simulating API load with your provided data
    const mockData = [
      {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 10.48,
        rating: 2.56,
        stock: 99,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        sku: "BEA-ESS-ESS-001",
        weight: 4,
        dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
        warrantyInformation: "1 week warranty",
        shippingInformation: "Ships in 3-5 business days",
        availabilityStatus: "In Stock",
        returnPolicy: "No return policy",
        minimumOrderQuantity: 48,
        meta: {
          barcode: "5784719087687",
          createdAt: "2025-04-30T09:41:02.053Z",
        },
        images: [
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      },
    ];
    setProducts(mockData);
    setIsLoading(false);
  }, []);

  const toggleProductStatus = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)),
    );
  };

  const handleUpdateField = (path, value) => {
    const keys = path.split(".");
    setSelectedProduct((prev) => {
      const draft = { ...prev };
      let current = draft;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return draft;
    });
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center font-black uppercase text-slate-400 animate-pulse tracking-widest">
        Initialising Database...
      </div>
    );

  return (
    <div className="relative min-h-screen bg-[#fafafa] p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
            Product Intelligence
          </h2>
          <p className="text-slate-500 font-bold text-[10px] tracking-widest uppercase mt-1">
            Full-Schema Control Panel
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all"
        >
          Create New Entry
        </button>
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Product
              </th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr
                key={p.id}
                className={`group transition-all ${!p.isActive ? "opacity-50 grayscale-[0.5]" : ""}`}
              >
                <td className="p-8">
                  {/* Status Toggle in Table */}
                  <button
                    onClick={() => toggleProductStatus(p.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center ${p.isActive ? "bg-emerald-500" : "bg-slate-300"}`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 transform ${p.isActive ? "translate-x-7" : "translate-x-1"}`}
                    />
                  </button>
                </td>
                <td className="p-8">
                  <div className="flex items-center gap-4">
                    <img
                      src={p.thumbnail}
                      className="w-12 h-12 rounded-xl object-cover"
                      alt=""
                    />
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {p.title}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        {p.sku}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-8 text-right">
                  <button
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsDrawerOpen(true);
                    }}
                    className="p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                  >
                    <Settings size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FULL-SCHEMA DRAWER */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-4xl bg-white z-50 shadow-2xl p-12 overflow-y-auto animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                Master Data Entry
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-3 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-12">
              {/* SECTION: Basic Identity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <DataInput
                    label="Product Title"
                    value={selectedProduct?.title}
                    onChange={(v) => handleUpdateField("title", v)}
                  />
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                      Description
                    </label>
                    <textarea
                      value={selectedProduct?.description}
                      onChange={(e) =>
                        handleUpdateField("description", e.target.value)
                      }
                      className="w-full p-5 bg-slate-50 rounded-2xl border-none font-medium text-sm text-slate-600 min-h-[120px] focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-2 border-2 border-dashed border-slate-200 rounded-[2rem] aspect-square flex flex-col items-center justify-center text-slate-300">
                    {selectedProduct?.thumbnail ? (
                      <img
                        src={selectedProduct.thumbnail}
                        className="w-full h-full object-cover rounded-[1.5rem]"
                        alt=""
                      />
                    ) : (
                      <ImageIcon size={40} />
                    )}
                  </div>
                  <DataInput
                    label="Category"
                    value={selectedProduct?.category}
                    onChange={(v) => handleUpdateField("category", v)}
                  />
                </div>
              </div>

              {/* SECTION: Logistics & Hardware */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 bg-slate-50 rounded-[2.5rem]">
                <DataInput
                  label="Price ($)"
                  value={selectedProduct?.price}
                  onChange={(v) => handleUpdateField("price", v)}
                  type="number"
                />
                <DataInput
                  label="Discount (%)"
                  value={selectedProduct?.discountPercentage}
                  onChange={(v) => handleUpdateField("discountPercentage", v)}
                  type="number"
                />
                <DataInput
                  label="Stock"
                  value={selectedProduct?.stock}
                  onChange={(v) => handleUpdateField("stock", v)}
                  type="number"
                />
                <DataInput
                  label="Weight (kg)"
                  value={selectedProduct?.weight}
                  onChange={(v) => handleUpdateField("weight", v)}
                  type="number"
                />
              </div>

              {/* SECTION: Dimensions (Nested Object) */}
              <div className="space-y-6">
                <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-900">
                  <Box size={16} /> Package Dimensions (cm)
                </h4>
                <div className="grid grid-cols-3 gap-6">
                  <DataInput
                    label="Width"
                    value={selectedProduct?.dimensions?.width}
                    onChange={(v) => handleUpdateField("dimensions.width", v)}
                  />
                  <DataInput
                    label="Height"
                    value={selectedProduct?.dimensions?.height}
                    onChange={(v) => handleUpdateField("dimensions.height", v)}
                  />
                  <DataInput
                    label="Depth"
                    value={selectedProduct?.dimensions?.depth}
                    onChange={(v) => handleUpdateField("dimensions.depth", v)}
                  />
                </div>
              </div>

              {/* SECTION: Compliance & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-10">
                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-900">
                    <ShieldCheck size={16} /> Warranty & Policy
                  </h4>
                  <DataInput
                    label="Warranty"
                    value={selectedProduct?.warrantyInformation}
                    onChange={(v) =>
                      handleUpdateField("warrantyInformation", v)
                    }
                  />
                  <DataInput
                    label="Return Policy"
                    value={selectedProduct?.returnPolicy}
                    onChange={(v) => handleUpdateField("returnPolicy", v)}
                  />
                </div>
                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-900">
                    <Truck size={16} /> Shipping Intel
                  </h4>
                  <DataInput
                    label="Shipping Status"
                    value={selectedProduct?.shippingInformation}
                    onChange={(v) =>
                      handleUpdateField("shippingInformation", v)
                    }
                  />
                  <DataInput
                    label="Availability"
                    value={selectedProduct?.availabilityStatus}
                    onChange={(v) => handleUpdateField("availabilityStatus", v)}
                  />
                </div>
              </div>

              {/* SECTION: Metadata & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-10 pb-10">
                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-900">
                    <Barcode size={16} /> Identification
                  </h4>
                  <DataInput
                    label="SKU Code"
                    value={selectedProduct?.sku}
                    onChange={(v) => handleUpdateField("sku", v)}
                  />
                  <DataInput
                    label="Barcode"
                    value={selectedProduct?.meta?.barcode}
                    onChange={(v) => handleUpdateField("meta.barcode", v)}
                  />
                </div>
                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-900">
                    <Tag size={16} /> Tags & SEO
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct?.tags?.map((t, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-xl"
                      >
                        {t}
                      </span>
                    ))}
                    <button
                      type="button"
                      className="p-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* STICKY FOOTER ACTIONS */}
              <div className="sticky bottom-0 bg-white pt-6 pb-2 border-t border-slate-100 flex gap-4">
                <button
                  type="button"
                  className="flex-grow flex items-center justify-center gap-3 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl hover:bg-black transition-all"
                >
                  <Save size={18} /> Commit Changes to Database
                </button>
                <button
                  type="button"
                  className="px-10 py-6 bg-red-50 text-red-600 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-red-100 transition-all"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

// HELPER COMPONENT FOR CLEANER CODE
const DataInput = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-1 w-full">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
      {label}
    </label>
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-5 bg-slate-50 border-none rounded-2xl font-bold text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-200"
    />
  </div>
);
