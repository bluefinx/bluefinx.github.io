import { Paper, Typography, Divider, Stack } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function ProjectPartsPaper({ title, content, sublabel, takeaways }) {
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