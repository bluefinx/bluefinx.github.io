import { useState } from "react";
import { ThemeProvider, CssBaseline, Tabs, Tab, Typography, Button } from '@mui/material';
import { Box, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import theme from './theme/theme';
import Projects from "./layouts/Projects.jsx";
import Experiences from "./layouts/Experiences.jsx";
import Education from "./layouts/Education.jsx";
import Hero from "./layouts/Hero.jsx";
import FocusAreas from "./layouts/FocusAreas.jsx";
import Skills from "./layouts/Skills.jsx";
import Certificates from "./layouts/Certificates.jsx";
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
    const tabs = t('tabs', { returnObjects: true })
    const privacy = t('privacy', { returnObjects: true })

    /*************************** Tabs Functionality ******************************/

    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', px: '10%' }}>

                {/* Header */}
                <Box component="header" sx={{ px: 2, height: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h3" sx={{
                        fontWeight: 'bold', fontSize: {
                            xs: 30,
                            sm: 34,
                            md: 38,
                        }, whiteSpace: "nowrap",
                    }}>
                        {header}
                    </Typography>
                </Box>

                {/* Body */}
                <Box component="main" sx={{ flex: 1 }}>
                    <Stack spacing={4}>

                        {/* HeroCards */}
                        <Hero />

                        {/* Focus Areas*/}
                        <FocusAreas />

                        {/* Tabs */}
                        <Typography variant="h4" align="center" sx={{ pt: 3 }}>
                            {tabs?.keys?.title}
                        </Typography>
                        <Box>
                            <Tabs variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile value={selectedTab} onChange={(e, v) => setSelectedTab(v)}>
                                {tabs?.values?.map((tab, index) => (
                                    <Tab key={index} label={tab} />
                                ))}
                            </Tabs>

                            {selectedTab === 0 && <Box sx={{ pl: 2, pt: 4 }}><Projects /></Box>}
                            {selectedTab === 1 && <Box sx={{ pl: 2, pt: 4 }}><Experiences /></Box>}
                            {selectedTab === 2 && <Box sx={{ pl: 2, pt: 4 }}><Skills /></Box>}
                            {selectedTab === 3 && <Box sx={{ pl: 2, pt: 4 }}><Education /></Box>}
                            {selectedTab === 4 && <Box sx={{ pl: 2, pt: 4 }}><Certificates /></Box>}
                        </Box>

                        {/* References */}
                        <References/>
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
                        <Typography variant="caption" sx={{ fontSize: 16, fontStyle: 'italic', flexGrow: 1, textAlign: 'center' }}>
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
