import Joi from "joi";

const sendMediaValidation = Joi.object({
  uuid: Joi.string().required(),
  name: Joi.string().required(),
  grossAmount: Joi.number().default(0),
  message: Joi.string().required(),
  linkMedia: Joi.string().required(),
  recipientsName: Joi.string().required(),
  duration: Joi.string().required().allow(""),
  startAtSecond: Joi.string().required(),
  typeMedia: Joi.string().required(),
  method: Joi.string().required(),
});

export default { sendMediaValidation };
