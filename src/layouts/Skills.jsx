import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ExtendableCard from "../components/ExtendableCard.jsx";
import Tag from "../components/Tag.jsx";

/* Builds the Skills tab layout */
export default function Skills() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON skills object */
    const skills = t("skills", { returnObjects: true })

    /* Reads JSON focus areas object */
    const focusAreas = t("focus-areas", { returnObjects: true })

    /*************************** Layout Building ***********************************/

    /* Builds the header section */
    function createHeader(title, topSkills, colour) {
        return (
            <Paper sx={{ p: 2, m: 2, mt: -1 }}>
                <Stack direction="column">
                    <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: "bold", pb: 0.5 }}>
                        <span style={{ fontStyle: 'normal' }}>🏆 </span>{` ${title}`}
                    </Typography>
                    <Box sx={{
                        overflowX: "auto", width: "100%", scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" }
                    }}>
                        <Stack direction="row" sx={{ alignItems: "flex-start", flexWrap: "wrap", gap: 1, minWidth: "fit-content" }}>
                            {topSkills?.map((skill, index) => (
                                <Tag key={index} label={skill} colour={colour} textColour="text.default" sx={{
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
        );
    }

    /* Builds the body section */
    function createBody(areaSkills, colour) {
        return (
            <Stack direction="column" spacing={1} sx={{ p: 2 }}>
                {Object.entries(areaSkills).map(([key, type]) => (
                    <Paper key={key} sx={{ p: 2 }}>
                        <Stack direction="column">
                            <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: "bold", pb: 0.5 }}>
                                {skills?.keys[key]}
                            </Typography>
                            <Box sx={{
                                overflowX: "auto", width: "100%", scrollbarWidth: "none",
                                "&::-webkit-scrollbar": { display: "none" }
                            }}>
                                <Stack direction="row" sx={{ alignItems: "flex-start", flexWrap: "wrap", gap: 1, minWidth: "fit-content" }}>
                                    {type?.map((skill, index) => (
                                        <Tag key={index} label={skill} colour={colour} textColour="text.default" sx={{
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
    const [openSkill, setOpenSkills] = useState({});

    /* Toggles expanded states of cards */
    const toggle = (key) => {
        setOpenSkills((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <Box sx={{ columnCount: { xs: 1, sm: 1, md: 2 }, columnGap: 1.5 }}>
            {/* Returns [[key, value], ...] as [{ key: "DF", value: { topSkills: [], allSkills: {technical: [], ...}}}], ...] */}
            {Object.entries(skills?.values).map(([key, area]) => (
                <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, }}>
                    <ExtendableCard
                        title={focusAreas?.values[key]?.title}
                        header={createHeader(skills?.keys?.topSkills, area?.topSkills, focusAreas?.values[key]?.colour)}
                        body={createBody(area?.allSkills, focusAreas?.values[key]?.colour)}
                        expanded={!!openSkill[key]}
                        onClick={() => toggle(key)}
                        headerAlways={true} />
                </Box>
            ))}
        </Box>
    );
}