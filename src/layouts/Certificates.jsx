import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

import ExtendableCard from "../components/ExtendableCard.jsx";
import CardBodyProjects from "../components/CardBodyProjects.jsx";

/* Builds the Certificates tab layout */
export default function Certificates() {

    /*************************** Localisation ***********************************/

    /* Allows access to i18next JSON objects */
    const { t } = useTranslation();

    /* Reads JSON tags object */
    const tagDefinitions = t("tags", { returnObjects: true });

    /* Reads JSON specific label object */
    const specificLabels = t("certificates.keys.specific-labels", { returnObjects: true });

    /* Reads JSON experience object */
    const certificates = t("certificates", { returnObjects: true });

    /*************************** Tag Mapping ******************************/

    /* Defines tags for certificates (e.g. "Digital Forensics") */
    const certificateTags = {
        "certificate-1": ["IT"]
    };

    /* Creates filtered tag list: {TAG: {label: label, colour: colour}, ...} */
    function mapTags(certificateKey) {
        return Object.fromEntries(
            certificateTags[certificateKey]
                .filter((tagKey) => tagDefinitions[tagKey])
                .map((tagKey) => [tagKey, tagDefinitions[tagKey]])
        );
    }

    /*************************** Specific Mapping ******************************/

    /* Defines tags for certificates (e.g. "Digital Forensics Skills" ) */
    const certificateSpecificLabels = {
        "certificate-1": ["IT"]
    };

    /* Creates formatted specific list: [{label: label, values: [string]}, ...]*/
    function mapSpecificEntries(key, specificEntries) {
        if (specificEntries.length > 0 && !Array.isArray(specificEntries[0])) {
            specificEntries = [specificEntries];
        }
        return certificateSpecificLabels[key].map((label, index) => ({
            label: specificLabels[label] || label,
            values: specificEntries[index] || [],
        }));
    }

    /*************************** Layout Building ***********************************/

    /* Builds the remark section */
    function createRemark(awarder, institution, date, location) {
        return (
            <Stack direction="column" spacing={1} sx={{ px: 2, mt: -1, mb: 2 }}>
                <Paper sx={{ p: 1 }}>
                    <Typography variant="body1" sx={{ fontSize: {
                            xs: 14,
                            sm: 15,
                            md: 16,
                        }, fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                        <span style={{ fontStyle: 'normal' }}>🏛️ </span>{` ${awarder}\n`}
                        <span style={{ fontStyle: 'normal' }}>🏫 </span>{`via ${institution}\n`}
                        <span style={{ fontStyle: 'normal' }}>📅 </span>{` ${date}\n`}
                        <span style={{ fontStyle: 'normal' }}>🌍 </span>{` ${location}`}
                    </Typography>
                </Paper>
            </Stack>
        );
    }

    /*************************** Expandable Functionality ******************************/

    /* Stores expanded states of cards */
    const [openCertificate, setOpenCertificates] = useState({});

    /* Toggles expanded states of cards */
    const toggle = (key) => {
        setOpenCertificates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    /* Creates grid with extendable cards, passes title, tags, header, body, expanded state and click listener */
    return (
        <Box sx={{ columnCount: { xs: 1, sm: 1, md: 2 }, columnGap: 1.5 }}>
            {Object.entries(certificates?.values).map(([key, certificate]) => (
                <Box key={key} sx={{ breakInside: "avoid", mb: 1.5, }}>
                    <ExtendableCard
                        title={certificate?.title}
                        tags={mapTags(key)}
                        remarks={createRemark(certificate?.awarder, certificate?.institution, certificate?.date, certificate?.location)}
                        header={
                            <Paper sx={{ p: 2, m: 2 }}>
                                <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                                    {certificate?.summary}
                                </Typography>
                            </Paper>
                        }
                        body={
                            <CardBodyProjects
                                general={certificate?.general}
                                specific={mapSpecificEntries(key, certificate?.specific)}
                            />
                        }
                        expanded={openCertificate[key]}
                        onClick={() => toggle(key)} />
                </Box>
            ))}
        </Box>
    );
}