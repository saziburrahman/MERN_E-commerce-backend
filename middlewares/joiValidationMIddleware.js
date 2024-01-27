const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      errors: { wrap: { label: "" } },
    });
    if (error) {
      const errorList = error.details.map((err) => err.message);
      res.status(400);
      throw new Error(errorList);
      // return res.status(500).json(errorList);
    }
    next();
  };
};

module.exports = validation;
