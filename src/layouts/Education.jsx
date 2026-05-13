import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import ExtendableCard from "../components/ExtendableCard.jsx";
import Tag from "../components/Tag.jsx";

/* Builds the Education tab layout */
export default function Education() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON tags object */
    const tagDefinitions = t("tags", { returnObjects: true });

    /* Reads JSON education object */
    const education = t("education", { returnObjects: true });

    /*************************** Layout Building ***********************************/

    /* Builds the remark section */
    function createRemark(institution, time, location, grades, prize) {
        return (
            <Stack direction="column" spacing={1} sx={{ px: 2, mt: -1 }}>
                <Paper sx={{ p: 1 }}>
                    <Typography variant="body1" sx={{ fontSize: '1rem', fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                        <span style={{ fontStyle: 'normal' }}>🏫 </span>{` ${institution}\n`}
                        <span style={{ fontStyle: 'normal' }}>⏳ </span>{` ${time} · `}
                        <span style={{ fontStyle: 'normal' }}>🌍 </span>{` ${location}`}
                    </Typography>
                </Paper>
                <Paper sx={{ p: 1 }} >
                    <Typography variant="body1" sx={{ fontSize: '1rem', fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                        <span style={{ fontStyle: 'normal' }}>🎓 </span>{` ${grades}\n`}
                        {prize && <span style={{ fontStyle: 'normal' }}>🏆 </span>}{prize && `${prize}`}
                    </Typography>
                </Paper>
            </Stack>
        );
    }

    /* Creates object: [{key: key, label: label, colour: colour, modules: [string]}, ...]*/
    function mapModules(modules) {
        return Object.entries(modules)
            .filter(([key, value]) => tagDefinitions[key])
            .map(([key, moduleList]) => ({
                key: key,
                ...tagDefinitions[key],
                modules: moduleList
            }));
    }

    /* Builds the body section */
    function createBody(modules) {
        const mappedModules = mapModules(modules);
        return (
            <Stack direction="column" spacing={1} sx={{ p: 2 }}>
                {mappedModules?.map((area) => (
                    <Paper sx={{ p: 2 }}>
                        <Stack direction="column">
                            <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: "bold", pb: 0.5 }}>
                                {area?.label} Modules
                            </Typography>
                            <Box sx={{
                                overflowX: "auto", width: "100%", scrollbarWidth: "none",
                                "&::-webkit-scrollbar": { display: "none" }
                            }}>
                                <Stack direction="row" sx={{ alignItems: "flex-start", flexWrap: "wrap", gap: 1, minWidth: "fit-content" }}>
                                    {area?.modules?.map((module, index) => (
                                        <Tag key={index} label={module} colour={area.colour} textColour="text.default" sx={{
                                            flexShrink: 0, width: "max-content",
                                            "& .MuiChip-label": {
                                                whiteSpace: "nowrap",
                                                overflow: "visible",
                                                textOverflow: "clip"
                                            }
                                        }} />
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        );
    }

    /*************************** Expandable Functionality ******************************/

    /* Stores expanded states of cards */
    const [openEducation, setOpenEducations] = useState({});

    /* Toggles expanded states of cards */
    const toggle = (key) => {
        setOpenEducations((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    /* Creates grid with extendable cards, passes education details, expanded state and click listener */
    return (
        <Box sx={{ columnCount: { xs: 1, sm: 1, md: 2 }, columnGap: 1.5 }}>
            {/* Returns [[key, item], ...] as [["education-1", {title: "", ...}], ...] */}
            {Object.entries(education?.values).map(([key, education]) => (
                <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, }}>
                    <ExtendableCard
                        title={education?.title}
                        remarks={createRemark(education?.institution, education?.time, education?.location, education?.grades, education?.prize)}
                        header={
                            <Paper sx={{ p: 2, m: 2 }}>
                                <Typography variant="body1" sx={{ fontSize: '1rem', whiteSpace: 'pre-line' }}>
                                    {`${education?.summary}\n\n${education?.thesis}`}
                                </Typography>
                            </Paper>
                        }
                        body={createBody(education?.modules)}
                        expanded={!!openEducation[key]}
                        onClick={() => toggle(key)} />
                </Box>
            ))}
        </Box>
    );
}