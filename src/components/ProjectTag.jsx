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
                fontSize: 11,
                fontWeight: 500,
                border: '1px solid transparent',

                '@media (min-width:600px)': {
                    fontSize: 13,
                },
                '@media (min-width:900px)': {
                    fontSize: 15,
                },
                ...sx
            }}
        />
    );
}