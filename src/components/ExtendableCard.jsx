import { Box, Card, Collapse, Stack, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import Tag from "./Tag";

/* Builds a generic extendable card layout with sections: title, tags, remarks, header, body */
export default function ExtendableCard({ title, tags, remarks, header, body, expanded, onClick, headerAlways }) {

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Allows access to the global theme */
    const theme = useTheme();

    /* Checks whether layout is mobile */
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card elevation={0} sx={{
            display: "flex", flexDirection: "column", cursor: "pointer", backgroundColor: 'background.default',
            border: '1px solid', borderRadius: 2, overflow: "hidden", transition: "all 0.2s ease",
            "&:hover": {
                boxShadow: 3,
                transform: "translateY(-2px)",
                borderColor: "primary.main"
            }
        }}>
            <Stack direction="column">
                <Stack direction="column" sx={{ flex: 1 }}>
                    {/* Static Part */}
                    <Stack direction="column" spacing={0} width="100%" sx={{ flexGrow: 1, justifyContent: expanded ? "flex-start" : "center" }}>

                        {/* Title */}
                        <Box sx={{ p: 2 }}>
                            <Typography variant="subtitle1" sx={{
                                fontSize: {
                                    xs: 17,
                                    sm: 17,
                                    md: 20,
                                }
                            }}>
                                {title}
                            </Typography>
                        </Box>

                        {/* Remarks */}
                        {remarks && remarks}

                        {/* Tags */}
                        {tags && Object.keys(tags).length > 0 && (
                            <Stack direction="row" sx={{ px: 2, flexWrap: "wrap", gap: 1 }}>
                                {Object.entries(tags).map(([key, value]) => (
                                    <Tag key={key} label={value?.label} colour={value?.colour} textColour="text.default" />
                                ))}
                            </Stack>
                        )}

                        {/* Header */}
                        {headerAlways ? (
                            <>
                                {/* Always show header when headerAlways is set */}
                                <Box>
                                    {header}
                                </Box>
                            </>
                        ) : (
                            !isMobile && (
                                <Box>
                                    {/* Show header if not on mobile */}
                                    {header}
                                </Box>
                            )
                        )}
                    </Stack>

                    {/*Extendable Part*/}
                    <Collapse in={expanded} timeout={200}>
                        {/* Body */}
                        {expanded && (
                            <>
                                {/* Show header if on mobile */}
                                {!headerAlways && isMobile && header}

                                {/* Always show body */}
                                {body}
                            </>
                        )}
                    </Collapse>
                </Stack>

                <Box onClick={onClick} sx={{ px: 2, pb: 1, pt: { xs: 2, sm: 2, md: 1 }, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0.5, color: "text.faded" }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
                        {expanded ? `${t('show-less')}` : `${t('show-more')}`}
                    </Typography>

                    <KeyboardDoubleArrowDownIcon sx={{ fontSize: 18, transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }} />
                </Box>
            </Stack >
        </Card >
    );
}