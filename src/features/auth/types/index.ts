// export interface LoginFormData {
//     email: string;
//     password: string;
//   }
  
//   export interface RegisterFormData {
//     name: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//   }
  
//   export interface AuthError {
//     code: string;
//     message: string;
//   }
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'member' | 'gym_owner'; // ADDED: role field
  phoneNumber?: string; // ADDED: optional phone
}

export interface AuthError {
  code: string;
  message: string;
}