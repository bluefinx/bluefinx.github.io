import { Chip } from "@mui/material";

/* Builds a Tags chip */
export default function ProjectTag({ label, colour, sx }) {
    return (
        <Chip
            label={label}
            sx={{
                backgroundColor: '#172536',
                color: colour,
                borderRadius: '999px',
                height: '24px',
                fontWeight: 500,
                border: '1px solid transparent',
                fontSize: { xs: 10, sm: 13, md: 15,},
                ...sx
            }}
        />
    );
}