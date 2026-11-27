import { Paper, Typography, Stack } from "@mui/material";

import ProjectSkill from "./ProjectSkill.jsx";

export default function SkillsPartsPaper({ title, skills }) {

    /* Renders the skills tab paper */
    return (
        <Paper elevation={1} sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="paperSection" sx={{ }}>
                {title}
            </Typography>
            {skills && skills.length > 0 && (
                <Stack direction="row" sx={{ pt: 2, flexWrap: "wrap", gap: 1 }}>
                    {skills.map((skill, index) => (
                        <ProjectSkill key={index} label={skill} />
                    ))}
                </Stack>
            )}
        </Paper>
    )
}