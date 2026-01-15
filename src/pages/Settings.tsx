import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Palette, Type, Image as ImageIcon, Moon, Sun, Layout } from 'lucide-react';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  const colors = [
    { name: 'Red', value: '#dc2626' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Slate', value: '#475569' },
  ];

  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-800 dark:text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Section */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <Palette className="text-red-600" size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Appearance</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-500 mb-3 block">Theme Color</label>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateSettings({ primaryColor: color.value })}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${
                      settings.primaryColor === color.value ? 'border-gray-300 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl">
              <div className="flex items-center gap-3">
                {settings.isDarkMode ? <Moon size={20} className="text-gray-400" /> : <Sun size={20} className="text-orange-500" />}
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-gray-500">Switch between light and dark themes</p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ isDarkMode: !settings.isDarkMode })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.isDarkMode ? 'bg-red-600' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                  settings.isDarkMode ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Brand Section */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Layout className="text-blue-600" size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Branding</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-500 mb-1 block">App Name</label>
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => updateSettings({ appName: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500 mb-1 block">Font Family</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => updateSettings({ fontFamily: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white"
              >
                {fonts.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
