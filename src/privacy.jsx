import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './i18n';
import PrivacyStatement from './PrivacyStatement.jsx'

/* Establishes the DOM root */
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PrivacyStatement />
    </StrictMode>
)