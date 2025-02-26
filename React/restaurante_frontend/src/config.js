/**
 * The base URL for the API.
 * @type {string}
 */
export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8081';

/**
 * The title of the application.
 * @type {string}
 */
export const appTitle = import.meta.env.VITE_APP_TITLE || 'Restaurante';