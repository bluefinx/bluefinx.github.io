import { Card, CardContent, Box, Typography, Stack } from "@mui/material";

export default function AchievementCard({ categoryLabel, categoryIcon: CategoryIcon, categoryColour, achievement, isMobile}) {

    /* Builds the achievement card */
    return (
        <Card elevation={0} sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", cursor: "pointer", backgroundColor: 'background.default',
            border: '1px solid', borderColor: categoryColour, borderRadius: 2, overflow: "hidden", transition: "all 0.2s ease",
            "&:hover": {
                boxShadow: 3,
                transform: "translateY(-2px)",
                borderColor: "primary.main"
            }}}>

            {/* Header */}
            <Box sx={{backgroundColor: categoryColour, px: 2, py: 0.75 }}>
                <Typography variant="achievementTag">
                    {categoryLabel}
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
            <Box sx={{ backgroundColor: categoryColour, px: 2, py: 0.75 }}>
                <Stack direction="row" sx={{ width: "100%", alignItems: "center"}}>
                    {CategoryIcon && (
                        <CategoryIcon sx={{ color: "background.default", fontSize: { xs: 14, sm: 18, md: 20 }, display: "block" }} />
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