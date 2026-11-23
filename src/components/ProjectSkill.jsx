import { Chip } from "@mui/material";

/* Builds a Skills chip */
export default function Tag({ label }) {
    return (
        <Chip
            label={label}
            sx={{
                backgroundColor: "primary.main",
                color: "text.primary",
                fontSize: {xs: 11, sm: 13, md: 15},
                borderRadius: 1
        }} />
    );
}