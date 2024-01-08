const Joi = require("joi");
exports.schemas = {
  registerSchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().alphanum().min(6).required(),
    confirmPassword: Joi.ref("password"),
  }),
};
