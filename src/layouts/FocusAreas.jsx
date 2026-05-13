import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Tag from "../components/Tag.jsx";

export default function FocusAreas() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON focus area object */
    const focusAreas = t('focus-areas', { returnObjects: true })

    return (
        <Stack direction="column" spacing={2} sx={{ pt: 2 }}>
            <Typography variant="h4" align="center">
                {focusAreas?.keys?.title}
            </Typography>
            <Stack direction="column" spacing={2}>
                {Object.entries(focusAreas?.values).map(([key, area]) => (
                    <Accordion key={key} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: area?.colour }}>
                            <Typography variant="h6" sx={{ fontSize: '1.0rem' }}>
                                {area?.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{
                                overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none', }, scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }}>
                                <Box sx={{ minWidth: 'max-content' }}>
                                    <Stack direction="column" spacing={2}>
                                        <Typography variant="subtitle1" sx={{ fontSize: '1.0rem', fontStyle: 'italic' }}>
                                            {focusAreas?.keys?.services}
                                        </Typography>
                                        {Object.entries(area?.services).map(([key, service]) => (
                                            <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ width: 360, flexShrink: 0 }}>
                                                    <Tag label={service?.label} colour="background.default" textColour="text.default" border="1px solid" sx={{ fontWeight: 'bold' }} />
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap' }}>
                                                    {service?.skills?.map((skill, index) => (
                                                        <Tag key={index} label={skill} colour={area?.colour} textColour="text.default" sx={{ flexShrink: 0 }} />
                                                    ))}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Stack>
    );
}