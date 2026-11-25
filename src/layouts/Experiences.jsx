import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { useTranslation } from 'react-i18next';

import DesktopCard from "../components/DesktopCard.jsx";
import MobileCard from "../components/MobileCard.jsx";
import {useMobileNavigation} from "../hooks/useSwipeNavigation.jsx";

import { AREAS } from "../config.jsx";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* Builds the Experiences section layout */
export default function Experiences() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON tags object */
    const tags = t("areas", { returnObjects: true });

    /* Reads JSON experience object */
    const experiences = t("experiences", { returnObjects: true });

    /*************************** Configuration ***********************************/

    /* Allows access to the global theme */
    const theme = useTheme();

    /* Stores whether layout is mobile or desktop */
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    /*************************** ExperienceTag Mapping ******************************/

    /* Defines tags for experiences (e.g. "Digital Forensics") */
    const experienceTags = {
        "experience-1": ["SA", "PT"],
        "experience-2": ["CP", "VM"],
        "experience-3": ["SD"]
    };

    /* Maps tag keys to their corresponding objects (tag key + (title & colour)) */
    function mapTags(experienceKey) {
        return Object.fromEntries(
            (experienceTags[experienceKey] || [])
                .filter((tagKey) => tagKey !== "ALL" && tags[tagKey])
                .map((tagKey) => [
                    tagKey,
                    {
                        ...tags[tagKey],
                        colour: AREAS[tagKey]?.colour
                    }
                ])
        );
    }

    /*************************** Mobile Navigation with Swipe ****************************************/

    /* Get all experiences */
    const experienceEntries = Object.entries(experiences?.values || {});

    /* Counts all experiences */
    const total = experienceEntries.length;

    const {
        safeIndex,
        slideDirection,
        handlePrev,
        handleNext,
        handleTouchStart,
        handleTouchEnd,
    } = useMobileNavigation(experienceEntries.length);

    /* Renders experience cards & outer containers */
    return (
        <Stack direction="column" spacing={2}>

            {/* Section Header */}
            <Stack>
                <Typography variant="sectionTitle" align="left" sx={{ pt: 4 }}>
                    {experiences?.keys?.title}
                </Typography>
                <Typography variant="sectionLabel" align="left" sx={{ pt: 0 }}>
                    {experiences?.keys?.subtitle}
                </Typography>
            </Stack>

            {/* Experiences */}
            {isMobile ? (
                total > 0 && (() => {
                    const [key, experience] = experienceEntries[safeIndex];
                    return (
                        <Box key={key} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
                             sx={{
                                 width: "100%",
                                 touchAction: "pan-y",

                                 transition: slideDirection
                                     ? "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease"
                                     : "none",

                                 transform: slideDirection
                                     ? `translate3d(${slideDirection === "left" ? "-50px" : "50px"}, 0, 0)`
                                     : "translate3d(0, 0, 0)",

                                 opacity: slideDirection ? 0 : 1,

                                 willChange: slideDirection ? "transform, opacity" : "auto",
                                 backfaceVisibility: "hidden",
                             }}>
                            <MobileCard
                                title={experience?.title}
                                type={experience?.type}
                                date={experience?.date}
                                tags={mapTags(key)}
                                highlights={experience?.highlights}
                                parts={experience?.parts}
                                navigation={experiences?.keys?.navigation}
                                skillsTitle={experiences?.keys?.skills}
                                skills={experience?.skills}
                                isEducation={false}
                            />
                        </Box>
                    );
                })()
            ) : (
                <Stack direction="row" spacing={2} sx={{ alignItems: "stretch",
                    overflowX: 'auto', pt: 2, '&::-webkit-scrollbar': { display: 'none', }, scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {experienceEntries.map(([key, experience]) => (
                        <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, width: { sm: 550, lg: 700 },
                            minWidth: { sm: 550, lg: 700 }, flexShrink: 0 }}>
                            <DesktopCard
                                title={experience?.title}
                                type={experience?.type}
                                date={experience?.date}
                                tags={mapTags(key)}
                                highlights={experience?.highlights}
                                parts={experience?.parts}
                                navigation={experiences?.keys?.navigation}
                                skillsTitle={experiences?.keys?.skills}
                                skills={experience?.skills}
                                isEducation={false}
                            />
                        </Box>
                    ))}
                </Stack>
            )}

            {/* Mobile Navigation */}
            {isMobile && total > 0 && (
                <Stack direction="row" sx={{ width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    <IconButton onClick={handlePrev} disabled={safeIndex === 0}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: "10px",
                                    color: "text.primary",
                                }}>
                        <ChevronLeftIcon />
                    </IconButton>

                    <Typography variant="paperSection"
                                sx={{
                                    textAlign: "center",
                                    fontWeight: 600,
                                    fontVariantNumeric: "tabular-nums",
                                }}>
                        {String(safeIndex + 1).padStart(2, "0")}
                        <Box component="span" sx={{ color: "text.secondary", mx: 0.5 }}>
                            /
                        </Box>
                        {String(total).padStart(2, "0")}
                    </Typography>

                    <IconButton onClick={handleNext} disabled={safeIndex === total - 1} sx={{
                        width: 40,
                        height: 40,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "10px",
                        color: "text.primary",
                    }}>
                        <ChevronRightIcon />
                    </IconButton>
                </Stack>
            )}
        </Stack>
    );
}