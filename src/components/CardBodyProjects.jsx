import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

/* Builds the specific card body for Academic, Private & Experience Projects
 * with a general paper and one/two specific papers */
export default function CardBodyProjects({ general, specific }) {

    {/* Allows access to i18next JSON objects */ }
    const { t } = useTranslation();

    return (
        <Stack direction="column" spacing={1} sx={{ p: 2 }}>
            {/* Title "What I did" + list */}
            <Paper>
                <Stack direction="column" spacing={0} width="100%">
                    <Box sx={{ px: 2, pt: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: "bold" }}>
                            {t('projects.keys.general-title')}
                        </Typography>
                    </Box>
                    <Box component="ul" sx={{ pr: 2 }}>
                        {general && general.map((activity, index) => (
                            <li key={index}>
                                <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
                                    {activity}
                                </Typography>
                            </li>
                        ))}
                    </Box>
                </Stack>
            </Paper>

            {/* Learnings */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr", lg: "1fr 1fr" }, gap: 1 }}>
                {specific && Object.entries(specific).map(([key, item]) => (
                    /* Title "<Focus Area> Skills" + list */
                    <Paper key={key}>
                        <Stack direction="column">
                            <Box sx={{ px: 2, pt: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: "bold" }}>
                                    {item?.label}
                                </Typography>
                            </Box>
                            <Box component="ul" sx={{ pr: 2 }}>
                                {Object.entries(item?.values).map(([key, value]) => (
                                    <li key={key}>
                                        <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
                                            {value}
                                        </Typography>
                                    </li>
                                ))}
                            </Box>
                        </Stack>
                    </Paper>
                ))}
            </Box>
        </Stack>
    );
}