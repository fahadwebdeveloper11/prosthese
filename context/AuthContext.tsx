import React, { createContext, useContext, useState } from "react";

export type Gender = "male" | "female";

interface UserData {
  name: string;
  surname: string;
  gender: Gender;
  dateOfBirth: Date;
  userId: string;
}

interface AppSettings {
  darkMode: boolean;
}

interface AppContextType {
  user: UserData;
  settings: AppSettings;
  updateUser: (data: Partial<UserData>) => void;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateUserId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [user, setUser] = useState<UserData>({
    name: "John",
    surname: "Doe",
    gender: "male",
    dateOfBirth: new Date(1990, 0, 1),
    userId: generateUserId(),
  });

  const [settings, setSettings] = useState<AppSettings>({
    darkMode: false,
  });

  const updateUser = (data: Partial<UserData>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const toggleDarkMode = () => {
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

 

  return (
    <AppContext.Provider
      value={{
        user,
        settings,
        updateUser,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useUserContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
