import { Stack, Typography, Paper } from "@mui/material";

export default function ProjectHighlights({ highlights, isMobile }) {
    return (
        <Stack elevation={1} direction="row" spacing={2} sx={{ pb: 2}}>
            {highlights.map (([label, sublabel], index) => (
                <Paper key={index} sx={{ flex: 1, minWidth: 0, p: 1, pl: 2}}>
                    <Stack key={index} spacing={2} direction={isMobile ? "column" : "row"} sx={{ p: 0}}>
                        <Typography variant="paperHighlight" sx={{ p: 0, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap", textAlign: "center" }}>
                            {label}
                        </Typography>

                        <Typography variant="paperLabel" sx={{ p: 0, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap", textAlign: "left", alignSelf: "flex-end" }}>
                            {sublabel}
                        </Typography>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    )
}