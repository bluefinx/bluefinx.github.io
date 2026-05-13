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
            <Stack direction="column" spacing={1} sx={{ pt: 2, p: 2 }}>
                <Typography variant="subtitle1">
                    {hero?.values?.about?.body}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontStyle: "italic", pt: 2 }}>
                    {hero?.values?.about?.remark}
                </Typography>
            </Stack>
        );
    }

    /* Builds the Logo body */
    function createLogoBody() {
        return (
            <Box sx={{ width: "100%", height: "100%", display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                <Box component="img" src={Logo} alt={hero?.keys?.logo?.alt} sx={{
                    maxWidth: "100%",
                    maxHeight: "120px", objectFit: "contain"
                }} />
            </Box>
        );
    }

    /* Builds the Languages body */
    function createLanguagesBody() {
        return (
            <Stack direction="row" spacing={1} sx={{ alignItems: "stretch", justifyContent: "center", width: "100%" }}>
                {hero?.values?.languages?.map((language, index) => (
                    <Button disabled variant="contained" key={index} sx={{
                        fontSize: '1rem', textTransform: 'none', flex: 1, px: 0,
                        backgroundColor: "background.button", color: "text.default", '&.Mui-disabled': {
                            backgroundColor: "background.button",
                            color: "text.default",
                            opacity: 1,
                        }
                    }}>{language}</Button>
                ))}
            </Stack>
        );
    }

    /* Builds the Contact body */
    function createContactBody() {
        return (
            <Stack direction="row" spacing={1} sx={{ alignItems: "stretch", justifyContent: "center", width: "100%" }}>
                {/* Email */}
                <Button onClick={handleCopy} variant="contained" sx={{
                    fontSize: '1rem', textTransform: 'none', flex: 1,
                    backgroundColor: "background.button", color: "text.default"
                }}>
                    {emailCopied ? `✅ ${hero?.keys?.contact?.emailCopied}` : `📧 ${hero?.keys?.contact?.email}`}
                </Button>
                {/* LinkedIn */}
                <Button variant="contained" href={hero?.values?.contact?.linkedin} target="_blank" rel="noopener"
                    sx={{ fontSize: '1rem', textTransform: 'none', flex: 1, backgroundColor: "background.button", color: "text.default" }}>
                    🔗 {hero?.keys?.contact?.linkedin}
                </Button>
                {/* GitHub */}
                <Button variant="contained" href={hero?.values?.contact?.github} target="_blank" rel="noopener"
                    sx={{ fontSize: '1rem', textTransform: 'none', flex: 1, backgroundColor: "background.button", color: "text.default" }}>
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
                {/* Logo */}
                <Grid size={{ xs: 12, md: 3, }} sx={{ display: "flex" }}>
                    <HeroPaper body={createLogoBody()} />
                </Grid>
                {/* About */}
                <Grid size={{ xs: 12, md: 9 }} sx={{ display: "flex" }}>
                    <HeroPaper title={hero?.keys?.about?.title} body={createAboutBody()} />
                </Grid>
                {/* Contact */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                    <HeroPaper body={createContactBody()} />
                </Grid>
                {/* Languages */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                    <HeroPaper body={createLanguagesBody()} />
                </Grid>
            </Grid>
        </Box>
    );
}