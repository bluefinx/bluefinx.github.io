import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box, Stack, Typography, Link, Paper } from "@mui/material";
import { useTranslation } from 'react-i18next';

import theme from "./theme/theme.jsx";

export default function PrivacyStatement() {

    /*************************** Localisation *********************************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON privacy object */
    const privacy = t('privacy', { returnObjects: true })

    /*************************** Layout Building ***********************************/

    /* Builds the subtitle part */
    function createSubtitle() {
        return (
            <Paper sx={{ p: 2, width: "100%", height: "100%", display: "flex" }}>
                {/* Body */}
                <Box sx={{ flexGrow: 1, display: "flex" }}>
                    <Typography variant="paperBody" sx={{ p: 2 }}>
                        {privacy?.values?.subtitle}
                    </Typography>
                </Box>
            </Paper>
        );
    }

    /* Builds the Website part */
    function createWebsite() {
        return (
            <Paper sx={{ p: 2, width: "100%", height: "100%", display: "flex" }}>
                {/* Body */}
                <Stack direction="column" sx={{ height: "100%", flexGrow: 1 }}>
                    <Typography variant="paperTitle" sx={{ p: 2, whiteSpace: 'pre-line' }}>
                        {privacy?.keys?.website}
                    </Typography>
                    <Typography variant="paperBody" sx={{ p: 2, whiteSpace: 'pre-line' }}>
                        {privacy?.values?.website}
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    /* Builds the Hosting part */
    function createHosting() {
        return (
            <Paper sx={{ p: 2, width: "100%", height: "100%", display: "flex" }}>
                {/* Body */}
                <Stack direction="column" sx={{ height: "100%", flexGrow: 1 }}>
                    <Typography variant="paperTitle" sx={{ p: 2, whiteSpace: 'pre-line' }}>
                        {privacy?.keys?.hosting}
                    </Typography>
                    <Typography variant="paperBody" sx={{ p: 2, whiteSpace: 'pre-line' }}>
                        {privacy?.values?.hosting}{' '}
                        <Link href={privacy?.values?.link} target="_blank" rel="noopener noreferrer">
                            {privacy?.values?.description}
                        </Link>
                        .
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    /* Builds the International part */
    function createInternational() {
        return (
            <Paper sx={{ p: 2, width: "100%", height: "100%", display: "flex" }}>
                {/* Body */}
                <Stack direction="column" sx={{ height: "100%", flexGrow: 1 }}>
                    <Typography variant="paperTitle" sx={{ p: 2, whiteSpace: 'pre-line' }}>
                        {privacy?.keys?.international}
                    </Typography>
                    <Typography variant="paperBody" sx={{ p: 2, whiteSpace: 'pre-line' }}>
                        {privacy?.values?.international}
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', px: '10%' }}>
                {/* Header */}
                <Box component="header" sx={{ height: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="pageTitle" sx={{ whiteSpace: "nowrap" }}>
                        {privacy?.keys?.title}
                    </Typography>
                </Box>

                {/* Content */}
                <Box component="main" sx={{ flex: 1 }}>
                    <Stack direction="column" spacing={2}>
                        {/* Subtitle */}
                        {createSubtitle()}
                        {/* Website */}
                        {createWebsite()}
                        {/* Hosting */}
                        {createHosting()}
                        {/* International */}
                        {createInternational()}
                    </Stack>
                </Box>
                {/* Footer */}
                <Box component="footer" sx={{ height: 150, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <Typography variant="footerCaption">
                        {privacy?.values?.updated}
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}