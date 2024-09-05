import { createContext, Context } from "react";
import { GlobalContextTypes } from "../types/GlobalContext.types";

const defaultContextValue: GlobalContextTypes = {
  isLoggedIn: false,
  token: null,
  userInfo: null,
  login: () => {},
  logout: () => {},
  changeTheme: () => {},
  dark: true,
};


const GlobalContext: Context<GlobalContextTypes> = createContext(defaultContextValue);

export default GlobalContext;
