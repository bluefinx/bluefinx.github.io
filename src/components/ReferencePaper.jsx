import { Box, Card, Paper, Stack, Typography } from "@mui/material";

/* Builds a generic reference paper with reference: body, remark */
export default function ReferencePaper({ reference, sx }) {
    return (
        <Paper sx={{ maxWidth: 700, p: 5, ...sx }}>
            <Stack direction="column" spacing={1}>
                <Typography variant="body1" sx={{}}>
                    "{reference?.body}"
                </Typography>
                <Typography variant="caption" sx={{ display: "block", color: "text.faded", fontSize: 16 }}>
                    {reference?.remark?.name} ({reference?.remark?.role})
                </Typography>
            </Stack>
        </Paper>
    );
}