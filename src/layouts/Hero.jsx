import { useState, useEffect } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import HeroPaper from "../components/HeroPaper.jsx";

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

    const contactButtons = {
        textTransform: "none",
        backgroundColor: "background.button",
        color: "text.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minWidth: 0,
        height: 48,
        width: "100%",
        fontSize: 16,
    };

    const logoStyle = {
        maxHeight: 24,
        maxWidth: "80%",
        width: "auto",
        height: "auto",
        objectFit: "contain",
        display: "block",
    };

    /* Builds the Contact body */
    function createContactBody() {
        return (
            <Stack spacing={1} sx={{ justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%" }}>
                {/* Logo */}
                <Box sx={{flex: 1, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "150px",
                    padding: 2}}>
                    <Box component="img" src={Logo} alt={hero?.keys?.logo?.alt}
                        sx={{maxWidth: "100%", maxHeight: "120px", height: "auto", objectFit: "contain"}}/>
                </Box>
                {/* Email */}
                <Button
                    onClick={handleCopy}
                    variant="contained"
                    sx={contactButtons}
                    startIcon={
                        emailCopied
                            ? <CheckIcon />
                            : <ContentCopyOutlinedIcon />
                    }
                >
                    {emailCopied
                        ? hero?.keys?.contact?.emailCopied
                        : hero?.keys?.contact?.email}
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
            </Stack>
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

    /* Builds the Navigation body */
    function createNavigationBody() {
        return (
            <Stack spacing={0} sx={{width: "100%", pt: 2, pl: 2,}}>
                {sections.map((section, index) => {
                    const active = activeSection === section.id;
                    return (
                        <Box key={section.id} onClick={() => {
                                if (section.link) {
                                    scrollToSection(section.id);
                                }
                            }}
                            sx={{display: "flex", alignItems: "stretch", minHeight: 48, cursor: section.link ? "pointer" : "default"}}
                        >
                            {/* Timeline line and dot */}
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: 24, mr: 2}}>
                                <Box sx={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: "50%",
                                        bgcolor: active
                                            ? "background.button"
                                            : "text.faded",
                                        border: "2px solid",
                                        borderColor: active
                                            ? "primary.main"
                                            : "text.faded",
                                        transition: "all 0.2s ease",
                                        flexShrink: 0,
                                    }}/>

                                {index !== sections.length - 1 && (
                                    /* Line */
                                    <Box
                                        sx={{
                                            width: 2,
                                            flexGrow: 1,
                                            bgcolor: "background.disabled",
                                            minHeight: 30,
                                        }}/>
                                )}
                            </Box>

                            {/* Label */}
                            <Box sx={{ pb: 2, display: "flex", flexDirection: "column" }}>
                                <Typography
                                    sx={{
                                        color: active ? "background.button" : "text.faded",
                                        fontWeight: active ? 700 : 500,
                                        fontSize: "1rem",
                                        transition: "all 0.2s ease",
                                        "&:hover": section.link
                                            ? { color: "background.button" }
                                            : {},
                                    }}
                                >
                                    {section.label}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "text.disabled",
                                        fontSize: "0.8rem",
                                        mt: 0.3,
                                    }}
                                >
                                    {section.subtitle}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        )
    }

    /* Builds the Languages body */
    function createLanguagesBody() {
        return (
            <Grid container spacing={1} sx={{ width: "100%" }}>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: "grow" }}>
                    {/* Title Button */}
                    <Button
                        disabled
                        variant="text"
                        sx={{
                            width: "100%",
                            height: "100%",
                            textTransform: "none",
                            backgroundColor: "transparent",
                            border: "none",
                            boxShadow: "none",
                            color: "text.primary",
                            fontSize: 16,
                            fontWeight: "bold",
                            "&.Mui-disabled": {
                                color: "text.primary",
                                opacity: 1,
                            },
                        }}
                    >
                        <Typography variant="h5" sx={{ pl: 2 }}>
                            {hero?.keys?.languages?.title}
                        </Typography>
                    </Button>
                </Grid>

                {/* Language Buttons */}
                {hero?.values?.languages?.map((language, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: "grow" }} key={index}>
                        <Button
                            disabled
                            variant="contained"
                            sx={{
                                width: "100%",
                                textTransform: "none",
                                backgroundColor: "background.disabled",
                                color: "text.default",
                                fontSize: 16,
                                "&.Mui-disabled": {
                                    backgroundColor: "background.disabled",
                                    color: "text.default",
                                    opacity: 1,
                                },
                            }}
                        >
                            {language}
                        </Button>
                    </Grid>
                ))}
            </Grid>
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
        <Box
            sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr minmax(200px, 25%)",
                    lg: "7fr 3fr minmax(180px, 2fr)",
                },
                gridTemplateAreas: {
                    xs: `"nav" "about" "contact" "languages"`,
                    md: `"about nav" "contact contact" "languages languages"`,
                    lg: `"about contact nav" "languages languages nav"`,
                },
            }}
        >
            {/* About */}
            <Box sx={{ gridArea: "about" }}>
                <HeroPaper
                    title={hero?.keys?.about?.title}
                    body={createAboutBody()}
                    sx={{ height: "100%" }}
                />
            </Box>

            {/* Contact */}
            <Box sx={{ gridArea: "contact" }}>
                <HeroPaper
                    body={createContactBody()}
                    sx={{ height: "100%" }}
                />
            </Box>

            {/* Languages */}
            <Box sx={{ gridArea: "languages" }}>
                <HeroPaper body={createLanguagesBody()} />
            </Box>

            {/* Navigation */}
            <Box sx={{ gridArea: "nav", display: "flex" }}>
                <HeroPaper
                    title={hero?.keys?.navigation?.title}
                    body={createNavigationBody()}
                    sx={{ flex: 1 }}
                />
            </Box>
        </Box>
    );
}