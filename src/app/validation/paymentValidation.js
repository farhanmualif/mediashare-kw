import Joi from "joi";

const paymentValidation = Joi.object({
  uuid: Joi.string().required(),
  method: Joi.string().required(),
  grossAmount: Joi.number().required(),
  mediaId: Joi.number().required(),
});

export default { paymentValidation };
