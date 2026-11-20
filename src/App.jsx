import { ThemeProvider, CssBaseline, Typography, Button } from '@mui/material';
import { Box, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import theme from './theme/theme';
import Projects from "./layouts/Projects.jsx";
import Experiences from "./layouts/Experiences.jsx";
import Education from "./layouts/Education.jsx";
import Hero from "./layouts/Hero.jsx";
import Achievements from "./layouts/Achievements.jsx";
import References from "./layouts/References.jsx";

/* Builds the App main layout */
export default function App() {

    /*************************** Localisation *********************************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads header & footer strings */
    const header = t('header')
    const footer = t('footer')

    const licenses = t('licenses')
    const licensesLink = t('licensesLink')

    /* Reads JSON tabs and privacy objects */
    const privacy = t('privacy', { returnObjects: true })

    /*************************** Tabs Functionality ******************************/

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', px: '10%' }}>

                {/* Header */}
                <Box component="header" sx={{ px: 2, height: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="pageTitle" sx={{ whiteSpace: "nowrap" }}>
                        {header}
                    </Typography>
                </Box>

                {/* Body */}
                <Box component="main" sx={{ flex: 1 }}>
                    <Stack spacing={4}>

                        {/* Hero */}
                        <Hero />

                        {/* Projects */}
                        <Box id="projects">
                            <Projects />
                        </Box>

                        {/* Experience */}
                        <Box id="experience">
                            {/*<Experiences />*/}
                        </Box>

                        {/* Education */}
                        <Box id="education">
                            {/*<Education />*/}
                        </Box>

                        {/* Achievements */}
                        <Box id="achievements">
                            {/*<Achievements />*/}
                        </Box>

                        {/* References */}
                        <Box id="references">
                            <References />
                        </Box>
                    </Stack>
                </Box>

                {/* Footer */}
                <Box component="footer" sx={{ height: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Stack direction="row" spacing={4} sx={{ alignItems: "center", width: "100%" }}>
                        {/* Licenses */}
                        <Button variant="text" href={licensesLink} target="_blank" rel="noopener"
                            sx={{ fontSize: '1rem', textTransform: 'none', color: "text.default" }}>
                            {licenses}
                        </Button>
                        {/* Signature */}
                        <Typography variant="footerCaption" sx={{ flexGrow: 1, textAlign: 'center' }}>
                            {footer}
                        </Typography>
                        {/* Privacy Statement */}
                        <Button variant="text" href={privacy?.keys?.link} target="_blank" rel="noopener"
                            sx={{ fontSize: '1rem', textTransform: 'none', color: "text.default" }}>
                            {privacy?.keys?.title}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
