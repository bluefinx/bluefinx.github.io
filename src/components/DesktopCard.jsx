import { useState } from "react";
import { Divider, Card, Stack, Typography, Tabs, Tab } from "@mui/material";

import ProjectTag from "./ProjectTag.jsx";
import ProjectHighlights from "./ProjectHighlights.jsx";
import ProjectPartsPaper from "./ProjectPartsPaper.jsx";
import ProjectSkill from "./ProjectSkill.jsx";

/* Builds a generic desktop card layout */
export default function DesktopCard({ title, type, date, tags, highlights, isMobile, parts, navigation, skillsTitle, skills }) {

    /*************************** Navigation ***********************************/

    /* Stores the navigation state */
    const [selectedIndex, setSelectedIndex] = useState(0);

    /* Stores the selected part string */
    const selectedPart = parts[selectedIndex];

    return (
        <Card elevation={0} sx={{
            display: "flex", flexDirection: "column", width: "100%", height: "100%", cursor: "pointer", backgroundColor: 'background.default',
            border: '1px solid', borderColor: "text.disabled",borderRadius: 2, overflow: "hidden", transition: "all 0.2s ease",
            "&:hover": {
                boxShadow: 3,
                transform: "translateY(-2px)",
                borderColor: "primary.main"
            }}}>
            <Stack direction="column" sx={{ flex: 1, height: "100%", p: 2 }}>

                {/* Title*/}
                <Typography variant="paperTitle" sx={{ pl: 1}}>
                    {title}
                </Typography>

                {/* Info */}
                <Stack direction="row" spacing={2} sx={{ width: "100%", minWidth: 0, pl: 1, pr: 1 }}>
                    <Typography variant="paperLabel" sx={{ flex: 1, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" }}>
                        {type}
                    </Typography>
                    <Typography variant="paperLabel" sx={{ flexShrink: 0, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap", textAlign: "right" }}>
                        {date}
                    </Typography>
                </Stack>

                {/* Tags*/}
                <Stack direction="row" sx={{ pb: 2, pt: 2, flexWrap: "wrap", gap: 1, minHeight: 54, alignContent: "flex-start" }}>
                    {tags && Object.entries(tags).map(([key, value]) => (
                        <ProjectTag key={key} label={value?.label} colour={value?.colour} textColour="text.default" />
                    ))}
                </Stack>

                {/* ProjectHighlights */}
                <ProjectHighlights highlights={highlights} isMobile={isMobile} />

                <Divider sx={{ borderColor: "divider"}}/>

                {/* Content */}
                <Stack spacing={2} sx={{ height: "100%", pt: 2 }}>
                    <Tabs
                        value={selectedIndex}
                        onChange={(event, newIndex) => {
                            setSelectedIndex(newIndex);
                        }}
                        variant="fullWidth"
                        sx={{
                            minHeight: 34,
                            bgcolor: "paper.background",
                            borderRadius: 2,

                            "& .MuiTab-root": {
                                textTransform: "none",
                                flex: 1,
                                fontSize: 11,
                                '@media (min-width:600px)': {
                                    fontSize: 13,
                                },
                                '@media (min-width:900px)': {
                                    fontSize: 15,
                                },
                                color: "text.default",
                                fontWeight: 500,
                                minHeight: 34,
                                height: 34,
                                py: 0,
                                px: 1,

                                transition: "color 0.25s ease",

                                "&:hover": {
                                    backgroundColor: "transparent",
                                    color: "secondary.main"
                                },
                            },
                            "& .MuiTab-root.Mui-selected": {
                                color: "secondary.main",
                            },
                            "& .MuiTabs-indicator": {
                                height: 3,
                                borderRadius: 2,
                                backgroundColor: "secondary.main",
                            },
                        }}>
                        {navigation.map((item, index) => (
                            <Tab key={index} value={index} label={item}/>
                        ))}
                    </Tabs>

                    {selectedPart && (
                        <ProjectPartsPaper
                            title={navigation[selectedIndex]}
                            content={selectedPart.content}
                            sublabel={selectedPart.sublabel}
                            takeaways={selectedPart.takeaways}
                        />
                    )}
                </Stack>

                {/* Skills */}
                <Stack sx={{ pt: 2, pl: 1, mt: "auto"}}>
                    <Typography variant="paperSection" sx={{ }}>
                        {skillsTitle}
                    </Typography>
                    {skills && skills.length > 0 && (
                        <Stack direction="row" sx={{ pt: 2, flexWrap: "wrap", gap: 1 }}>
                            {skills.map((skill) => (
                                <ProjectSkill key={skill} label={skill} />
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Stack >
        </Card >
    );
}