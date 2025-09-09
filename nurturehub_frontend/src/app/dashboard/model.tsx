export interface userDTO {
    id: string,
    name: string,
    email: string,
    phone: string,
    dateOfBirth: Date,
}

export interface PasswordFormState {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}