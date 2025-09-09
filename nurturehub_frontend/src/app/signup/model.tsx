export interface RegisterDTO {
  name: string;
  email: string;
  dateOfBirth?: Date;
  phone: string;
  password: string;
  confirmPassword: string;
}
