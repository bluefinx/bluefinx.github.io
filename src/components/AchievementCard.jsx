import { Card, CardContent, Box, Typography, Stack, Icon, Divider } from "@mui/material";

import ScienceIcon from '@mui/icons-material/Science';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function AchievementCard({ category, achievement, isMobile}) {

    /*************************** Icon Mapping ***********************************/

    /* Maps the icons from the JSON object to the imported icons */
    const iconMap = {
        Science: ScienceIcon,
        EmojiEvents: EmojiEventsIcon,
        Verified: VerifiedIcon
    };

    /* Builds the achievement card */
    return (
        <Card elevation={0} sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", cursor: "pointer", backgroundColor: 'background.default',
            border: '1px solid', borderColor: category?.colour, borderRadius: 2, overflow: "hidden", transition: "all 0.2s ease",
            "&:hover": {
                boxShadow: 3,
                transform: "translateY(-2px)",
                borderColor: "primary.main"
            }}}>

            {/* Header */}
            <Box sx={{backgroundColor: category?.colour, px: 2, py: 0.75 }}>
                <Typography variant="achievementTag">
                    {category?.label}
                </Typography>
            </Box>

            {/* Body */}
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Stack sx={{ minHeight: 90 }}>
                    <Typography variant="achievementTitle">
                        {achievement?.title}
                    </Typography>

                    <Typography variant="paperLabel">
                        {achievement?.institution}
                    </Typography>
                </Stack>

                <Typography variant="paperBody" sx={{ pt: 2 }}>
                    {achievement?.description}
                </Typography>
            </CardContent>

            {/* Footer */}
            <Box sx={{ backgroundColor: category?.colour, px: 2, py: 0.75 }}>
                <Stack direction="row" alignItems="center" sx={{ width: "100%"}}>
                    {category?.icon && (
                        <Icon
                            component={iconMap[category.icon]}
                            sx={{ color: "background.default",
                                fontSize: 14,
                                '@media (min-width:600px)': {
                                    fontSize: 18,
                                },
                                '@media (min-width:900px)': {
                                    fontSize: 20,
                                },
                                display: "block" }}/>
                    )}
                    <Typography variant="achievementFooter" sx={{ pl: 1 }}>
                        {achievement?.status}
                    </Typography>

                    <Typography variant="achievementFooter" sx={{ ml: "auto"}}>{achievement?.date}</Typography>
                </Stack>
            </Box>
        </Card>
    )
}