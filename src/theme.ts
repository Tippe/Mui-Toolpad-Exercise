import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {
        light: {
            palette: {
                background: {
                    default: "#f2f2f2",
                    paper: "#fff"
                }
            }
        },
        dark: {
            palette: {
                background: {
                    default: "#111827",
                    paper: "#1f2937"
                }
            }
        }
    },
});

import { useState, useEffect } from "react";

export function useToolpadColorScheme() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.getAttribute('data-toolpad-color-scheme') === 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const scheme = document.documentElement.getAttribute('data-toolpad-color-scheme');
      setIsDark(scheme === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-toolpad-color-scheme'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}
