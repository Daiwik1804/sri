import React, { createContext, useContext, useState, useEffect } from 'react';
import { WebsiteSettings } from '../types';
import { storage } from '../services/storage';

interface SettingsContextType {
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  refreshSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(() => storage.getSettings());

  const refreshSettings = () => {
    setSettings(storage.getSettings());
  };

  useEffect(() => {
    const handleUpdate = () => refreshSettings();
    window.addEventListener('revs_storage_update', handleUpdate);
    return () => window.removeEventListener('revs_storage_update', handleUpdate);
  }, []);

  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    const updated = storage.updateSettings(newSettings);
    setSettings(updated);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, refreshSettings }}>
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
