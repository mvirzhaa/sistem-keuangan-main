export function validateEmail(email: string): string {
  if (!email) return "Email wajib diisi";
  if (!/\S+@\S+\.\S+/.test(email)) return "Format email tidak valid";
  return "";
}

export function validatePassword(password: string): string {
  if (!password) return "Password wajib diisi";
  if (password.length < 6) return "Password minimal 6 karakter";
  return "";
}

export interface LoginFormValidationResult {
  email: string;
  password: string;
  isValid: boolean;
}

export function validateLoginForm(
  email: string,
  password: string,
): LoginFormValidationResult {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  return {
    email: emailError,
    password: passwordError,
    isValid: !emailError && !passwordError,
  };
}
