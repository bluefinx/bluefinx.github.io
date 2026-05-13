import { Box, Paper, Stack, Typography } from "@mui/material";

/* Builds a generic hero card layout with sections: title, body */
export default function HeroPaper({ title, body }) {
    return (
        <Paper sx={{ p: 2, width: "100%", height: "100%", display: "flex" }}>
            <Stack direction="column" sx={{ height: "100%", flexGrow: 1 }}>
                {title && (
                    <Typography variant="h5" sx={{ pl: 2 }}>
                        {title}
                    </Typography>
                )}
                <Box sx={{ flexGrow: 1, display: "flex" }}>
                    {body}
                </Box>
            </Stack>
        </Paper>
    );
}