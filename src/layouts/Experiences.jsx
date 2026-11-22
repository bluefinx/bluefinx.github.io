import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import DesktopCard from "../components/DesktopCard.jsx";

/* Builds the Experiences section layout */
export default function Experiences() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON tags object */
    const tags = t("areas", { returnObjects: true });

    /* Reads JSON experience object */
    const experiences = t("new_experiences", { returnObjects: true });

    /*************************** Configuration ***********************************/

    /* Allows access to the global theme */
    const theme = useTheme();

    /* Stores whether layout is mobile or desktop */
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    /*************************** ExperienceTag Mapping ******************************/

    /* Defines tags for experiences (e.g. "Digital Forensics") */
    const experienceTags = {
        "experience-1": ["PT", "SD"],
        "experience-2": ["CP"],
        "experience-3": ["SD"]
    };

    /* Maps tag keys to their corresponding objects (tag key + (title & colour)) */
    function mapTags(projectKey) {
        return Object.fromEntries(
            (experienceTags[projectKey] || [])
                .filter((tagKey) => tagKey !== "ALL" && tags[tagKey])
                .map((tagKey) => [tagKey, tags[tagKey]])
        );
    }

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
            <Stack direction="row" spacing={2} sx={{ alignItems: "stretch",
                overflowX: 'auto', pt: 2, '&::-webkit-scrollbar': { display: 'none', }, scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {Object.entries(experiences?.values).map(([key, experience]) => (
                    <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, width: 700, minWidth: 700, flexShrink: 0 }}>
                        <DesktopCard
                            title={experience?.title}
                            type={experience?.type}
                            date={experience?.date}
                            tags={mapTags(key)}
                            highlights={experience?.highlights}
                            isMobile={isMobile}
                            parts={experience?.parts}
                            navigation={experiences?.keys?.navigation}
                            skillsTitle={experiences?.keys?.skills}
                            skills={experience?.skills}
                            isEducation={false}
                        />
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}