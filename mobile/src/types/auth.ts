export interface User {
  id:             number;
  name:           string;
  email:          string;
  language:       'km' | 'en';
  preferred_view: 'lunar' | 'gregorian' | 'both';
}

export interface AuthState {
  user:    User | null;
  token:   string | null;
  isAuth:  boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export interface LoginPayload {
  email:    string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name:              string;
  password_confirmation: string;
  language?:         'km' | 'en';
}
