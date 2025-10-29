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

const THEME_STORAGE_KEY = 'rmspices-theme';
const VALID_THEMES: Theme[] = ['light', 'dark'];

const getInitialTheme = (): Theme => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'light';
  }

  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    // Validate the saved theme
    if (saved && VALID_THEMES.includes(saved as Theme)) {
      return saved as Theme;
    }
  } catch (error) {
    // localStorage might not be available (e.g., in incognito mode)
    console.warn('Failed to read theme from localStorage:', error);
  }

  return 'light';
};

const ThemeProviderComponent = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [isMounted, setIsMounted] = useState(false);

  // Mark component as mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Apply theme to document when theme changes or component mounts
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;

    // For Tailwind CSS dark mode with 'class' strategy:
    // Only add/remove 'dark' class on the root element
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme, isMounted]);

  const setTheme = (newTheme: Theme) => {
    if (VALID_THEMES.includes(newTheme)) {
      setThemeState(newTheme);
    } else {
      console.warn(`Invalid theme: ${newTheme}. Using 'light' instead.`);
      setThemeState('light');
    }
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

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
