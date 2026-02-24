import { Session } from './session';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: { id: string; email: string; role: string };
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const data: AuthResponse = await response.json();
  Session.save(data.token, data.user);
  return data;
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' });
  Session.clear();
}
