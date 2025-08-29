export interface userDTO {
    name: string,
    email: string,
    phone: string
}

export interface PasswordFormState {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}