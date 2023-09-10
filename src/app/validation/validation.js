import ErrorException from "../../error/ErrorException.js";

const validation = (schema, request) => {
  const validation = schema.validate(request);
  if (validation.error) {
    throw new ErrorException(400, validation.error.details[0].message);
  }
  return validation;
};

export default validation;
