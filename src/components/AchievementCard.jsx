import { Card, Stack } from "@mui/material";

export default function AchievementCard() {
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

            </Stack>
        </Card>
    )
}