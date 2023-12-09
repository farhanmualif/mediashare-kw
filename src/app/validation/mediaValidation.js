import Joi from "joi";

const sendMediaValidation = Joi.object({
  name: Joi.string().required(),
  nominal: Joi.number().default(0),
  message: Joi.string().required(),
  linkMedia: Joi.string().required(),
  paymentMethod: Joi.string().allow(""),
  receiverId: Joi.string().required(),
  duration: Joi.string().required().allow(""),
  startAtSecond: Joi.string().required(),
  typeMedia: Joi.string().required(),
});

export default { sendMediaValidation };
