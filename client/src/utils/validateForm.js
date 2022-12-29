export const validateForm = (inputs) => {
  let error = {};
  const messError = "Vui lòng điền vào mục này!";

  if (!inputs.email.trim()) {
    error.email = messError;
  }
  if (!inputs.password.trim()) {
    error.password = messError;
  }

  return error;
} 