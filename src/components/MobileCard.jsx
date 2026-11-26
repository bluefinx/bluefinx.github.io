import { useState } from "react";
import { Divider, Card, Stack, Typography, Tabs, Tab, Box } from "@mui/material";

import ProjectTag from "./ProjectTag.jsx";
import MobileProjectHighlights from "./MobileProjectHighlights.jsx";
import ProjectPartsPaper from "./ProjectPartsPaper.jsx";
import EducationPartsPaper from "./EducationPartsPaper.jsx";
import SkillsPartsPaper from "./SkillsPartsPaper.jsx";

import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FlagOutlined from "@mui/icons-material/FlagOutlined";
import ChecklistOutlined from "@mui/icons-material/ChecklistOutlined";
import TrendingUpOutlined from "@mui/icons-material/TrendingUpOutlined";
import BuildOutlined from "@mui/icons-material/BuildOutlined";

/* Builds a generic mobile card layout */
export default function MobileCard({ title, type, date, tags, highlights, sublabel, parts, navigation, skillsTitle, skills, isEducation }) {

    /*************************** Navigation ***********************************/

    /* Stores the navigation state */
    const [selectedIndex, setSelectedIndex] = useState(0);

    /* Stores the selected tab (part)
    (different JSON object structures, education has keys, others have index) */
    const selectedKey = isEducation
        ? Object.keys(parts)[selectedIndex]
        : null;

    /* Stores the selected part */
    const selectedPart = isEducation
        ? parts[selectedKey]
        : parts[selectedIndex];

    /* Icons order for tabs */
    const partIcons = [InfoOutlined, FlagOutlined, ChecklistOutlined, TrendingUpOutlined];

    /* Checking for skills */
    const hasSkills = skills && skills.length > 0;

    /* Defines icon-only tabs */
    const tabs = [
        ...navigation.map((label, index) => ({
            label,
            Icon: partIcons[index] || InfoOutlined,
            isSkills: false,
        })),
        ...(hasSkills
            ? [{ label: skillsTitle, Icon: BuildOutlined, isSkills: true }]
            : []),
    ];

    const isSkillsTab = tabs[selectedIndex]?.isSkills;

    /* Renders the Mobile project cards */
    return (
        <Card elevation={0} sx={{
            display: "flex", flexDirection: "column", width: "100%", height: "100%", cursor: "pointer", backgroundColor: 'background.default',
            border: '1px solid', borderColor: "text.disabled", borderRadius: 2, overflow: "hidden", transition: "all 0.2s ease",
            "&:hover": {
                boxShadow: 3,
                transform: "translateY(-2px)",
                borderColor: "primary.main"
            }}}>
            <Stack direction="column" sx={{ flex: 1, height: "100%", p: 2 }}>

                {/* Title*/}
                <Typography variant="paperTitle" sx={{ pl: 1, whiteSpace: 'pre-line'}}>
                    {title}
                </Typography>

                {/* Info */}
                <Stack direction="column" spacing={0} sx={{ width: "100%", minWidth: 0, pl: 1, pr: 1 }}>
                    <Typography variant={isEducation ? "paperLabel2" : "paperLabel"} sx={{ flex: 1, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" }}>
                        {type}
                    </Typography>
                    <Typography variant={isEducation ? "paperLabel2" : "paperLabel"} sx={{ flexShrink: 0, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap", textAlign: "right" }}>
                        {date}
                    </Typography>
                </Stack>

                {/* Tags*/}
                {isEducation ? (
                    <Box sx={{ pb: 2, pt: 2 }} />
                ) : (
                    <Stack direction="row" sx={{ pb: 2, pt: 2, flexWrap: "wrap", gap: 1, minHeight: 54, alignContent: "flex-start" }}>
                        {tags && Object.entries(tags).map(([key, value]) => (
                            <ProjectTag key={key} label={value?.label} colour={value?.colour} textColour="text.default" />
                        ))}
                    </Stack>
                )}

                {/* Highlights */}
                <MobileProjectHighlights highlights={highlights} isEducation={isEducation} />

                <Divider sx={{ borderColor: "divider"}}/>

                {/* Content */}
                <Stack spacing={2} sx={{ height: "100%", pt: 2 }}>
                    <Tabs
                        value={selectedIndex}
                        onChange={(event, newIndex) => {
                            setSelectedIndex(newIndex);
                        }}
                        variant="fullWidth"
                        scrollButtons={false}
                        allowScrollButtonsMobile={false}
                        sx={{
                            width: "100%",
                            minWidth: 0,
                            maxWidth: "100%",
                            overflow: "hidden",

                            minHeight: 34,
                            bgcolor: "paper.background",
                            borderRadius: 2,

                            "& .MuiTabs-scroller": {
                                width: "100%",
                                minWidth: 0,
                            },

                            "& .MuiTabs-flexContainer": {
                                width: "100%",
                            },

                            "& .MuiTab-root": {
                                textTransform: "none",
                                flex: 1,
                                minWidth: 0,
                                maxWidth: "none",
                                fontSize: {xs: 11, sm: 13, md: 15},
                                color: "text.default",
                                fontWeight: 500,
                                minHeight: 34,
                                height: "auto",
                                py: 0,
                                px: 1,
                                whiteSpace: "normal",
                                lineHeight: 1.3,
                                paddingBottom: "6px",

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
                        {tabs.map(({label, Icon}, index) => (
                            <Tab
                                key={label}
                                value={index}
                                icon={<Icon fontSize="small" />}
                                aria-label={label}
                                title={label}
                            />
                        ))}
                    </Tabs>

                    {isSkillsTab ? (
                        <SkillsPartsPaper title={skillsTitle} skills={skills} />
                    ) : (
                        selectedPart &&
                        (isEducation ? (
                            <EducationPartsPaper
                                title={navigation[selectedIndex]}
                                type={selectedKey}
                                data={selectedPart}
                            />
                        ) : (
                            <ProjectPartsPaper
                                title={navigation[selectedIndex]}
                                content={selectedPart.content}
                                sublabel={sublabel}
                                takeaways={selectedPart.takeaways}
                            />
                        ))
                    )}
                </Stack>
            </Stack >
        </Card >
    );
}