import { useState, useEffect, useRef } from "react";

/* Hook for Mobile Navigation with Swipe Functionality (AI Generated) */
export const useMobileNavigation = (total, resetDependency = null) => {
    const [mobileIndex, setMobileIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);

    const safeIndex = Math.min(mobileIndex, Math.max(total - 1, 0));

    // Reset navigation when dependency changes
    useEffect(() => {
        setMobileIndex(0);
    }, [resetDependency]);

    // Navigation
    const handlePrev = () => {
        setMobileIndex((i) => Math.max(i - 1, 0));
    };

    const handleNext = () => {
        setMobileIndex((i) => Math.min(i + 1, Math.max(total - 1, 0)));
    };

    // Swipe animation
    const handleSwipe = (direction) => {
        if (slideDirection !== null) return;

        setSlideDirection(direction);

        setTimeout(() => {
            if (direction === "left") {
                handleNext();
            } else {
                handlePrev();
            }

            setSlideDirection(null);
        }, 180);
    };

    // Touch handling
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const diffX = e.changedTouches[0].clientX - touchStartX.current;
        const diffY = e.changedTouches[0].clientY - touchStartY.current;

        if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
            handleSwipe(diffX < 0 ? "left" : "right");
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    return {
        mobileIndex: safeIndex,
        safeIndex,
        slideDirection,
        handlePrev,
        handleNext,
        handleTouchStart,
        handleTouchEnd,
    };
};
