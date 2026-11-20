import { Chip } from "@mui/material";

/* Builds a Skills chip */
export default function Tag({ label }) {
    return (
        <Chip
            label={label}
            sx={{
                backgroundColor: "primary.main",
                color: "text.primary",
                fontSize: 11,
                    '@media (min-width:600px)': {
                    fontSize: 13,
                },
                    '@media (min-width:900px)': {
                    fontSize: 15,
                },
                borderRadius: 1
        }} />
    );
}