import { Home, RocketLaunch, Work, School, Recommend, EmojiEvents } from "@mui/icons-material";
import { Science, Verified } from "@mui/icons-material";

/* Main title of page */
export const header = "Blue Finjan Butscher"
export const subheader = "Cybersecurity & IT Graduate"
/* Footer middle text */
export const footer = "2026 – Blue Finjan Butscher"

export const linkedInLink = "https://linkedin.com/in/blue-butscher"
export const gitHubLink = "https://github.com/bluefinx"
export const email1 = "blue.butscher"
export const email2 = "proton.me"

export const parserLink = "https://github.com/bluefinx/foremost-parser"

/* URL for licences file */
export const licencesLink = "/licences.txt"

/* URL for privacy statement file */
export const privacyLink = "/privacy.html"
/* URL for GitHub privacy statement */
export const githubPrivacyLink = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"

/* Colours for areas */
export const AREAS = {
    "ALL": {
        "colour": "primary.main"
    },
    "DF": {
        "colour": "area1.main"
    },
    "CP": {
        "colour": "area2.main"
    },
    "PT": {
        "colour": "area3.main"
    },
    "SD": {
        "colour": "area4.main"
    },
    "VM": {
        "colour": "area5.main"
    },
    "SA": {
        "colour": "area6.main"
    },
    "CG": {
        "colour": "area7.main"
    },
    "GI": {
        "colour": "area8.main"
    },
    "CR": {
        "colour": "secondary.main"
    }
}

/* Colours & icons for achievement categories */
export const CATEGORIES = {
    RE: {
        colour: "category1.main",
        icon: Science,
    },
    AW: {
        colour: "category2.main",
        icon: EmojiEvents,
    },
    CE: {
        colour: "category3.main",
        icon: Verified,
    },
};

/* Icons for navigation items */
export const NAVIGATION = {
    "home": {
        "icon": <Home/>,
        "link": false
    },
    "projects": {
        "icon": <RocketLaunch/>,
        "link": true
    },
    "experience": {
        "icon": <Work/>,
        "link": true
    },
    "education": {
        "icon": <School/>,
        "link": true
    },
    "achievements": {
        "icon": <EmojiEvents/>,
        "link": true
    },
    "references": {
        "icon": <Recommend/>,
        "link": true
    }
}