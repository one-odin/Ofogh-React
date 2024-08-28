import { createContext, Context } from "react";
import { GlobalContextTypes } from "../types/globalContextTypes";

const defaultContextValue: GlobalContextTypes = {
  isLoggedIn: false,
  token: null,
  userInfo: {},
  login: () => {},
  logout: () => {},
  changeTheme: () => {},
  dark: true,
};

const GlobalContext: Context<GlobalContextTypes> = createContext(defaultContextValue);

export default GlobalContext;
