const validate = (validationFunction) => {
  return (req, res, next) => {
    try {
      const result = validationFunction(req);

      if (result !== true) {
        return res.status(400).json({
          success: false,
          message: result || "Validation failed",
        });
      }

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
};

module.exports = validate;