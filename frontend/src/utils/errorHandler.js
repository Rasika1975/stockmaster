// Utility functions for handling API errors consistently

export const handleApiError = (error) => {
  if (error.message) {
    return error.message;
  }
  
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 400:
        return 'Bad Request - Please check your input';
      case 401:
        return 'Unauthorized - Please login again';
      case 403:
        return 'Forbidden - You do not have permission';
      case 404:
        return 'Not Found - Resource not found';
      case 500:
        return 'Internal Server Error - Please try again later';
      default:
        return `Server Error (${error.response.status})`;
    }
  }
  
  if (error.request) {
    // Network error
    return 'Network Error - Please check your connection';
  }
  
  // Other errors
  return 'An unexpected error occurred';
};

export const showAlert = (message, type = 'info') => {
  // In a real application, you might want to use a toast notification library
  // For now, we'll use alert or console.log
  switch (type) {
    case 'error':
      console.error(message);
      break;
    case 'success':
      console.log(message);
      break;
    case 'warning':
      console.warn(message);
      break;
    default:
      console.log(message);
  }
};

export default {
  handleApiError,
  showAlert
};