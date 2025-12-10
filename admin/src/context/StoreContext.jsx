// admin/src/context/StoreContext.jsx (or path you use)
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [admin, setAdmin] = useState(localStorage.getItem("admin") === "true");

  useEffect(() => {
    // persist token and admin state to localStorage
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    localStorage.setItem("admin", admin ? "true" : "false");
  }, [token, admin]);

  return (
    <StoreContext.Provider value={{ token, setToken, admin, setAdmin }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
