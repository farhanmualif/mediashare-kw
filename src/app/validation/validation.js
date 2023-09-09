const validation = (schema, request) => {
  const valid = schema.validate(request);
  if (valid.isError) {
    return valid.isError;
  } else {
    return valid.value;
  }
};

export default validation;
