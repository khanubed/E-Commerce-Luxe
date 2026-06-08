import mongoose from "mongoose";

const homeContentSchema = new mongoose.Schema(
  {
    heroData: {
      backgroundImage: {
        src: { type: String, required: true },
        alt: { type: String, default: "" },
      },
      title: { type: String, required: true },
      description: { type: String, required: true },
      primaryBtn: {
        text: { type: String, default: "Shop Now" },
        link: { type: String, default: "#" },
      },
      secondaryBtn: {
        text: { type: String, default: "Explore Lookbook" },
        link: { type: String, default: "#" },
      },
    },
    categorySection: {
      title: { type: String, default: "" },
      subtitle: { type: String, default: "" },
      categories: [
        {
          id: Number,
          to: String,
          title: String,
          count: String,
          image: String,
          alt: String,
        },
      ],
    },
    dealsSection: {
      title: { type: String, default: "Deals of the Day" },
      description: { type: String, default: "" },
      targetDate: { type: String, default: "" },
      products: [
        {
          id: Number,
          category: String,
          name: String,
          image: String,
          price: Number,
          originalPrice: Number,
          discountBadge: String,
        },
      ],
    },
    offersSection: [
      {
        id: Number,
        tag: String,
        title: String,
        description: String,
        image: String,
        buttonText: String,
        overlayClass: String,
        buttonClass: String,
        tagClass: String,
      },
    ],
  },
  { timestamps: true },
);

const HomeContent = mongoose.model("HomeContent", homeContentSchema);
export default HomeContent;
