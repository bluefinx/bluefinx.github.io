import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box, Stack, Typography, Button, Card, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import theme from './theme/theme';
import Projects from "./layouts/Projects.jsx";
import Experiences from "./layouts/Experiences.jsx";
import Education from "./layouts/Education.jsx";
import Hero from "./layouts/Hero.jsx";
import Achievements from "./layouts/Achievements.jsx";
import References from "./layouts/References.jsx";

import {header, footer, licencesLink, privacyLink, subheader} from "./config.jsx";

import CopyrightIcon from '@mui/icons-material/Copyright';

/* Builds the App main layout */
export default function App() {

    /*************************** Localisation *********************************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads the Licence file name */
    const licences = t('licences')

    /* Reads JSON tabs and privacy objects */
    const privacy = t('privacy', { returnObjects: true })

    /*************************** Tabs Functionality ******************************/

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', px: '5%' }}>

                {/* Header */}
                <Box component="header" sx={{ height: {sx: 120, sm: 130, md: 150}, display: "flex", justifyContent: "center", alignItems: "center", pt: { xs: 4, sm: 2, md: 2}, mb: { xs: 2, sm: 0, md: 0 } }}>
                    <Card elevation={0} sx={{ width: "100%", py: 0, display: "flex", border: "0px solid", borderColor: "primary.main", borderRadius: 2, justifyContent: "center", alignItems: "center" }}>
                        <Stack spacing={0} sx={{ alignItems: "center" }}>
                            <Typography variant="pageTitle" sx={{ whiteSpace: "nowrap",transform: {xs: "translateX(-2rem)", md: "translateX(-4rem)",} }}>
                                {header}
                            </Typography>
                            <Typography variant="pageSubtitle" sx={{ whiteSpace: "nowrap", transform: "translateX(4rem)" }}>
                                {subheader}
                            </Typography>
                        </Stack>
                    </Card>
                </Box>

                <Divider sx={{ borderColor: "primary.main", borderBottomWidth: 3, mb: 5 }}/>

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
                            <Experiences />
                        </Box>

                        {/* Education */}
                        <Box id="education">
                            <Education />
                        </Box>

                        {/* Achievements */}
                        <Box id="achievements">
                            <Achievements />
                        </Box>

                        {/* References */}
                        <Box id="references">
                            <References />
                        </Box>
                    </Stack>
                </Box>

                <Divider sx={{ borderColor: "primary.main", borderBottomWidth: 3, mt: 10 }}/>

                {/* Footer */}
                <Card elevation={0} sx={{width: "100%", height: { xs: "auto", sm: 50 }, display: "flex",
                        mt: 0, mb: 5, px: 0, py: { xs: 1, sm: 0 }, border: "0px solid", borderColor: "primary.main", borderRadius: 2,}}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.5, sm: 2 }}
                        sx={{ alignItems: { xs: "stretch", sm: "center" }, width: "100%" }}>

                        {/* Signature */}
                        <Typography component="div" variant="footerCaption"
                            sx={{
                                flexGrow: { xs: 0, sm: 1 },
                                width: { xs: "100%", sm: "auto" },
                                textAlign: { xs: "center", sm: "left" },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: { xs: "center", sm: "flex-start" },
                                gap: 0.5,
                            }}>
                            <CopyrightIcon fontSize="inherit" />
                            {footer}
                        </Typography>

                        {/* Links */}
                        <Box sx={{display: { xs: "flex", sm: "contents" }, width: { xs: "100%", sm: "auto" } }}>
                            {/* Licences */}
                            <Button variant="text" href={licencesLink} target="_blank" rel="noopener"
                                sx={{
                                    flex: { xs: 1, sm: "0 1 auto" },
                                    fontSize: { xs: 13, sm: 14, md: 16 },
                                    textTransform: "none",
                                    color: "secondary.main",
                                    textDecoration: "underline",
                                    textUnderlineOffset: "4px",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        color: "secondary.main",
                                    },
                                }}>
                                {licences}
                            </Button>

                            {/* Privacy Statement */}
                            <Button variant="text" href={privacyLink} target="_blank" rel="noopener"
                                sx={{
                                    flex: { xs: 1, sm: "0 1 auto" },
                                    fontSize: { xs: 13, sm: 14, md: 16 },
                                    textTransform: "none",
                                    color: "secondary.main",
                                    textDecoration: "underline",
                                    textUnderlineOffset: "4px",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        color: "secondary.main",
                                    },
                                }}>
                                {privacy?.keys?.title}
                            </Button>
                        </Box>
                    </Stack>
                </Card>
            </Box>
        </ThemeProvider>
    );
}
