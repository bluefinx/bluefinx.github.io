import { Paper, Typography, Divider, Stack, Button } from "@mui/material";

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import GitHubIcon from "@mui/icons-material/GitHub";

import {contactButtons} from "../theme/styles.jsx";
import {linkedInLink} from "../config.jsx";

export default function ProjectPartsPaper({ title, content, sublabel, takeaways, link }) {
    return (
        <Paper elevation={1} sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2} sx={{ height: "100%" }}>

                {/* Title */}
                <Typography variant="paperSection">
                    {title}
                </Typography>

                {/* Content */}
                <Typography variant="paperBody" sx={{ flex: 1, whiteSpace: 'pre-line' }}>
                    {content}
                </Typography>

                <Stack spacing={1}>
                    {link && (
                        <Button
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={linkedInLink}
                            variant="contained"
                            sx={{...contactButtons, alignSelf: "flex-end", width: "fit-content", minWidth: 0, height: 32 }}
                            startIcon={<GitHubIcon />}>
                            <Typography variant="paperBody">
                                {link.label}
                            </Typography>
                        </Button>
                    )}

                    <Divider />
                    {/* Sublabel */}
                    <Typography variant="paperLabel" sx={{pb: 1 }}>
                        {sublabel}
                    </Typography>

                    {/* Takeaways */}
                    <Stack spacing={0} sx={{ mt: "auto !important", gap: { xs: 1, sm: 0 }, }}>
                        {takeaways.map((takeaway, index) => (
                            <Stack key={index} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                <TaskAltIcon fontSize="small" sx={{ color: "secondary.main"}} />
                                <Typography variant="paperLabel" sx={{ color: "text.primary" }}>
                                    {takeaway}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}