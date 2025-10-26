import { createContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Export context separately for useTheme hook
export { ThemeContext };

const ThemeProviderComponent = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('rmspices-theme');
    // Return saved theme, otherwise default to 'light' mode
    if (saved) {
      return saved as Theme;
    }
    // Default to light mode if no saved preference
    return 'light';
  });

  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove any existing theme classes
    root.classList.remove('light', 'dark');
    
    // Apply theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('rmspices-theme', theme);
    
    // Debug log
    console.log(`Theme switched to: ${theme}`);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Note: We no longer listen to system preference changes
  // User must manually toggle theme through the UI

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the provider as default to support Fast Refresh
export default ThemeProviderComponent;

// Named export for convenience
export const ThemeProvider = ThemeProviderComponent;

