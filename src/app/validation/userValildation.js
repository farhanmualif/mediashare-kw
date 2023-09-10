import Joi from "joi";

const registerUserValidation = Joi.object({
  uuid: Joi.string().required,
  name: Joi.string(),
  email: Joi.string()
    .email({ tlds: ["com", "net"] })
    .required(),
  password: Joi.string().required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export { registerUserValidation, loginUserValidation };
