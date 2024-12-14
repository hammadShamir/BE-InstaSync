export const validate = <T>(payload: T, schema: any) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    throw error;
  }
  return value;
};
