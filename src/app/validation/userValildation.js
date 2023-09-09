import Joi from "joi";

const registerUserValidation = Joi.object({
  uuid: Joi.string().required,
  name: Joi.string(),
  email: Joi.string()
    .email({ tlds: ["com", "net"] })
    .required(),
  password: Joi.string().required(),
});

export default registerUserValidation;
