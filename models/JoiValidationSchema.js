const Joi = require("joi");
exports.schemas = {
  registerSchema: Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .trim()
      .required(),
    password: Joi.string().alphanum().min(6).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Password and Confirm Password do not match",
      }),
  }),
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
