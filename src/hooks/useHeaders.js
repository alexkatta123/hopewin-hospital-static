import { useState, useEffect } from 'react';

const useHeaders = () => {
    // Mock data compliant with the Home.jsx expectations
    const [headers, setHeaders] = useState({
        home: {
            title: "COMPASSIONATE CARE FOR EVERY LIFE",
            subtitle: "Experience world-class healthcare with a personal touch.",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1500"
        }
    });

    // You can replace this with actual API fetch if available
    /*
    useEffect(() => {
        const fetchHeaders = async () => {
            try {
                // const response = await fetch(`${API_BASE}/api/headers/`);
                // const data = await response.json();
                // setHeaders(data);
            } catch (error) {
                console.error("Failed to fetch headers", error);
            }
        };
        fetchHeaders();
    }, []);
    */

    return { headers };
};

export default useHeaders;
