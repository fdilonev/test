import { Session } from './session';

interface RequestConfig {
  headers?: Record<string, string>;
  [key: string]: unknown;
}

export function withAuth(config: RequestConfig = {}): RequestConfig {
  const token = Session.getToken();
  if (!token) {
    throw new Error('No active session');
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
}

export function requireAuth(): boolean {
  if (!Session.isAuthenticated()) {
    window.location.href = '/login';
    return false;
  }
  return true;
}
