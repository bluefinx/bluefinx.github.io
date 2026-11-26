import { useState } from "react";
import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { useTranslation } from 'react-i18next';

import DesktopCard from "../components/DesktopCard.jsx";
import MobileCard from "../components/MobileCard.jsx";
import FilterTag from "../components/FilterTag.jsx";
import {useMobileNavigation} from "../hooks/useSwipeNavigation.jsx";

import { AREAS} from "../config.jsx";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* Builds the Projects section layout */
export default function Projects() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON areas object */
    const tags = t("areas", { returnObjects: true });

    /* Reads JSON projects object */
    const projects = t("projects", { returnObjects: true });

    /*************************** Configuration ***********************************/

    /* Allows access to the global theme */
    const theme = useTheme();

    /* Stores whether layout is mobile or desktop */
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    /*************************** ProjectTag Mapping ***********************************/

    /* Defines tags for projects (e.g. "Digital Forensics") */
    const projectsTags = {
        "project-1": ["DF", "SD"],
    };

    /* Maps tag keys to their corresponding objects (tag key + (title & colour)) */
    function mapTags(projectKey) {
        return Object.fromEntries(
            (projectsTags[projectKey] || [])
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

    /*************************** Filtering **************************************************/

    /* Stores the selected area */
    const [selectedArea, setSelectedArea] = useState("ALL");

    /* Get all projects */
    const projectEntries = Object.entries(projects?.values || {});

    /* Counts all projects */
    const totalProjects = projectEntries.length;

    /* Count the projects per tag/area */
    const areaCounts = Object.fromEntries(
        Object.keys(tags).map((tagKey) => [
            tagKey,
            tagKey === "ALL"
            ? totalProjects
            : projectEntries.filter(([projectKey]) =>
                projectsTags[projectKey]?.includes(tagKey)
            ).length
        ])
    );

    /* Filter projects based on selected tags/areas */
    const filteredProjects = projectEntries.filter(([projectKey]) =>
        selectedArea === "ALL" ||
        projectsTags[projectKey]?.includes(selectedArea)
    );

    /*************************** Mobile Navigation with Swipe ****************************************/

    /* Determines the total projects per view */
    const total = filteredProjects.length;

    const {
        safeIndex,
        slideDirection,
        handlePrev,
        handleNext,
        handleTouchStart,
        handleTouchEnd,
    } = useMobileNavigation(filteredProjects.length, selectedArea);

    /* Renders project cards & outer containers */
    return (
        <Stack direction="column" spacing={2}>

            {/* Section Header */}
            <Stack>
                <Typography variant="sectionTitle" align="left" sx={{ pt: 4 }}>
                    {projects?.keys?.title}
                </Typography>
                <Typography variant="sectionLabel" align="left" sx={{ pt: 0 }}>
                    {projects?.keys?.subtitle}
                </Typography>
            </Stack>

            {/* Filtering */}
            <Box sx={{ display: "flex", alignItems: "center", border: "1px solid", borderColor: "text.disabled",
                    borderRadius: 1, px: 2, py: 1, minWidth: 0 }}>
                <Typography variant="paperBody" sx={{ flexShrink: 0, mr: 2, whiteSpace: "nowrap" }}>
                    {projects?.keys?.filter}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "nowrap", flex: 1, minWidth: 0,
                        overflowX: "auto", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none", msOverflowStyle: "none" }}>

                    {Object.entries(tags || {}).map(([tagKey, tag]) => (
                        <FilterTag
                            key={tagKey}
                            label={`${tag.label} (${areaCounts[tagKey] || 0})`}
                            colour={AREAS[tagKey]?.colour}
                            selected={selectedArea === tagKey}
                            onClick={() => setSelectedArea(tagKey)}
                            sx={{ flexShrink: 0 }}
                        />
                    ))}
                </Stack>
            </Box>

            {/* Projects */}
            {isMobile ? (
                total > 0 && (() => {
                    const [key, project] = filteredProjects[safeIndex];
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
                                title={project?.title}
                                type={project?.type}
                                date={project?.date}
                                tags={mapTags(key)}
                                highlights={project?.highlights}
                                sublabel={projects?.keys?.sublabel}
                                parts={project?.parts}
                                navigation={projects?.keys?.navigation}
                                skillsTitle={projects?.keys?.skills}
                                skills={project?.skills}
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
                    {filteredProjects.map(([key, project]) => (
                        <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, width: { sm: 550, lg: 700 },
                            minWidth: { sm: 550, lg: 700 }, flexShrink: 0 }}>
                            <DesktopCard
                                title={project?.title}
                                type={project?.type}
                                date={project?.date}
                                tags={mapTags(key)}
                                highlights={project?.highlights}
                                sublabel={projects?.keys?.sublabel}
                                parts={project?.parts}
                                navigation={projects?.keys?.navigation}
                                skillsTitle={projects?.keys?.skills}
                                skills={project?.skills}
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