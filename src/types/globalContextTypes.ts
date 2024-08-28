export type userInfoType = {
  email: string;
  password: string;
  id: string;
  mobile: number;
};

export type GlobalContextTypes = {
  isLoggedIn: boolean;
  token: string | null;
  userInfo: userInfoType | null;
  login: (userInfo: userInfoType, token: string) => void;
  logout: () => void;
  changeTheme: () => void;
  dark: boolean;
};
