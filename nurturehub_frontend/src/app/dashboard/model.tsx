export interface userDTO {
    id: string,
    name: string,
    email: string,
    phone: string
}

export interface PasswordFormState {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}