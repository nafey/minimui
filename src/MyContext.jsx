import { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [dashId, setDashId] = useState(0);

  return (
    <MyContext.Provider value={{ dashId, setDashId }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
