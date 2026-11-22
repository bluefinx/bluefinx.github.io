import { Paper, Typography, Divider, Stack, Grid } from "@mui/material";
import { Card, CardHeader, CardContent } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslation } from 'react-i18next';

import ArticleIcon from '@mui/icons-material/Article';
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export default function EducationPartsPaper({ title, type, data }) {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON tags object */
    const tags = t("areas", { returnObjects: true });

    /* Creates the focus tab part */
    function createFocusPart() {
        return (
            <Stack spacing={2} sx={{ flex: 1}}>

                {/* Title */}
                <Typography variant="paperSection">
                    {title}
                </Typography>

                {/* Content */}
                <Typography variant="paperBody" sx={{ flex: 1 }}>
                    {data?.content}
                </Typography>

                <Stack spacing={1} sx={{ mt: "auto"}}>
                    <Divider />
                    {/* Sublabel */}
                    <Typography variant="paperLabel">
                        {data?.sublabel}
                    </Typography>

                    {/* Thesis */}
                    <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                        <ArticleIcon sx={{ fontSize: 40, flexShrink: 0, color: "secondary.main"}}/>
                        <Stack spacing={0} direction="column">
                            <Typography variant="paperLabel" sx={{ color: "text.primary" }}>
                                {data?.thesis[0]}
                            </Typography>
                            <Typography variant="timelineLabel" sx={{ color: "text.faded", fontStyle: "italic" }}>
                                {data?.thesis[1]}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        )
    }

    /* Creates the modules tab part */
    function createModulesPart() {
        const entries = Object.entries(data);
        // left column
        const left = entries.slice(0, 4);
        // right column
        const right = entries.slice(4, 7);

        // renders the card
        const renderCard = ([key, value]) => (
            <Card key={key} sx={{ flex: "1 0 auto", border: "1px solid", borderColor: tags[key].colour, borderRadius: 1, overflow: "hidden" }}>
                <CardHeader
                    title={tags[key].label}
                    sx={{
                        backgroundColor: tags[key].colour,
                        py: 1,
                        px: 2,
                        "& .MuiCardHeader-title": {
                            fontSize: { xs: 11, sm: 12, md: 14 },
                            fontWeight: 600,
                        }
                    }}/>

                <CardContent sx={{ py: 0, "&:last-child": { py: 1 } }}>
                    <List disablePadding dense>
                        {value.map((module, index) => (
                            <ListItem key={index} disableGutters sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 20 }}>
                                    <ChevronRightRoundedIcon sx={{ fontSize: 18, color: tags[key].colour }} />
                                </ListItemIcon>

                                <ListItemText
                                    primary={module}
                                    sx={{ my: 0 }}
                                    slotProps={{ primary: { variant: "moduleLabel" }}}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        );

        // places the cards in a grid
        return (
            <Grid container spacing={1}>
                <Grid size={6}>
                    <Stack spacing={1} sx={{ height: "100%" }}>
                        {left.map(renderCard)}
                    </Stack>
                </Grid>
                <Grid size={6}>
                    <Stack spacing={1} sx={{ height: "100%" }}>
                        {right.map(renderCard)}
                    </Stack>
                </Grid>
            </Grid>
        )
    }

    /* Renders the tab papers based on type */
    return (
        <Paper elevation={1} sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
            {type === "focus" && (
                createFocusPart()
            )}

            {type === "modules" && (
                createModulesPart()
            )}
        </Paper>
    )
}