import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import {
  Package, Tag, Truck, ImageIcon, Video, X, Plus, Film,
  Layers, Ruler, CheckCircle2, Loader2, Save
} from "lucide-react";

export const EditProductForm = () => {
  const { id } = useParams(); // Get product identifier from URL
  const navigate = useNavigate();

  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [images, setImages] = useState([]); // Mix of {url: string} and {file: File, preview: string}
  const [video, setVideo] = useState(null);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

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
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "In Stock",
    returnPolicy: "",
  });

  // --- 1. FETCH EXISTING DATA ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/api/product/edit/${id}`);
        const p = data.product;

        setFormData({
          title: p.title || "",
          description: p.description || "",
          brand: p.brand || "",
          category: p.category || "beauty",
          price: p.price || "",
          discountPercentage: p.discountPercentage || "",
          stock: p.stock || "",
          sku: p.sku || "",
          weight: p.weight || "",
          dimensions: p.dimensions || { width: "", height: "", depth: "" },
          warrantyInformation: p.warrantyInformation || "",
          shippingInformation: p.shippingInformation || "",
          availabilityStatus: p.availabilityStatus || "In Stock",
          returnPolicy: p.returnPolicy || "",
        });

        // Set existing images
        if (p.images) {
          setImages(p.images.map(url => ({ url, isExisting: true, preview: url })));
          // Find which index matches the current thumbnail URL
          const thumbIdx = p.images.indexOf(p.thumbnail);
          setThumbnailIndex(thumbIdx !== -1 ? thumbIdx : 0);
        }

        if (p.video) {
          setVideo({ url: p.video, isExisting: true, preview: p.video });
        }

        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        alert("Product not found");
        navigate("/admin/products");
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // --- 2. HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map(file => ({ file, preview: URL.createObjectURL(file), isExisting: false }));
    setImages(prev => [...prev, ...newImgs]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (thumbnailIndex === index) setThumbnailIndex(0);
    else if (thumbnailIndex > index) setThumbnailIndex(prev => prev - 1);
  };

  // --- 3. SUBMIT (UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();

    // Append text fields
    Object.keys(formData).forEach(key => {
      if (key === "dimensions") {
        data.append("dimensions.width", formData.dimensions.width);
        data.append("dimensions.height", formData.dimensions.height);
        data.append("dimensions.depth", formData.dimensions.depth);
      } else {
        data.append(key, formData[key]);
      }
    });

    data.append("thumbnailIndex", thumbnailIndex);

    // Filter images: send files as 'images', send remaining existing URLs as 'existingImages'
    const existingImageUrls = [];
    images.forEach((img) => {
      if (img.isExisting) {
        existingImageUrls.push(img.url);
      } else {
        data.append("images", img.file);
      }
    });
    data.append("existingImages", JSON.stringify(existingImageUrls));

    // Video handling
    if (video && !video.isExisting) {
      data.append("video", video.file);
    } else if (video && video.isExisting) {
      data.append("existingVideo", video.url);
    }

    try {
      await API.put(`/api/product/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Update failed: " + (error.response?.data?.message || "Check console"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-slate-400" /></div>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-slate-50 min-h-screen">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <section className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Edit Product</h1>
              <p className="text-slate-500 text-sm">Update technical specifications for {formData.sku}.</p>
            </div>
          </section>

          {/* Core Info */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-slate-400 border-b border-slate-50 pb-4">
              <Package size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Basics</span>
            </div>

            <div className="space-y-4">
              <InputField label="Product Title" name="title" value={formData.title} onChange={handleInputChange} />
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Description</label>
                <textarea 
                  name="description" rows="4" 
                  value={formData.description}
                  className="w-full mt-1 px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Brand" name="brand" value={formData.brand} onChange={handleInputChange} />
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
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

          {/* Pricing & Specs (Shared logic with Add page) */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField label="Price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
              <InputField label="Stock" name="stock" type="number" value={formData.stock} onChange={handleInputChange} />
              <InputField label="Weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} />
              <InputField label="SKU" name="sku" value={formData.sku} onChange={handleInputChange} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <InputField label="Width" name="dimensions.width" type="number" value={formData.dimensions.width} onChange={handleInputChange} />
              <InputField label="Height" name="dimensions.height" type="number" value={formData.dimensions.height} onChange={handleInputChange} />
              <InputField label="Depth" name="dimensions.depth" type="number" value={formData.dimensions.depth} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        {/* Media & Action */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <ImageIcon size={16} className="text-amber-400" /> Manage Media
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {images.map((img, i) => (
                <div key={i} className={`relative aspect-square rounded-[1.5rem] overflow-hidden border-2 transition-all group ${thumbnailIndex === i ? "border-amber-400" : "border-white/10"}`}>
                  <img src={img.preview} alt="" className="w-full h-full object-cover" />
                  {thumbnailIndex === i && (
                    <div className="absolute top-2 left-2 bg-amber-400 text-slate-900 p-1 rounded-full"><CheckCircle2 size={14} /></div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity">
                    <button type="button" onClick={() => setThumbnailIndex(i)} className="text-[9px] font-black uppercase px-3 py-1.5 bg-white text-slate-900 rounded-full">Set Thumb</button>
                    <button type="button" onClick={() => removeImage(i)} className="p-1.5 bg-red-500 rounded-full"><X size={14} /></button>
                  </div>
                </div>
              ))}
              <label className="aspect-square rounded-[1.5rem] border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5">
                <Plus size={20} /><input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full py-5 bg-amber-400 text-slate-900 rounded-[2rem] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-amber-300 transition-all"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Save size={18}/> Update Product</>}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div className="space-y-1">
    <label className="text-[9px] font-black uppercase text-slate-400 ml-1">{label}</label>
    <input 
      type={type} name={name} value={value}
      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-slate-900 transition-all" 
      onChange={onChange} 
    />
  </div>
);