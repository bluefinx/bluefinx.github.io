import { Box, Card, Paper, Stack, Typography } from "@mui/material";

/* Builds a generic reference paper with reference: body, remark */
export default function ReferencePaper({ reference, sx }) {
    return (
        <Paper sx={{ maxWidth: 625, p: 5, display: "flex", flexDirection: "column", ...sx }}>
            <Stack direction="column" spacing={1} sx={{height: "100%", justifyContent: "center"}}>
                <Typography variant="body1" sx={{}}>
                    "{reference?.body}"
                </Typography>
                <Typography variant="caption" sx={{ display: "block", color: "text.faded", fontSize: 16 }}>
                    {reference?.role}
                </Typography>
            </Stack>
        </Paper>
    );
}