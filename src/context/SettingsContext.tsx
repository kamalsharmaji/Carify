import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  primaryColor: string;
  appName: string;
  logo: string;
  fontFamily: string;
  isDarkMode: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  primaryColor: '#dc2626', // red-600
  appName: 'Carify PDI',
  logo: '',
  fontFamily: 'Inter, sans-serif',
  isDarkMode: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('erp_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('erp_settings', JSON.stringify(settings));
    
    // Apply primary color as a CSS variable
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    
    // Apply font family
    document.documentElement.style.setProperty('--font-family', settings.fontFamily);
    document.body.style.fontFamily = settings.fontFamily;

    // Apply dark mode
    if (settings.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
