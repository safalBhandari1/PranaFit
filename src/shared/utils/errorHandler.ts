// src/shared/utils/errorHandler.ts
export class UserFriendlyError extends Error {
    constructor(
      message: string,
      public userMessage: string,
      public code?: string,
      public retryable = false
    ) {
      super(message);
      this.name = 'UserFriendlyError';
    }
  }
  
  export const handleFirebaseError = (error: any): UserFriendlyError => {
    console.error('🔥 Firebase Error Details:', {
      code: error?.code,
      message: error?.message,
      stack: error?.stack
    });
  
    // Network-related errors
    if (error?.code === 'unavailable' || error?.message?.includes('network')) {
      return new UserFriendlyError(
        error.message || 'Network unavailable',
        'Please check your internet connection and try again',
        'NETWORK_ERROR',
        true // retryable
      );
    }
  
    // Permission errors
    if (error?.code === 'permission-denied') {
      return new UserFriendlyError(
        error.message || 'Permission denied',
        'You don\'t have permission to perform this action',
        'PERMISSION_DENIED',
        false
      );
    }
  
    // Not found errors
    if (error?.code === 'not-found') {
      return new UserFriendlyError(
        error.message || 'Document not found',
        'The requested item could not be found',
        'NOT_FOUND',
        false
      );
    }
  
    // Quota exceeded
    if (error?.code === 'resource-exhausted') {
      return new UserFriendlyError(
        error.message || 'Quota exceeded',
        'Service temporarily unavailable. Please try again in a moment',
        'QUOTA_EXCEEDED',
        true
      );
    }
  
    // Generic Firebase errors
    if (error?.code?.startsWith('firebase/') || error?.code?.startsWith('auth/')) {
      return new UserFriendlyError(
        error.message || 'Firebase error occurred',
        'A system error occurred. Please try again',
        'FIREBASE_ERROR',
        true
      );
    }
  
    // Unknown errors
    return new UserFriendlyError(
      error?.message || 'Unknown error occurred',
      'Something went wrong. Please try again.',
      'UNKNOWN_ERROR',
      false
    );
  };
  
  // Helper to check if error is network-related
  export const isNetworkError = (error: any): boolean => {
    return error?.code === 'unavailable' || 
           error?.message?.includes('network') ||
           error?.code === 'NETWORK_ERROR';
  };
  
  // Helper to check if error is retryable
  export const isRetryableError = (error: any): boolean => {
    if (error instanceof UserFriendlyError) {
      return error.retryable;
    }
    return isNetworkError(error);
  };