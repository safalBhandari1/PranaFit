import { useState } from 'react';
import { LoginFormData, RegisterFormData, AuthError } from '../types';

export const useAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateLoginForm = (data: LoginFormData): boolean => {
    if (!validateEmail(data.email)) {
      setError({ code: 'invalid-email', message: 'Please enter a valid email address' });
      return false;
    }
    if (!validatePassword(data.password)) {
      setError({ code: 'weak-password', message: 'Password must be at least 6 characters' });
      return false;
    }
    return true;
  };

  const validateRegisterForm = (data: RegisterFormData): boolean => {
    if (!data.name.trim()) {
      setError({ code: 'missing-name', message: 'Please enter your name' });
      return false;
    }
    if (!validateEmail(data.email)) {
      setError({ code: 'invalid-email', message: 'Please enter a valid email address' });
      return false;
    }
    if (!validatePassword(data.password)) {
      setError({ code: 'weak-password', message: 'Password must be at least 6 characters' });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      setError({ code: 'password-mismatch', message: 'Passwords do not match' });
      return false;
    }
    return true;
  };

  return {
    isLoading,
    setIsLoading,
    error,
    setError,
    validateLoginForm,
    validateRegisterForm,
  };
};