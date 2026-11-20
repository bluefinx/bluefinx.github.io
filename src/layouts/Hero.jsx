import { useState, useEffect } from "react";
import { Box, Button, Grid, Stack, Paper, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import Logo from "../assets/logo.png";
import LinkedIn from "../assets/LinkedIn.png";
import GitHub from "../assets/GitHub.png";

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CheckIcon from '@mui/icons-material/Check';

/* Builds the Hero section layout */
export default function Hero() {

    /*************************** Localisation *********************************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON hero object */
    const hero = t('hero', { returnObjects: true })

    /*************************** Layout Building ***********************************/

    /* Builds the About paper */
    function createAbout() {
        return (
            <Paper sx={{ p: 2, width: "100%", height: "100%", display: "flex" }}>
                <Stack direction="column" sx={{ height: "100%", flexGrow: 1 }}>
                    {/* Title*/}
                    <Typography variant="paperTitle" sx={{ pl: 2 }}>
                        {hero?.keys?.about?.title}
                    </Typography>

                    {/* Body */}
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        <Stack direction="column" spacing={1} sx={{ pt: 2, p: 2, pr: 6 }}>
                            <Typography variant="paperBody" sx={{ whiteSpace: 'pre-line' }}>
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
            <Paper sx={{ gridArea: "contact", p: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                {/* Logo */}
                <Box sx={{ flex: 1, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "150px", padding: 2 }}>
                    <Box component="img" src={Logo} alt={hero?.keys?.logo?.alt}
                         sx={{ maxWidth: "100%", maxHeight: "120px", height: "auto", objectFit: "contain" }} />
                </Box>

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
                            href={hero?.values?.contact?.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={hero?.keys?.contact?.linkedin}
                            sx={contactButtons}
                        >
                            <Box component="img" src={LinkedIn} alt="" sx={logoStyle} />
                        </Button>
                    </Grid>
                    <Grid size={6}>
                        <Button
                            variant="contained"
                            href={hero?.values?.contact?.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={hero?.keys?.contact?.github}
                            sx={contactButtons}
                        >
                            <Box component="img" src={GitHub} alt="" sx={logoStyle} />
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    /* Navigation sections */
    const sections = [
        { id: "home", label: hero?.values?.navigation?.home, subtitle: hero?.values?.navigation?.home_sub, link: false },
        { id: "projects", label: hero?.values?.navigation?.projects, subtitle: hero?.values?.navigation?.projects_sub, link: true },
        { id: "experience", label: hero?.values?.navigation?.experience, subtitle: hero?.values?.navigation?.experience_sub, link: true },
        { id: "education", label: hero?.values?.navigation?.education, subtitle: hero?.values?.navigation?.education_sub, link: true },
        { id: "achievements", label: hero?.values?.navigation?.achievements, subtitle: hero?.values?.navigation?.achievements_sub, link: true },
        { id: "references", label: hero?.values?.navigation?.references, subtitle: hero?.values?.navigation?.references_sub, link: true },
    ];

    /* Stores the active section with default "Home" */
    const [activeSection, setActiveSection] = useState("home");

    /* Builds the Navigation paper */
    function createNavigation() {
        return (
            <Paper sx={{ gridArea: "nav", p: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <Stack spacing={0} sx={{ flexGrow: 1, width: "100%", pt: 2, pl: 2 }}>
                    {sections.map((section, index) => {
                        const active = activeSection === section.id;
                        return (
                            <Box key={section.id} onClick={() => {
                                if (section.link) {
                                    scrollToSection(section.id);
                                }}}
                                 sx={{ display: "flex", alignItems: "stretch", minHeight: 48, cursor: section.link ? "pointer" : "default" }}>
                                {/* Timeline line and dot */}
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: 24, mr: 2 }}>
                                    <Box sx={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: "50%",
                                        bgcolor: active ? "primary.main" : "text.faded",
                                        border: "2px solid",
                                        borderColor: active ? "primary.main" : "text.faded",
                                        transition: "all 0.2s ease",
                                        flexShrink: 0,
                                    }}/>

                                    {index !== sections.length - 1 && (
                                        /* Line */
                                        <Box sx={{ width: 2, flexGrow: 1, bgcolor: "divider", minHeight: 30 }}/>
                                    )}
                                </Box>

                                {/* Label */}
                                <Box sx={{ pb: 2, display: "flex", flexDirection: "column" }}>
                                    <Typography variant="paperBody"
                                        sx={{
                                            color: active ? "primary.main" : "text.default",
                                            fontWeight: active ? 600 : 600,
                                            transition: "all 0.2s ease",
                                            "&:hover": section.link ? { color: "primary.main" } : {},
                                        }}>
                                        {section.label}
                                    </Typography>

                                    <Typography variant="timelineLabel" sx={{ mt: 0.3 }}>
                                        {section.subtitle}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Stack>
            </Paper>
        );
    }

    /* Builds the Languages paper */
    function createLanguages() {
        return (
            <Paper sx={{ p: 2, width: "100%", height: "100%", display: "flex" }}>
                <Grid container spacing={1} sx={{ width: "100%" }}>

                    {/* Language Buttons */}
                    {hero?.values?.languages?.map((language, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: "grow" }} key={index}>
                            <Button
                                disabled
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
                        </Grid>
                    ))}
                </Grid>
            </Paper>
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

    /*************************** Page Scroll Functionality ***********************************/

    /* Uses Box IDs to scroll to section */
    const scrollToSection = (sectionID) => {
        document.getElementById(sectionID).scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    /* Resets active state to "Home" when scrolling to top */
    useEffect(() => {
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

        sections.forEach((section) => {
            if (section.id === "home") return;

            const element = document.getElementById(section.id);

            if (element) observer.observe(element);
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
    }, []);


    return (
        <Box sx={{ display: "grid", gap: 2,
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr minmax(200px, 25%)",
                    lg: "7fr 3fr minmax(180px, 2fr)",
                },
                gridTemplateAreas: {
                    xs: `"nav" "about" "contact" "languages"`,
                    md: `"about nav" "contact contact" "languages languages"`,
                    lg: `"about contact nav" "languages languages nav"`,
                } }}>

            {/* About */}
            <Box sx={{ gridArea: "about" }}>
                {createAbout()}
            </Box>

            {/* Contact */}
            <Box sx={{ gridArea: "contact" }}>
                {createContact()}
            </Box>

            {/* Languages */}
            <Box sx={{ gridArea: "languages" }}>
                {createLanguages()}
            </Box>

            {/* Navigation */}
            <Box sx={{ gridArea: "nav", display: "flex" }}>
                {createNavigation()}
            </Box>
        </Box>
    );
}