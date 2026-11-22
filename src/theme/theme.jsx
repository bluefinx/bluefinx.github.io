import { createTheme } from '@mui/material/styles';
import "@fontsource/open-sans";

/* Builds the app-wide theme */
let theme = createTheme({
    /************************** Colours **************************/
    palette: {
        // Logo: #febeec, #739fc2, #93dbd9
        mode: 'dark',
        primary: {
            main: '#4F8FAF'
        },
        secondary: {
            main: '#B7A6D9'
        },
        background: {
            default: '#0A131F'
        },
        text: {
            default: '#E0E1DD',
            faded: '#C4C5BF'
        },
        area1: { // Digital Forensics
            main: '#65C6C1'
        },
        area2: { // Data Privacy & Compliance
            main: '#B987A2'
        },
        area3: { // Pentesting
            main: '#829B7B'
        },
        area4: { // Software Engineering & Development
            main: '#9689B2'
        },
        area5: { // Vulnerability Management
            main: '#718BAA'
        },
        area6: { // System Administration
            main: '#B18372'
        },
        area7: { // Cryptography
            main: '#B99B70'
        },
        area8: { // General IT & AI
            main: '#A0A6B8'
        },
        category1: { // Research
            main: '#E59A68'
        },
        category2: { // Awards
            main: '#D6C16B'
        },
        category3: { // Certifications
            main: '#75B8E0'
        }
    }
});

theme = createTheme(theme, {
    /************************** Fonts **************************/
    typography: {
        fontFamily: `'Roboto', 'Open-Sans', 'Helvetica', 'Arial', sans-serif`,
        pageTitle: {
            fontWeight: 'bold',
            fontSize: 30,
            '@media (min-width:600px)': {
                fontSize: 34,
            },
            '@media (min-width:900px)': {
                fontSize: 38,
            },
        },
        sectionTitle: {
            fontSize: 30,
            '@media (min-width:600px)': {
                fontSize: 34,
            },
            '@media (min-width:900px)': {
                fontSize: 38,
            },
        },
        sectionLabel: {
            fontSize: 16,
            '@media (min-width:600px)': {
                fontSize: 18,
            },
            '@media (min-width:900px)': {
                fontSize: 22,
            },
            color: theme.palette.text.faded
        },
        paperTitle: {
            fontWeight: 'bold',
            fontSize: 18,
            '@media (min-width:600px)': {
                fontSize: 20,
            },
            '@media (min-width:900px)': {
                fontSize: 22,
            },
        },
        paperSection: {
            fontSize: 14,
            '@media (min-width:600px)': {
                fontSize: 16,
            },
            '@media (min-width:900px)': {
                fontSize: 18,
            },
        },
        paperHighlight: {
            fontWeight: 'bold',
            fontSize: 28,
            '@media (min-width:600px)': {
                fontSize: 30,
            },
            '@media (min-width:900px)': {
                fontSize: 34,
            },
        },
        paperBody: {
            fontSize: 11,
            '@media (min-width:600px)': {
                fontSize: 13,
            },
            '@media (min-width:900px)': {
                fontSize: 15,
            }
        },
        paperLabel: {
            fontSize: 11,
            '@media (min-width:600px)': {
                fontSize: 13,
            },
            '@media (min-width:900px)': {
                fontSize: 15,
            },
            color: theme.palette.text.faded
        },
        timelineLabel: {
            fontSize: 10,
            '@media (min-width:600px)': {
                fontSize: 11,
            },
            '@media (min-width:900px)': {
                fontSize: 13,
            },
            color: theme.palette.text.faded
        },
        footerCaption: {
            fontStyle: 'italic',
            fontSize: 12,
            '@media (min-width:600px)': {
                fontSize: 14,
            },
            '@media (min-width:900px)': {
                fontSize: 16,
            },
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.background.default,
                },
            },
        },
    }
});

export default theme;