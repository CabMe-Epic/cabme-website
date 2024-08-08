"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ContextInterface {
  data: any;
  setData: (data: any) => void;
}

const AppContext = createContext<ContextInterface | null>(null);

export const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Retrieve data from sessionStorage on mount
    const storedData = sessionStorage.getItem("appData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Save data to sessionStorage whenever it changes
    if (data !== null) {
      sessionStorage.setItem("appData", JSON.stringify(data));
    }
  }, [data]);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useContextApi = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppWrapper");
  }
  return context;
};
