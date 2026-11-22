import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import DesktopCard from "../components/DesktopCard.jsx";

/* Builds the Education section layout */
export default function Education() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON experience object */
    const educations = t("new_education", { returnObjects: true });

    /*************************** Configuration ***********************************/

    /* Allows access to the global theme */
    const theme = useTheme();

    /* Stores whether layout is mobile or desktop */
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    /* Renders education cards & outer container */
    return (
        <Stack direction="column" spacing={2}>

            {/* Section Header */}
            <Stack>
                <Typography variant="sectionTitle" align="left" sx={{ pt: 4 }}>
                    {educations?.keys?.title}
                </Typography>
                <Typography variant="sectionLabel" align="left" sx={{ pt: 0 }}>
                    {educations?.keys?.subtitle}
                </Typography>
            </Stack>

            {/* Education */}
            <Stack direction="row" spacing={2} sx={{ alignItems: "stretch",
                overflowX: 'auto', pt: 2, '&::-webkit-scrollbar': { display: 'none', }, scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {Object.entries(educations?.values).map(([key, education]) => (
                    <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, width: 700, minWidth: 700, flexShrink: 0 }}>
                        <DesktopCard
                            title={education?.title}
                            type={education?.type}
                            date={education?.date}
                            tags={{}}
                            highlights={education?.highlights}
                            isMobile={isMobile}
                            parts={education?.parts}
                            navigation={educations?.keys?.navigation}
                            skillsTitle={educations?.keys?.skills}
                            skills={education?.skills}
                            isEducation={true}
                        />
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}