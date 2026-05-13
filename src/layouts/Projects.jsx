import { useState } from "react";
import { Box, Link, Paper, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import ExtendableCard from "../components/ExtendableCard.jsx";
import CardBodyProjects from "../components/CardBodyProjects.jsx";

/* Builds the Projects tab layout */
export default function Projects() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON tags object */
    const tagDefinitions = t("tags", { returnObjects: true });

    /* Reads JSON specific label object */
    const specificLabels = t("projects.keys.specific-labels", { returnObjects: true });

    /* Reads JSON projects object */
    const projects = t("projects", { returnObjects: true });

    /*************************** Tag Mapping ******************************/

    /* Defines tags for projects (e.g. "Digital Forensics") */
    const projectsTags = {
        "project-1": ["DF", "IR"],
        "project-2": ["DF", "IR", "SD"],
        "project-3": ["DF", "IR", "SD"],
        "project-4": ["PT", "SE"],
        "project-5": ["PT", "SE"],
        "project-6": ["PT"],
        "project-7": ["SE", "IT"],
        "project-8": ["PT", "DF", "IR"],
    };

    /* Creates filtered tag list: {TAG: {label: label, colour: colour}, ...} */
    function mapTags(projectKey) {
        return Object.fromEntries(
            projectsTags[projectKey]
                .filter((tagKey) => tagDefinitions[tagKey])
                .map((tagKey) => [tagKey, tagDefinitions[tagKey]])
        );
    }

    /*************************** Specific Mapping ******************************/

    /* Defines tags for projects (e.g. "Digital Forensics Skills" ) */
    const projectSpecificLabels = {
        "project-1": ["DF", "IR"],
        "project-2": ["DR", "SD"],
        "project-3": ["DR", "SD"],
        "project-4": ["PT", "SE"],
        "project-5": ["PT", "SE"],
        "project-6": ["PT"],
        "project-7": ["SE", "IT"],
        "project-8": ["PT", "DF"],
    };

    /* Creates formatted specific list: [{label: label, values: [string]}, ...]*/
    function mapSpecificEntries(key, specificEntries) {
        if (specificEntries.length > 0 && !Array.isArray(specificEntries[0])) {
            specificEntries = [specificEntries];
        }
        return projectSpecificLabels[key].map((label, index) => ({
            label: specificLabels[label] || label,
            values: specificEntries[index] || [],
        }));
    }

    /*************************** Expandable Functionality ******************************/

    /* Stores expanded states of cards */
    const [openProject, setOpenProjects] = useState({});

    /* Toggles expanded states of cards */
    const toggle = (key) => {
        setOpenProjects((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    /* Creates grid with extendable cards, passes title, tags, header, body, expanded state and click listener */
    return (
        <Box sx={{ columnCount: { xs: 1, sm: 1, md: 2 }, columnGap: 1.5 }}>
            {Object.entries(projects?.values).map(([key, project]) => (
                <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, }}>
                    <ExtendableCard
                        title={project?.title}
                        tags={mapTags(key)}
                        remarks={(typeof project?.remark === 'string' && project?.remark?.trim() !== '')
                            ? (key === "project-3"
                                ? (
                                    <Typography variant="body1" sx={{ px: 2, pb: 2, mt: -1, fontSize: '1rem', fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                                        {project?.remark?.split(project?.linkText)[0]}
                                        <Link href={project?.link} target="_blank" rel="noopener noreferrer" underline="hover">
                                            {project?.linkText}
                                        </Link>
                                        {project?.remark?.split(project?.linkText)[1]}
                                    </Typography>
                                )
                                : (
                                    <Typography variant="body1" sx={{ px: 2, pb: 2, mt: -1, fontSize: '1rem', fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                                        {project?.remark}
                                    </Typography>
                                )
                            )
                            : undefined
                        }
                        header={
                            <Paper sx={{ p: 2, m: 2 }}>
                                <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                                    {project?.summary}
                                </Typography>
                            </Paper>
                        }
                        body={
                            <CardBodyProjects
                                general={project?.general}
                                specific={mapSpecificEntries(key, project?.specific)}
                            />
                        }
                        expanded={openProject[key]}
                        onClick={() => toggle(key)} />
                </Box>
            ))}
        </Box>
    );
}