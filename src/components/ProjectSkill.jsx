import { Chip } from "@mui/material";

/* Builds a Skills chip */
export default function Tag({ label }) {
    return (
        <Chip
            label={label}
            sx={{
                backgroundColor: "primary.main",
                color: "text.primary",
                fontSize: {xs: 11, sm: 12, md: 13},
                fontWeight: 700,
                borderRadius: 1,
                textTransform: "uppercase",
                height: "auto",
                "& .MuiChip-label": {
                    py: 0.5,
                },
        }} />
    );
}