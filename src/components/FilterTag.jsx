import { Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

/* Renders the chips for the projects filter*/
export default function FilterTag({ label, colour, textColour = "text.default", selected, onClick, sx }) {
    return (
        <Chip
            label={label}
            onClick={onClick}
            clickable
            variant="filled"
            icon={selected ? <CheckIcon /> : undefined}
            sx={{
                flexShrink: 0,
                borderRadius: 1,
                border: "none",
                fontSize: {xs: 11, sm: 13, md: 15},
                fontWeight: selected ? "bold" : "normal",
                height: { xs: 28, sm: 32, md: 36 },
                backgroundColor: colour,
                color: textColour,
                "& .MuiChip-icon": {
                    color: "inherit",
                    fontSize: "1.2em"
                },
                "&:hover": {
                    backgroundColor: colour,
                    filter: "brightness(0.92)",
                },
                "&:focus-visible": {
                    backgroundColor: colour,
                },
                ...sx,
            }}
        />
    );
}