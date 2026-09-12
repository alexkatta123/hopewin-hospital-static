// Generic Service for Hope Win Hospital CMS (Static Edition)
// No backend calls, purely offline / static data

/**
 * Fetch all records for a specific resource (banners, doctors, specialities, packages, contacts, feedback)
 */
export const getItems = async (resource) => {
    const saved = localStorage.getItem(`hopewin_${resource}`);
    if (saved) {
        try {
            return { success: true, data: JSON.parse(saved), offline: true };
        } catch (e) {
            return { success: false, data: [], error: 'Storage corrupted' };
        }
    }
    if (resource === 'social_links') {
        const defaultSocial = [
            { id: 1, platform: 'Facebook', url: 'https://www.facebook.com', icon: 'facebook', is_active: 1, display_order: 1 },
            { id: 2, platform: 'Instagram', url: 'https://www.instagram.com', icon: 'instagram', is_active: 1, display_order: 2 },
            { id: 3, platform: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'linkedin', is_active: 1, display_order: 3 },
            { id: 4, platform: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube', is_active: 1, display_order: 4 },
            { id: 5, platform: 'Twitter', url: 'https://www.twitter.com', icon: 'twitter', is_active: 1, display_order: 5 },
            { id: 6, platform: 'Justdial', url: 'https://www.justdial.com/Guntur/Hope-Win-Hospitals-Beside-Life-Hospital-Street-Kotha-Peta/9999PX863-X863-191118125526-L2D7_BZDET', icon: 'justdial', is_active: 1, display_order: 6 }
        ];
        return { success: true, data: defaultSocial, offline: true };
    }
    return { success: true, data: [], offline: true };
};

/**
 * Create a new record in the database
 */
export const createItem = async (resource, payload) => {
    const existing = JSON.parse(localStorage.getItem(`hopewin_${resource}`) || '[]');
    const newItem = { ...payload, id: Date.now() };
    existing.unshift(newItem);
    localStorage.setItem(`hopewin_${resource}`, JSON.stringify(existing));
    return { success: true, data: newItem, offline: true };
};

/**
 * Update an existing record
 */
export const updateItem = async (resource, id, payload) => {
    let existing = JSON.parse(localStorage.getItem(`hopewin_${resource}`) || '[]');
    existing = existing.map(item => item.id === Number(id) ? { ...item, ...payload } : item);
    localStorage.setItem(`hopewin_${resource}`, JSON.stringify(existing));
    return { success: true, offline: true };
};

/**
 * Delete a record from the database
 */
export const deleteItem = async (resource, id) => {
    let existing = JSON.parse(localStorage.getItem(`hopewin_${resource}`) || '[]');
    existing = existing.filter(item => item.id !== Number(id) && item.id !== id);
    localStorage.setItem(`hopewin_${resource}`, JSON.stringify(existing));
    return { success: true, offline: true };
};

/**
 * Truncate database and restore complete factory seeds from Hope Win Hospitals
 */
export const reseedDatabase = async () => {
    return { success: false, error: "Not supported in static mode" };
};

/**
 * Fetch actual live visitor count from SQLite backend
 */
export const getVisitorCount = async () => {
    const saved = localStorage.getItem('hopewin_visitor_count');
    let count = saved ? parseInt(saved, 10) : 1;
    if (count >= 6000000 || isNaN(count)) count = 1; // Purge old hardcoded fake counts
    return { success: true, count, offline: true };
};

/**
 * Increment actual live visitor count in SQLite backend
 */
export const incrementVisitorCount = async () => {
    const saved = localStorage.getItem('hopewin_visitor_count');
    let prevCount = saved ? parseInt(saved, 10) : 0;
    if (prevCount >= 6000000 || isNaN(prevCount)) prevCount = 0; // Purge old hardcoded fake counts
    let nextCount = prevCount + 1;
    localStorage.setItem('hopewin_visitor_count', nextCount.toString());
    return { success: true, count: nextCount, offline: true };
};

