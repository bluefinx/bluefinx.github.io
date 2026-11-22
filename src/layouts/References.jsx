import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ReferencePaper from "../components/ReferencePaper.jsx";

/* Builds the References section layout */
export default function References() {

    /*************************** Localisation *********************************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON references object */
    const references = t('references', { returnObjects: true })

    /* Renders the reference cards & outer container */
    return (
        <Stack direction="column" spacing={2}>

            {/* Section Header */}
            <Stack>
                <Typography variant="sectionTitle" align="left" sx={{ pt: 4 }}>
                    {references?.keys?.title}
                </Typography>
                <Typography variant="sectionLabel" align="left" sx={{ pt: 0 }}>
                    {references?.keys?.subtitle}
                </Typography>
            </Stack>

            {/* References */}
            <Stack direction="row" spacing={2} sx={{ alignItems: "stretch",
                overflowX: 'auto', pt: 2, '&::-webkit-scrollbar': { display: 'none', }, scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {Object.entries(references?.values).map(([key, reference]) => (
                    <ReferencePaper key={key} reference={reference} sx={{ minWidth: 250, flexShrink: 0 }} />
                ))}
            </Stack>
        </Stack>
    );
}