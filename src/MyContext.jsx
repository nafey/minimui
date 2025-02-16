import { createContext } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  return <MyContext.Provider value={{}}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };
