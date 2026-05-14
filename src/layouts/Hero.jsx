import { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import HeroPaper from "../components/HeroPaper.jsx";

import Logo from "../assets/logo.png";

/* Builds the Hero section layout */
export default function Hero() {

    /*************************** Localisation *********************************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON hero object */
    const hero = t('hero', { returnObjects: true })

    /*************************** Layout Building ***********************************/

    /* Builds the About body */
    function createAboutBody() {
        return (
            <Stack direction="column" spacing={1} sx={{ pt: 2, p: 2, pr: 6 }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {hero?.values?.about?.body}
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: "italic", pt: 2 }}>
                    {hero?.values?.about?.remark}
                </Typography>
            </Stack>
        );
    }

    /* Builds the Logo body */
    function createLogoBody() {
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "150px",
                    padding: 2
                }}
            >
                <Box
                    component="img"
                    src={Logo}
                    alt={hero?.keys?.logo?.alt}
                    sx={{
                        maxWidth: "100%",
                        maxHeight: "120px",
                        height: "auto",
                        objectFit: "contain"
                    }}
                />
            </Box>
        );
    }

    /* Builds the Languages body */
    function createLanguagesBody() {
        return (
            <Grid container spacing={{ xs: 1, sm: 1 }} sx={{ justifyContent: "center", width: "100%" }}>
                {hero?.values?.languages?.map((language, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <Button disabled variant="contained"
                            sx={{
                                width: "100%",
                                textTransform: "none",
                                backgroundColor: "background.button",
                                color: "text.default",
                                fontSize: 16,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",

                                "&.Mui-disabled": {
                                    backgroundColor: "background.button",
                                    color: "text.default",
                                    opacity: 1,
                                },
                            }}
                        >{language}</Button>
                    </Grid>
                ))}
            </Grid>
        );
    }

    const contactButtons = {
        textTransform: "none",
        backgroundColor: "background.button",
        color: "text.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flex: 1,
        minWidth: 0,
        maxHeight: 48,
        width: '100%',
        fontSize: 16
    };

    /* Builds the Contact body */
    function createContactBody() {
        return (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 1 }} sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                {/* Email */}
                <Button onClick={handleCopy} variant="contained" sx={contactButtons}>
                    {emailCopied ? `✅ ${hero?.keys?.contact?.emailCopied}` : `📧 ${hero?.keys?.contact?.email}`}
                </Button>
                {/* LinkedIn */}
                <Button variant="contained" href={hero?.values?.contact?.linkedin} target="_blank" rel="noopener"
                    sx={contactButtons}>
                    🔗 {hero?.keys?.contact?.linkedin}
                </Button>
                {/* GitHub */}
                <Button variant="contained" href={hero?.values?.contact?.github} target="_blank" rel="noopener"
                    sx={contactButtons}>
                    🐙 {hero?.keys?.contact?.github}
                </Button>
            </Stack>
        );
    }

    /*************************** Email Copy Functionality ******************************/

    /* Stores email copied state of button */
    const [emailCopied, setEmailCopied] = useState(false);

    /* Generates email address and copies to clipboard (basic spam protection) */
    const handleCopy = async () => {
        try {
            const email = [hero?.values?.contact?.email1, hero?.values?.contact?.email2].join("@");
            await navigator.clipboard.writeText(email);
            setEmailCopied(true);
            // reset after 2 seconds
            setTimeout(() => {
                setEmailCopied(false);
            }, 2000);
        } catch (err) { }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
                {/* Left Column */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                    <HeroPaper
                        title={hero?.keys?.about?.title}
                        body={createAboutBody()}
                        sx={{ flex: 1, minWidth: 0 }}
                    />
                </Grid>

                {/* Right Column */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Logo */}
                    <HeroPaper body={createLogoBody()} sx={{ flex: 1, minWidth: 0 }} />

                    {/* Contact */}
                    <HeroPaper body={createContactBody()} sx={{ minWidth: 0 }} />

                    {/* Languages */}
                    <HeroPaper body={createLanguagesBody()} sx={{ minWidth: 0 }} />
                </Grid>
            </Grid>
        </Box>
    );
}