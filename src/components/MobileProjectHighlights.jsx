import { Stack, Typography, Paper } from "@mui/material";

export default function MobileProjectHighlights({ highlights, isEducation }) {
    return (
        <Stack elevation={1} direction="column" spacing={1} sx={{ pb: 2, width: "100%" }}>
            {highlights.map (([label, sublabel], index) => (
                <Paper key={index} sx={{ alignSelf: index % 2 === 0 ? "flex-start" : "flex-end", width: "100%", maxWidth: "100%", px: 2 }}>
                    <Stack spacing={0} direction={"row"} sx={{ p: 0, alignItems: "stretch" }}>
                        <Typography variant={isEducation ? "paperHighlight2" : "paperHighlight"} sx={{ flex: 1, p: 0, pl: 1, minWidth: 0, display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
                            {label}
                        </Typography>

                        <Typography variant="paperLabel" sx={{ p: 0, pb: 0.75, pr: 0.75, minWidth: 0, textAlign: "right", alignSelf: "flex-end" }}>
                            {sublabel}
                        </Typography>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    )
}