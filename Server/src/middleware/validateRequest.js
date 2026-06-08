
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Don't stop at the first error; find them all!
      stripUnknown: true, // Security: remove fields not in the schema (e.g., isAdmin)
      allowUnknown: true, // Allows files/other fields handled by multer to pass through
    });

    if (error) {
      // Transform Joi errors into a key-value object for the frontend
      // Example: { title: "Title is required", price: "Price must be a number" }
      const errors = error.details.reduce((acc, curr) => {
        const key = curr.path[0];
        acc[key] = curr.message.replace(/"/g, ''); // Remove ugly quotes from Joi messages
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errors, // Sent back to React to map over inputs
      });
    }

    // Replace req.body with the sanitized/validated 'value'
    req.body = value;
    next();
  };
};

export default validateRequest