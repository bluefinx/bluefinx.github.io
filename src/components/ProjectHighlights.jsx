import { Stack, Typography, Paper } from "@mui/material";

export default function ProjectHighlights({ highlights, isEducation }) {
    return (
        <Stack elevation={1} direction="row" spacing={2} sx={{ pb: 2}}>
            {highlights.map (([label, sublabel], index) => (
                <Paper key={index} sx={{ flex: 1, minWidth: 0, p: { xs: 0, md: 1 }, pl: { xs: 0, md: 2 }}}>
                    <Stack spacing={0} direction={"column"} sx={{ p: 0, height: "100%" }}>
                        <Typography variant={isEducation ? "paperHighlight2" : "paperHighlight"} sx={{ flex: 1, p: 0, pl: 1, minWidth: 0, display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
                            {label}
                        </Typography>

                        <Typography variant="paperLabel" sx={{ p: 0, pb: { xs: 0.75, md: 0 }, pr: { xs: 0.75, md: 2 }, minWidth: 0, textAlign: "right" }}>
                            {sublabel}
                        </Typography>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    )
}