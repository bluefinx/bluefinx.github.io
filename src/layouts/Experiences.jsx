import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import ExtendableCard from "../components/ExtendableCard.jsx";
import CardBodyProjects from "../components/CardBodyProjects.jsx";

/* Builds the Experiences tab layout */
export default function Experiences() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON tags object */
    const tagDefinitions = t("tags", { returnObjects: true });

    /* Reads JSON specific label object */
    const specificLabels = t("experiences.keys.specific-labels", { returnObjects: true });

    /* Reads JSON experience object */
    const experiences = t("experiences", { returnObjects: true });

    /*************************** Tag Mapping ******************************/

    /* Defines tags for experiences (e.g. "Digital Forensics") */
    const experienceTags = {
        "experience-1": ["PT", "SE"],
        "experience-2": ["DP", "CP", "SE"],
        "experience-3": ["SD"]
    };

    /* Creates filtered tag list: {TAG: {label: label, colour: colour}, ...} */
    function mapTags(experienceKey) {
        return Object.fromEntries(
            experienceTags[experienceKey]
                .filter((tagKey) => tagDefinitions[tagKey])
                .map((tagKey) => [tagKey, tagDefinitions[tagKey]])
        );
    }

    /*************************** Specific Mapping ******************************/

    /* Defines tags for experiences (e.g. "Digital Forensics Skills" ) */
    const experienceSpecificLabels = {
        "experience-1": ["PT", "SE"],
        "experience-2": ["DP", "SE"],
        "experience-3": ["SD"]
    };

    /* Creates formatted specific list: [{label: label, values: [string]}, ...]*/
    function mapSpecificEntries(key, specificEntries) {
        if (specificEntries.length > 0 && !Array.isArray(specificEntries[0])) {
            specificEntries = [specificEntries];
        }
        return experienceSpecificLabels[key].map((label, index) => ({
            label: specificLabels[label] || label,
            values: specificEntries[index] || [],
        }));
    }

    /*************************** Layout Building ***********************************/

    /* Builds the remark section */
    function createRemark(company, time, location) {
        return (
            <Paper sx={{ mx: 2, mt: -1, mb: 2, p: 1 }} >
                <Stack direction="column">
                    <Typography variant="body1" sx={{ fontSize: '1rem', fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                        <span style={{ fontStyle: 'normal' }}>🏬 </span>{` ${company}\n`}
                        <span style={{ fontStyle: 'normal' }}>⏳ </span>{` ${time} · `}
                        <span style={{ fontStyle: 'normal' }}>🌍 </span>{` ${location}`}
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    /*************************** Expandable Functionality ******************************/

    /* Stores expanded states of cards */
    const [openExperience, setOpenExperiences] = useState({});

    /* Toggles expanded states of cards */
    const toggle = (key) => {
        setOpenExperiences((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    /* Creates grid with extendable cards, passes title, tags, header, body, expanded state and click listener */
    return (
        <Box sx={{ columnCount: { xs: 1, sm: 1, md: 2 }, columnGap: 1.5 }}>
            {Object.entries(experiences?.values).map(([key, experience]) => (
                <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, }}>
                    <ExtendableCard
                        title={experience?.title}
                        tags={mapTags(key)}
                        remarks={createRemark(experience?.company, experience?.time, experience?.location)}
                        header={
                            <Paper sx={{ p: 2, m: 2 }}>
                                <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                                    {experience?.summary}
                                </Typography>
                            </Paper>
                        }
                        body={
                            <CardBodyProjects
                                general={experience?.general}
                                specific={mapSpecificEntries(key, experience?.specific)}
                            />
                        }
                        expanded={openExperience[key]}
                        onClick={() => toggle(key)} />
                </Box>
            ))}
        </Box>
    );
}