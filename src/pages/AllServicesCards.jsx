import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import GalleryStrip from '../components/GalleryStrip';
import useHeaders from '../hooks/useHeaders';

const AllServicesCards = () => {
    const { headers } = useHeaders();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const serviceHeader = headers['all-services'] || {
        title: "All Healthcare Services",
        subtitle: "Comprehensive care solutions across all departments",
        image: ""
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/services/`);
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="services-cards-page">
            <section style={{
                background: serviceHeader.image
                    ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${serviceHeader.image.startsWith('http') ? serviceHeader.image : API_BASE + serviceHeader.image}")`
                    : '#f4f9fd',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '80px 0',
                color: serviceHeader.image ? 'white' : 'inherit'
            }}>
                <div className="container">
                    <Link to="/specialities" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00a09a', textDecoration: 'none', marginBottom: '20px', fontWeight: '600' }}>
                        <ArrowLeft size={20} /> Back
                    </Link>
                    <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', color: 'inherit', fontWeight: '900' }}>{serviceHeader.title}</h1>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: 'inherit', opacity: 0.8 }}>{serviceHeader.subtitle}</p>
                </div>
            </section>

            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    {categories.map((cat, idx) => (
                        <div key={idx} style={{ marginBottom: '80px' }}>
                            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: '#333', marginBottom: '40px', paddingLeft: '15px', borderLeft: '5px solid #00a09a' }}>
                                {cat.category}
                            </h2>
                            <div className="grid-3" style={{ gap: '30px' }}>
                                {cat.services.map((service, sIdx) => (
                                    <div key={sIdx} className="card service-card-detailed">
                                        <div style={{ height: '220px', background: '#eee', overflow: 'hidden' }}>
                                            {service.image ? (
                                                <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #00a09a22, #eb672522)', color: '#00a09a' }}>
                                                    <span style={{ fontWeight: 600 }}>Hope Win Hospitals</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="card-content" style={{ padding: '25px' }}>
                                            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a1f36' }}>{service.name}</h3>
                                            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '25px', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '4.5em' }}>
                                                {service.description || "Expert medical care and specialized treatment procedures at Hope Win Hospitals."}
                                            </p>
                                            <Link
                                                to={`/specialities/${service.slug}`}
                                                className="btn"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
                                            >
                                                Learn More <ExternalLink size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <GalleryStrip />
        </div>

    );
};

export default AllServicesCards;
