import { Chip } from "@mui/material";

/* Builds a Tags chip */
export default function Tag({ label, colour, textColour, border, sx }) {
    return (
        <Chip label={label} sx={{
            backgroundColor: colour, color: textColour,
            fontSize: "0.9rem", borderRadius: 1, border: border, ...sx
        }} />
    );
}