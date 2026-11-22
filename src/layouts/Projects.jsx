import { useState } from "react";
import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import DesktopCard from "../components/DesktopCard.jsx";
import FilterTag from "../components/FilterTag.jsx";

/* Builds the Projects section layout */
export default function Projects() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON areas object */
    const tags = t("areas", { returnObjects: true });

    /* Reads JSON projects object */
    const projects = t("new_projects", { returnObjects: true });

    /*************************** Configuration ***********************************/

    /* Allows access to the global theme */
    const theme = useTheme();

    /* Stores whether layout is mobile or desktop */
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    /*************************** ProjectTag Mapping ***********************************/

    /* Defines tags for projects (e.g. "Digital Forensics") */
    const projectsTags = {
        "project-1": ["DF", "CP"],
    };

    /* Maps tag keys to their corresponding objects (tag key + (title & colour)) */
    function mapTags(projectKey) {
        return Object.fromEntries(
            (projectsTags[projectKey] || [])
                .filter((tagKey) => tagKey !== "ALL" && tags[tagKey])
                .map((tagKey) => [tagKey, tags[tagKey]])
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
                            colour={tag.colour}
                            selected={selectedArea === tagKey}
                            onClick={() => setSelectedArea(tagKey)}
                            sx={{ flexShrink: 0 }}
                        />
                    ))}
                </Stack>
            </Box>

            {/* Projects */}
            <Stack direction="row" spacing={2} sx={{ alignItems: "stretch",
                overflowX: 'auto', pt: 2, '&::-webkit-scrollbar': { display: 'none', }, scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {filteredProjects.map(([key, project]) => (
                    <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, width: 700, minWidth: 700, flexShrink: 0 }}>
                        <DesktopCard
                            title={project?.title}
                            type={project?.type}
                            date={project?.date}
                            tags={mapTags(key)}
                            highlights={project?.highlights}
                            isMobile={isMobile}
                            parts={project?.parts}
                            navigation={projects?.keys?.navigation}
                            skillsTitle={projects?.keys?.skills}
                            skills={project?.skills}
                            isEducation={false}
                        />
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}