import { useCallback, useEffect, useState } from "react";
import routes from "./routes";
import { useRoutes, useNavigate } from "react-router-dom";

import "./App.css";

import GlobalContext from "./context/globalContext";
import { GlobalContextTypes, userInfoType } from "./types/GlobalContext.types";

const App: React.FC = () => {
  const router = useRoutes(routes);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<userInfoType | null>(null);

  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });

  if (localStorage.getItem("theme") === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    const theme = isDark ? "light" : "dark";
    localStorage.setItem("theme", theme);
  };

  const login = (userInfo: userInfoType, token: string): void => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfo(userInfo);
    const userID = userInfo.id;
    localStorage.setItem("user", JSON.stringify({ token }));
    localStorage.setItem("data", JSON.stringify({ userID }));
  };

  const logout = useCallback<() => void>(() => {
    setToken(null);
    setIsLoggedIn(false);
    setUserInfo(null);
    localStorage.removeItem("user");
    navigate("/")
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user") as string;
    const localStorageData = JSON.parse(user);

    const userID = localStorage.getItem("data") as string;
    const localStorageUserID = JSON.parse(userID);

    if (localStorageData) {
      fetch(`http://localhost:3000/600/users/${localStorageUserID.userID}`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            setIsLoggedIn(false);
            localStorage.removeItem("data");
            localStorage.removeItem("user");
          }
          return res.json();
        })
        .then((data) => {
          setIsLoggedIn(true);
          setUserInfo(data);
        });
    }
  }, []);

  const value: GlobalContextTypes = {
    isLoggedIn,
    token,
    userInfo,
    login,
    logout,
    changeTheme: toggleTheme,
    dark: isDark,
  };

  return <GlobalContext.Provider value={value}>{router}</GlobalContext.Provider>;
};

export default App;
