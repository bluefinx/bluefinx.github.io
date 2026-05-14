import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box, Stack, Typography, Link } from "@mui/material";
import { useTranslation } from 'react-i18next';

import theme from "./theme/theme.jsx";
import HeroPaper from "./components/HeroPaper.jsx";

export default function PrivacyStatement() {

    /*************************** Localisation *********************************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON privacy object */
    const privacy = t('privacy', { returnObjects: true })

    /*************************** Layout Building ***********************************/

    /* Builds the subtitle body */
    function createSubtitle() {
        return (
            <Typography variant="body1" sx={{ p: 2 }}>
                {privacy?.values?.subtitle}
            </Typography>
        );
    }

    /* Builds the Website body */
    function createWebsite() {
        return (
            <Typography variant="body1" sx={{ p: 2, whiteSpace: 'pre-line' }}>
                {privacy?.values?.website}
            </Typography>
        );
    }

    /* Builds the Hosting body */
    function createHosting() {
        return (
            <Typography variant="body1" sx={{ p: 2, whiteSpace: 'pre-line' }}>
                {privacy?.values?.hosting}{' '}
                <Link href={privacy?.values?.link} target="_blank" rel="noopener noreferrer">
                    {privacy?.values?.description}
                </Link>
                .
            </Typography>
        );
    }

    /* Builds the International body */
    function createInternational() {
        return (
            <Typography variant="body1" sx={{ p: 2, whiteSpace: 'pre-line' }}>
                {privacy?.values?.international}
            </Typography>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', px: '10%' }}>
                {/* Header */}
                <Box component="header" sx={{ height: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h3" sx={{
                        fontWeight: 'bold', fontSize: {
                            xs: 30,
                            sm: 34,
                            md: 38,
                        }, whiteSpace: "nowrap",
                    }}>
                        {privacy?.keys?.title}
                    </Typography>
                </Box>
                <Box component="main" sx={{ flex: 1 }}>
                    <Stack direction="column" spacing={2}>
                        {/* Subtitle */}
                        <HeroPaper body={createSubtitle()} />
                        {/* Website */}
                        <HeroPaper title={privacy?.keys?.website} body={createWebsite()} />
                        {/* Hosting */}
                        <HeroPaper title={privacy?.keys?.hosting} body={createHosting()} />
                        {/* International */}
                        <HeroPaper title={privacy?.keys?.international} body={createInternational()} />
                    </Stack>
                </Box>
                {/* Footer */}
                <Box component="footer" sx={{ height: 150, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <Typography variant="caption" sx={{ fontSize: 16 }}>
                        {privacy?.values?.updated}
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}