import Joi from "joi";

const sendMediaValidation = Joi.object({
  name: Joi.string().required(),
  nominal: Joi.number().required(),
  message: Joi.string().required(),
  linkMedia: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  receiverId: Joi.string().required(),
});

export default { sendMediaValidation };
