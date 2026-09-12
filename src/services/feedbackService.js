// Feedback Service - Static Edition
// This service purely uses LocalStorage

const FALLBACK_KEY = 'feedback_fallback';

// Helper to save to local fallback
const saveToLocalFallback = (feedbackData) => {
    try {
        const existing = JSON.parse(localStorage.getItem(FALLBACK_KEY) || '[]');
        const newEntry = {
            ...feedbackData,
            id: 'local_' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now(),
            isLocal: true // Flag to identify local-only data
        };
        existing.unshift(newEntry);
        localStorage.setItem(FALLBACK_KEY, JSON.stringify(existing));
        return { success: true, id: newEntry.id, storedLocally: true };
    } catch (e) {
        console.error("Critical: LocalStorage failed too", e);
        return { success: false, error: "Total storage failure" };
    }
};

// Add new feedback
export const addFeedback = async (feedbackData) => {
    return saveToLocalFallback(feedbackData);
};

// Get all feedback (Local Fallback only)
export const getAllFeedback = async () => {
    let localData = [];

    try {
        localData = JSON.parse(localStorage.getItem(FALLBACK_KEY) || '[]');
    } catch (e) {
        localData = [];
    }

    // Sort by timestamp
    const combined = [...localData].sort((a, b) => b.timestamp - a.timestamp);

    return {
        success: true,
        data: combined,
        hasLocalData: localData.length > 0
    };
};

// Delete feedback
export const deleteFeedback = async (feedbackId) => {
    try {
        const existing = JSON.parse(localStorage.getItem(FALLBACK_KEY) || '[]');
        const filtered = existing.filter(f => f.id !== feedbackId);
        localStorage.setItem(FALLBACK_KEY, JSON.stringify(filtered));
        return { success: true };
    } catch (e) {
        return { success: false };
    }
};

// Optional: Function to sync local data to cloud/backend when back online
// Disabled in static edition
export const syncLocalData = async () => {
    return {
        success: true,
        syncedCount: 0,
        remainingCount: 0
    };
};
