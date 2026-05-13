import { createTheme } from '@mui/material/styles';
import "@fontsource/open-sans";

/* Builds the app-wide theme */
const theme = createTheme({
    /************************** Colours **************************/
    palette: {
        mode: 'dark',
        primary: {
            main: '#4A6FA5'
        },
        secondary: {
            main: '#AA6373'
        },
        tertiary: {
            main: '#3A5743'
        },
        quaternary: {
            main: '#B07156'
        },
        quinary: {
            main: '#828C51'
        },
        senary: {
            main: '#5B3345'
        },
        background: {
            default: '#0A131F',
            button: '#667ACC'
        },
        text: {
            default: '#E0E1DD',
            faded: '#CECFC9'
        }
    },
    /************************** Fonts **************************/
    typography: {
        fontFamily: `'Roboto', 'Open-Sans', 'Helvetica', 'Arial', sans-serif`,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0A131F',
                },
            },
        },
    }
});

export default theme;