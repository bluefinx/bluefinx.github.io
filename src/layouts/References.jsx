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

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="h4" align="center" sx={{ pt: 4 }}>
                {references?.keys?.title}
            </Typography>
            <Stack direction="row" spacing={2} sx={{
                overflowX: 'auto', p: 2, '&::-webkit-scrollbar': { display: 'none', }, scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {Object.entries(references?.values).map(([key, reference]) => (
                    <ReferencePaper key={key} reference={reference} sx={{ minWidth: 250, flexShrink: 0 }} />
                ))}
            </Stack>
        </Stack>
    );
}