import { useState, useEffect } from "react";
import { Box, Button, Grid, Stack, Paper, Typography, Card, CardActionArea } from "@mui/material";
import { useTranslation } from 'react-i18next';

import Logo from "../assets/logo.png";
import LinkedIn from "../assets/LinkedIn.png";
import GitHub from "../assets/GitHub.png";

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CheckIcon from '@mui/icons-material/Check';
import {email1, email2, gitHubLink, linkedInLink, NAVIGATION} from "../config.jsx";

/* Builds the Hero section layout */
export default function Hero() {

    /*************************** Localisation *********************************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON hero object */
    const hero = t('hero', { returnObjects: true })

    /*************************** Layout Building ***********************************/

    /* Stores the active section with default "Home" */
    const [activeSection, setActiveSection] = useState("home");

    /* Builds the Navigation paper */
    function createNavigation() {
        return (
            <Paper sx={{ width: "100%", height: "100%", display: "flex" }}>
                <Stack direction="column" sx={{ p: 0, pl: { xs: 0, md: 2 }, height: "100%", flexGrow: 1, backgroundColor: "background.default" }}>
                    {/* Title*/}
                    <Typography variant="paperTitle" sx={{ pb: 2 }}>
                        {hero?.keys?.navigation?.title}
                    </Typography>

                    {/* Body */}
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        <Grid container spacing={1}>
                            {Object.entries(hero?.values?.navigation || {}).map(([id, section], index) => {
                                const active = activeSection === id;
                                const config = NAVIGATION[id];
                                return (
                                    <Grid size={{ xs: 6, md: 12 }} key={index}>
                                        <Card variant="outlined" sx={{ height: "100%", borderRadius: 2, transition: "all 0.2s",
                                            "&:hover": {
                                                borderColor: "primary.main",
                                                boxShadow: 3,
                                                transform: "translateY(-2px)"
                                            }}}>
                                            <CardActionArea sx={{ height: "100%", cursor: config?.link ? "pointer" : "default" }} onClick={() => {
                                                if (config?.link) {
                                                    scrollToSection(id);
                                                }
                                            }}>
                                                <Stack direction="row" spacing={1} sx={{ p: 1, alignItems: "center" }}>
                                                    <Box sx={{ pl: 1, pr: 1, display: "flex", alignItems: "center", color: active ? "primary.main" : "text.secondary",
                                                        transition: "color 0.2s ease" }}>
                                                        {NAVIGATION[id]?.icon}
                                                    </Box>

                                                    <Stack spacing={0}>
                                                        <Typography variant="paperBody"
                                                                    sx={{
                                                                        color: active ? "primary.main" : "text.default",
                                                                        fontWeight: 600,
                                                                        transition: "all 0.2s ease",
                                                                        "&:hover": config?.link ? { color: "primary.main" } : {},
                                                                    }}>
                                                            {section.title}
                                                        </Typography>

                                                        <Typography variant="timelineLabel" sx={{ mt: 0.3 }}>
                                                            {section.subtitle}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Stack>
            </Paper>
        )
    }

    /* Builds the About paper */
    function createAbout() {
        const logoWidth = 100;
        return (
            <Paper sx={{ p: 2, width: "100%", height: "100%", display: "flex", position: "relative" }}>
                {/* Logo */}
                <Box component="img" src={Logo} alt={hero?.keys?.logo?.alt}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        width: logoWidth,
                        maxHeight: "90px",
                        objectFit: "contain",
                    }}/>

                {/* Text */}
                <Stack direction="column" sx={{ height: "100%", flexGrow: 1 }}>
                    {/* Title*/}
                    <Typography variant="paperTitle" sx={{ pl: 2, pr: `${logoWidth + 8}px` }}>
                        {hero?.keys?.about?.title}
                    </Typography>

                    {/* Body */}
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        <Stack direction="column" spacing={1} sx={{ flexGrow: 1, width: "100%", p: 2, pt: 2 }}>
                            <Typography variant="paperBody" sx={{ whiteSpace: "pre-line", display: "block" }}>
                                <Box component="span" sx={{ float: "right", width: logoWidth - 16, height: 90 }} />
                                {hero?.values?.about?.body}
                            </Typography>
                            <Typography variant="paperBody" sx={{ fontStyle: "italic", pt: 2 }}>
                                {hero?.values?.about?.remark}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        );
    }

    /* Defines the layout for the contact buttons */
    const contactButtons = {
        textTransform: "none",
        backgroundColor: "primary.main",
        color: "text.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minWidth: 0,
        height: 48,
        width: "100%",
        fontSize: 15
    };

    /* Defines the layout for the logos in the buttons */
    const logoStyle = {
        maxHeight: 22,
        maxWidth: "80%",
        width: "auto",
        height: "auto",
        objectFit: "contain",
        display: "block",
    };

    /* Builds the Contact paper */
    function createContact() {
        return (
            <Paper sx={{ gridArea: "contact", p: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "start", gap: 1 }}>
                {/* Title*/}
                <Typography variant="paperTitle" sx={{ pb: 2 }}>
                    {hero?.keys?.contact?.title}
                </Typography>

                {/* Email */}
                <Button
                    onClick={handleCopy}
                    variant="contained"
                    sx={contactButtons}
                    startIcon={emailCopied ? <CheckIcon /> : <ContentCopyOutlinedIcon />}
                >
                    <Typography variant="paperBody">
                        {emailCopied ? hero?.keys?.contact?.emailCopied : hero?.keys?.contact?.email}
                    </Typography>
                </Button>

                {/* LinkedIn | GitHub */}
                <Grid container spacing={1} sx={{ width: "100%" }}>
                    <Grid size={6}>
                        <Button
                            variant="contained"
                            href={linkedInLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={linkedInLink}
                            sx={contactButtons}
                        >
                            <Box component="img" src={LinkedIn} alt="" sx={logoStyle} />
                        </Button>
                    </Grid>
                    <Grid size={6}>
                        <Button
                            variant="contained"
                            href={gitHubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={gitHubLink}
                            sx={contactButtons}
                        >
                            <Box component="img" src={GitHub} alt="" sx={logoStyle} />
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    /* Builds the Languages paper */
    function createLanguages() {
        return (
            <Paper sx={{ p: 2, width: "100%", height: "100%", display: "flex" }}>
                <Stack spacing={1} sx={{ width: "100%" }}>

                    {/* Title*/}
                    <Typography variant="paperTitle" sx={{ pb: 2 }}>
                        {hero?.keys?.languages?.title}
                    </Typography>

                    {/* Language Buttons */}
                    {hero?.values?.languages?.map((language, index) => (

                            <Button
                                disabled
                                key={index}
                                variant="contained"
                                sx={{
                                    width: "100%",
                                    textTransform: "none",
                                    backgroundColor: "secondary.main",
                                    color: "text.default",
                                    "&.Mui-disabled": {
                                        backgroundColor: "primary.main",
                                        color: "text.default",
                                        opacity: 1,
                                    }}}>
                                <Typography variant="paperBody" sx={{ fontWeight: "bold" }}>
                                    {language}
                                </Typography>
                            </Button>
                    ))}
                </Stack>
            </Paper>
        );
    }
    /*************************** Email Copy Functionality ******************************/

    /* Stores email copied state of button */
    const [emailCopied, setEmailCopied] = useState(false);

    /* Generates email address and copies to clipboard (basic spam protection) */
    const handleCopy = async () => {
        try {
            const email = [email1, email2].join("@");
            await navigator.clipboard.writeText(email);
            setEmailCopied(true);
            // reset after 2 seconds
            setTimeout(() => {
                setEmailCopied(false);
            }, 2000);
        } catch (err) { }
    };

    /*************************** Page Scroll Functionality (AI Generated) ****************************/

    /* Uses Box IDs to scroll to section */
    const scrollToSection = (sectionID) => {
        document.getElementById(sectionID).scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    /* Resets active state to "Home" when scrolling to top */
    useEffect(() => {
        const navigation = hero?.values?.navigation || {};

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "-20% 0px -60% 0px",
            }
        );

        Object.keys(navigation).forEach((id) => {
            if (id === "home") return;

            const element = document.getElementById(id);

            if (element) {
                observer.observe(element);
            }
        });

        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection("home");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [hero?.values?.navigation]);


    /* Renders the Hero papers */
    return (
        <Box
            sx={{ display: "grid", gap: 2,
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr minmax(240px, 30%)",
                    lg: "3fr 6fr minmax(240px, 3fr)",
                },
                gridTemplateAreas: {
                    xs: `"nav" "about" "contact" "languages"`,
                    md: `"about nav" "contact nav" "languages nav"`,
                    lg: `"contact about nav" "languages about nav"`,
                },
            }}>
            <Box sx={{ gridArea: "nav", display: "flex", pb: { xs: 2, sm: 2, md: 0 } }}>{createNavigation()}</Box>
            <Box sx={{ gridArea: "about" }}>{createAbout()}</Box>
            <Box sx={{ gridArea: "contact" }}>{createContact()}</Box>
            <Box sx={{ gridArea: "languages" }}>{createLanguages()}</Box>
        </Box>
    );
}