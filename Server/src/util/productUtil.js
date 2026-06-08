export const formatProductData = (req, res, next) => {
  // console.log("formatProductData called");
  // console.log("next type:", typeof next);

  if (req.body?.['dimensions.width']) {
    req.body.dimensions = {
      width: req.body['dimensions.width'],
      height: req.body['dimensions.height'],
      depth: req.body['dimensions.depth'],
    };

    delete req.body['dimensions.width'];
    delete req.body['dimensions.height'];
    delete req.body['dimensions.depth'];
  }

  if (typeof next === "function") {
    return next();
  }

  console.error("next is not a function");
};