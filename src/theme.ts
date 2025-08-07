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
    }    
});
