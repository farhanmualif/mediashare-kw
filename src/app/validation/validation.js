const validation = (schema, request) => {
  const validation = schema.validate(request);
  if (validation.error) {
    throw validation.error.details;
  }
  return validation;
};

export default validation;
