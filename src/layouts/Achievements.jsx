import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import AchievementCard from "../components/AchievementCard.jsx";

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
            <Stack direction="row" spacing={2} sx={{ alignItems: "stretch",
                overflowX: 'auto', pt: 2, '&::-webkit-scrollbar': { display: 'none', }, scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {Object.entries(achievements?.values).map(([key, achievement]) => (
                    <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, width: 400, minWidth: 400, flexShrink: 0 }}>
                        <AchievementCard
                            category={achievements?.keys?.categories[achievement?.category]}
                            achievement={achievement}
                            isMobile={isMobile}
                        />
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}