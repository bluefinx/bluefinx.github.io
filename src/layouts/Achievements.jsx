import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { useTranslation } from 'react-i18next';

import AchievementCard from "../components/AchievementCard.jsx";
import {useMobileNavigation} from "../hooks/useSwipeNavigation.jsx";

import { CATEGORIES } from "../config.jsx";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* Builds the Achievements section layout */
export default function Achievements() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON experience object */
    const achievements = t("achievements", { returnObjects: true });

    /*************************** Configuration ***********************************/

    /* Allows access to the global theme */
    const theme = useTheme();

    /* Stores whether layout is mobile or desktop */
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    /*************************** Mobile Navigation with Swipe ****************************************/

    /* Get all educations */
    const achievementEntries = Object.entries(achievements?.values || {});

    /* Counts all experiences */
    const total = achievementEntries.length;

    const {
        safeIndex,
        slideDirection,
        handlePrev,
        handleNext,
        handleTouchStart,
        handleTouchEnd,
    } = useMobileNavigation(achievementEntries.length);

    /* Renders achievement cards & outer container */
    return (
        <Stack direction="column" spacing={2}>

            {/* Section Header */}
            <Stack>
                <Typography variant="sectionTitle" align="left" sx={{ pt: 4 }}>
                    {achievements?.keys?.title}
                </Typography>
                <Typography variant="sectionLabel" align="left" sx={{ pt: 0 }}>
                    {achievements?.keys?.subtitle}
                </Typography>
            </Stack>

            {/* Achievements */}
            {isMobile ? (
                total > 0 && (() => {
                    const [key, achievement] = achievementEntries[safeIndex];
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
                            <AchievementCard
                                categoryLabel={achievements?.keys?.categories?.[achievement?.category]?.label}
                                categoryIcon={CATEGORIES[achievement?.category]?.icon}
                                categoryColour={CATEGORIES[achievement?.category]?.colour}
                                achievement={achievement}
                                isMobile={isMobile}
                            />
                        </Box>
                    );
                })()
            ) : (
                <Stack direction="row" spacing={2} sx={{ alignItems: "stretch",
                    overflowX: 'auto', pt: 2, '&::-webkit-scrollbar': { display: 'none', }, scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {achievementEntries.map(([key, achievement]) => (
                        <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, width: { sm: 350, lg: 400 },
                            minWidth: { sm: 350, lg: 400 }, flexShrink: 0 }}>
                            <AchievementCard
                                categoryLabel={achievements?.keys?.categories?.[achievement?.category]?.label}
                                categoryIcon={CATEGORIES[achievement?.category]?.icon}
                                categoryColour={CATEGORIES[achievement?.category]?.colour}
                                achievement={achievement}
                                isMobile={isMobile}
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