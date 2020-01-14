export interface User {
  authenticated: boolean;
  userId: string;
  isLoading: boolean;
}

interface StoreState {
  user: User;
}

export default StoreState;
