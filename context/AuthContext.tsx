import React, { createContext, useContext, useState } from 'react';

export type Gender = 'male' | 'female';
export type Language = 'en' | 'de' | 'fr';

interface UserData {
  name: string;
  surname: string;
  gender: Gender;
  dateOfBirth: Date;
  userId: string;
}

interface AppSettings {
  darkMode: boolean;
  language: Language;
}

interface AppContextType {
  user: UserData;
  settings: AppSettings;
  updateUser: (data: Partial<UserData>) => void;
  toggleDarkMode: () => void;
  setLanguage: (lang: Language) => void;
  clearLocalData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateUserId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<UserData>({
    name: 'John',
    surname: 'Doe',
    gender: 'male',
    dateOfBirth: new Date(1990, 0, 1),
    userId: generateUserId(),
  });

  const [settings, setSettings] = useState<AppSettings>({
    darkMode: false,
    language: 'en',
  });

  const updateUser = (data: Partial<UserData>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setLanguage = (lang: Language) => {
    setSettings(prev => ({ ...prev, language: lang }));
  };

  const clearLocalData = () => {
    // Implement actual local data clearing logic here
    console.log('Local data cleared');
  };

  return (
    <AppContext.Provider value={{
      user,
      settings,
      updateUser,
      toggleDarkMode,
      setLanguage,
      clearLocalData,
    }}>
      {children}
    </AppContext.Provider>
  );
};
export const useUserContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};