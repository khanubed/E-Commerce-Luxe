import Joi from "joi";

export const productValidationSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().required(),
  brand: Joi.string().required(),
  category: Joi.string().required(),

  // Numbers arriving as strings will be auto-converted by Joi
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  discountPercentage: Joi.number().min(0).max(100).default(0),
  sku: Joi.string().required(),
  weight: Joi.number().positive().required(),

  dimensions: Joi.object({
    width: Joi.number().positive().required(),
    height: Joi.number().positive().required(),
    depth: Joi.number().positive().required(),
  }).required(),

  // The index selected in React
  thumbnailIndex: Joi.number().integer().min(0).default(0),

  // Logistics fields
  warrantyInformation: Joi.string().optional(),
  shippingInformation: Joi.string().optional(),
  returnPolicy: Joi.string().optional(),
  availabilityStatus: Joi.string()
    .valid("In Stock", "Low Stock", "Out of Stock")
    .default("In Stock"),
}).unknown(true); // Allows Multer's file fields to pass through
