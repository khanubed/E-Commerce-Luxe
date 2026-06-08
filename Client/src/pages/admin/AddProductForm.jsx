import React, { useState } from "react";
import API from "../../api/axios";
import {
  Package,
  Tag,
  Truck,
  ShieldCheck,
  ImageIcon,
  Video,
  X,
  Plus,
  Film,
  Layers,
  Ruler,
  Info,
  CheckCircle2,
} from "lucide-react";

export const AddProductForm = () => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [thumbnailIndex, setThumbnailIndex] = useState(0); // NEW: Track selection

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "beauty",
    price: "",
    discountPercentage: "",
    stock: "",
    sku: "",
    weight: "",
    dimensions: { width: "", height: "", depth: "" },
    warrantyInformation: "1 month warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 1,
    tags: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setVideo({ file, preview: URL.createObjectURL(file) });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    // Reset selection logic
    if (thumbnailIndex === index) {
      setThumbnailIndex(0); // Default to first if selected was deleted
    } else if (thumbnailIndex > index) {
      setThumbnailIndex((prev) => prev - 1); // Shift index back to stay on same image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      return alert("Please upload at least one image.");
    }

    const data = new FormData();

    // 1. Append Top-Level Text Fields
    // We exclude dimensions because it's an object; we handle it separately
    Object.keys(formData).forEach((key) => {
      if (key !== "dimensions") {
        data.append(key, formData[key]);
      }
    });

    // 2. Append Nested Dimensions (Flattened for FormData)
    // Our backend 'formatProductData' middleware will look for these keys
    data.append("dimensions.width", formData.dimensions.width);
    data.append("dimensions.height", formData.dimensions.height);
    data.append("dimensions.depth", formData.dimensions.depth);

    // 3. Append the Thumbnail Choice
    data.append("thumbnailIndex", thumbnailIndex);

    // 4. Append Image Files
    images.forEach((imgObj) => {
      data.append("images", imgObj.file); // 'images' matches upload.fields([{ name: 'images' }...])
    });

    // 5. Append Video File
    if (video) {
      data.append("video", video.file); // 'video' matches upload.fields([{ name: 'video' }...])
    }

    try {
      const response = await API.post(
        "/api/product/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Success:", response.data);
      alert("Product published successfully!");
      // Optional: Reset form or redirect
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.errors
        ? error.response.data.errors.join("\n")
        : "Server Error";
      alert("Validation failed:\n" + errorMsg);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-slate-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* --- LEFT & CENTER: Core Details --- */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
              Create Product
            </h1>
            <p className="text-slate-500 text-sm">
              Fill in the technical specifications and catalog details.
            </p>
          </section>

          {/* General Information */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-slate-400 border-b border-slate-50 pb-4">
              <Package size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Product Basics
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full mt-1 px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium"
                  placeholder="e.g. Velvet Midnight Loafer"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  required
                  className="w-full mt-1 px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                  placeholder="Detailed product story and features..."
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl text-sm"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl text-sm appearance-none"
                  onChange={handleInputChange}
                >
                  <option value="beauty">Beauty</option>
                  <option value="fragrances">Fragrances</option>
                  <option value="furniture">Furniture</option>
                  <option value="groceries">Groceries</option>
                  <option value="home-decoration">Home Decoration</option>
                  <option value="kitchen-accessories">
                    Kitchen Accessories
                  </option>
                  <option value="laptops">Laptops</option>
                  <option value="mens-shirts">Men's Shirts</option>
                  <option value="mens-shoes">Men's Shoes</option>
                  <option value="mens-watches">Men's Watches</option>
                  <option value="mobile-accessories">Mobile Accessories</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="skin-care">Skin Care</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="sports-accessories">Sports Accessories</option>
                  <option value="sunglasses">Sunglasses</option>
                  <option value="tablets">Tablets</option>
                  <option value="tops">Tops</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="womens-bags">Women's Bags</option>
                  <option value="womens-dresses">Women's Dresses</option>
                  <option value="womens-jewellery">Women's Jewellery</option>
                  <option value="womens-shoes">Women's Shoes</option>
                  <option value="womens-watches">Women's Watches</option>
                </select>
              </div>
            </div>
          </div>

          {/* Inventory & Pricing */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 border-b border-slate-50 pb-4 mb-6">
              <Layers size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Inventory & Pricing
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                label="Price ($)"
                name="price"
                type="number"
                onChange={handleInputChange}
              />
              <InputField
                label="Discount %"
                name="discountPercentage"
                type="number"
                onChange={handleInputChange}
              />
              <InputField
                label="Stock Qty"
                name="stock"
                type="number"
                onChange={handleInputChange}
              />
              <InputField
                label="SKU"
                name="sku"
                type="text"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Dimensions & Weight */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 border-b border-slate-50 pb-4 mb-6">
              <Ruler size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Physical Specs
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                label="Weight"
                name="weight"
                type="number"
                onChange={handleInputChange}
              />
              <InputField
                label="Width"
                name="dimensions.width"
                type="number"
                onChange={handleInputChange}
              />
              <InputField
                label="Height"
                name="dimensions.height"
                type="number"
                onChange={handleInputChange}
              />
              <InputField
                label="Depth"
                name="dimensions.depth"
                type="number"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Media & Actions --- */}
        <div className="space-y-8">
          {/* Media Section */}
          <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <ImageIcon size={16} className="text-amber-400" /> Media Assets
            </h3>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`relative aspect-square rounded-[1.5rem] overflow-hidden border-2 transition-all group ${
                    thumbnailIndex === i
                      ? "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                      : "border-white/10"
                  }`}
                >
                  <img
                    src={img.preview}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  {/* Selection Indicator */}
                  {thumbnailIndex === i && (
                    <div className="absolute top-2 left-2 bg-amber-400 text-slate-900 p-1 rounded-full shadow-lg">
                      <CheckCircle2 size={14} />
                    </div>
                  )}

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setThumbnailIndex(i)}
                      className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full transition-all ${
                        thumbnailIndex === i
                          ? "bg-amber-400 text-slate-900"
                          : "bg-white text-slate-900 hover:bg-amber-400"
                      }`}
                    >
                      {thumbnailIndex === i ? "Selected Thumb" : "Set as Thumb"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="p-1.5 bg-red-500 rounded-full hover:scale-110 transition-transform"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <label className="aspect-square rounded-[1.5rem] border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
                <Plus size={20} />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Video Preview */}
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">
                Showcase Video
              </label>
              {!video ? (
                <label className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                  <Film size={20} className="text-amber-400" />
                  <span className="text-xs font-bold">Add Video</span>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
                  <video
                    src={video.preview}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setVideo(null)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Logistics Summary */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Truck size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Logistics
              </span>
            </div>
            <select
              name="shippingInformation"
              className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold"
              onChange={handleInputChange}
            >
              <option>Ships in 1-2 business days</option>
              <option>Ships in 3-5 business days</option>
            </select>
            <select
              name="availabilityStatus"
              className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold"
              onChange={handleInputChange}
            >
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.25em] shadow-xl shadow-slate-200 hover:bg-black transition-all transform active:scale-95"
          >
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, type, onChange }) => (
  <div className="space-y-1">
    <label className="text-[9px] font-black uppercase text-slate-400 ml-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-slate-900 transition-all"
      onChange={onChange}
    />
  </div>
);
