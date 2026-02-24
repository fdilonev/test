interface UserInfo {
  id: string;
  email: string;
  role: string;
}

const STORAGE_KEY = 'auth_session';
const TOKEN_KEY = 'auth_token';

export const Session = {
  save(token: string, user: UserInfo): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): UserInfo | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STORAGE_KEY);
  },
};
