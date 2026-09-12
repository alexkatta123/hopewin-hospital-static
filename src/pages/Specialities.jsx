import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { specialitiesData } from '../data/specialitiesData';
import { X, CalendarCheck, Info, ChevronRight } from 'lucide-react';
import { getItems } from '../services/cmsService';
import './Specialities.css';

// Import all service images dynamically
const serviceImagesModules = import.meta.glob('../media/services/*.{png,jpg,jpeg,jfif,webp}', { eager: true });

// Helper to normalized name
const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

const imageMaps = {};
Object.keys(serviceImagesModules).forEach(path => {
    const fileName = path.split('/').pop().split('.')[0];
    const cleanKey = normalize(fileName);
    imageMaps[cleanKey] = serviceImagesModules[path].default;
});

const getImageForService = (serviceName) => {
    const cleanName = normalize(serviceName);
    if (imageMaps[cleanName]) return imageMaps[cleanName];
    const foundKey = Object.keys(imageMaps).find(key => key.includes(cleanName) || cleanName.includes(key));
    if (foundKey) return imageMaps[foundKey];
    return null;
};

const Specialities = () => {
    const location = useLocation();
    const [selectedService, setSelectedService] = useState(null);
    const [categories, setCategories] = useState(specialitiesData);

    useEffect(() => {
        const fetchLiveSpecialities = async () => {
            const res = await getItems('specialities');
            if (res.success && res.data && res.data.length > 0) {
                const groupedMap = {};
                res.data.forEach(item => {
                    if (!groupedMap[item.category]) {
                        groupedMap[item.category] = [];
                    }
                    groupedMap[item.category].push({
                        name: item.name,
                        description: item.description,
                        image_url: item.image_url
                    });
                });
                const dynamicList = Object.keys(groupedMap).map(cat => ({
                    category: cat,
                    items: groupedMap[cat]
                }));
                setCategories(dynamicList);
            }
        };
        fetchLiveSpecialities();
    }, []);
    
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const handleBookNow = (e) => {
        e.stopPropagation();
        window.open('https://www.justdial.com/online-consult/hospital?docid=9999PX863.X863.191118125526.L2D7', '_blank');
    };

    const handleViewDetails = (item, imgSrc) => {
        const name = typeof item === 'string' ? item : item.name;
        const description = typeof item === 'string' ? null : item.description;
        setSelectedService({ name, image: imgSrc, description });
    };

    const closeModal = () => setSelectedService(null);

    // Close modal on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div className="specialities-page">
            <div className="page-header" style={{ backgroundImage: 'linear-gradient(rgba(0,95,115,0.9), rgba(0,95,115,0.8)), url(https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1.2rem', fontWeight: '800', opacity: 1, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <Link to="/" style={{ color: '#00f0ff', textDecoration: 'none' }}>Home</Link>
                        <ChevronRight size={22} />
                        <span>Our Specialities</span>
                    </div>
                    <h1 style={{ color: 'white' }}>Our Specialities</h1>
                    <p style={{ color: 'white' }}>World-class healthcare services and treatments available.</p>
                </div>
            </div>

            <div className="container">
                {categories.map((cat, index) => (
                    <div key={index} className="speciality-section mb-12">
                        <div className="category-header mb-8">
                            <h2 className="text-2xl font-bold text-secondary" style={{ borderBottom: '3px solid var(--primary-teal)', display: 'inline-block', paddingBottom: '5px' }}>{cat.category}</h2>
                        </div>

                        <div className="specialities-grid">
                            {cat.items.map((item, i) => {
                                const itemName = typeof item === 'string' ? item : item.name;
                                const itemImg = (typeof item === 'object' && item.image_url) ? item.image_url : null;
                                const imgSrc = itemImg || getImageForService(itemName);
                                const id = itemName.replace(/\s+/g, '-').toLowerCase();

                                return (
                                    <div key={i} id={id} className="dept-card service-card-img">
                                        <div className="service-img-container">
                                            {imgSrc ? (
                                                <img src={imgSrc} alt={itemName} loading="lazy" />
                                            ) : (
                                                <div className="placeholder-service"><span>H+</span></div>
                                            )}
                                        </div>
                                        <div className="service-content">
                                            <h3>{itemName}</h3>
                                            <div className="card-actions">
                                                <button className="btn-action btn-details" onClick={() => handleViewDetails(item, imgSrc)}>
                                                    <Info size={16} /> View Details
                                                </button>
                                                <button className="btn-action btn-book" onClick={handleBookNow}>
                                                    <CalendarCheck size={16} /> Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}><X size={24} /></button>

                        <div className="modal-header-img">
                            {selectedService.image ? (
                                <img src={selectedService.image} alt={selectedService.name} />
                            ) : (
                                <div className="modal-placeholder">H+</div>
                            )}
                        </div>

                        <div className="modal-body">
                            <h2>{selectedService.name}</h2>
                            <p className="modal-desc">
                                Hope Win Hospitals offers advanced diagnosis, care, and treatment for <strong>{selectedService.name}</strong>.
                                Our team of expert specialists ensures personalized attention and the best medical outcomes using state-of-the-art technology.
                            </p>

                            {selectedService.description && (
                                <div className="modal-service-description" style={{ backgroundColor: '#f0fdfa', borderLeft: '4px solid #00a09a', padding: '14px 18px', borderRadius: '6px', margin: '16px 0', color: '#0f172a', fontSize: '1.02rem', lineHeight: '1.6', fontWeight: '500', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <div style={{ fontWeight: '700', color: '#008b85', marginBottom: '6px', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Procedure Description:</div>
                                    {selectedService.description}
                                </div>
                            )}

                            <div className="modal-highlights">
                                <h4>Why Choose Us?</h4>
                                <ul>
                                    <li>Expert Multi-disciplinary Team</li>
                                    <li>Advanced Diagnostic Facilities</li>
                                    <li>24/7 Emergency Support</li>
                                    <li>Patient-Centric Approach</li>
                                </ul>
                            </div>

                            <div className="modal-footer-actions">
                                <button className="btn" onClick={handleBookNow}>Book Appointment Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Specialities;
