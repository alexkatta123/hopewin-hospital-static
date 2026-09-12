import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Phone, Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import GalleryStrip from '../components/GalleryStrip';

const SpecialityDetail = () => {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all services to find the specific one by slug
                const sResponse = await fetch(`${API_BASE}/api/services/`);
                const sData = await sResponse.json();

                let foundService = null;
                let foundCategory = '';
                sData.categories.forEach(cat => {
                    const match = cat.services.find(s => s.slug === slug);
                    if (match) {
                        foundService = match;
                        foundCategory = cat.category;
                    }
                });

                if (foundService) {
                    setService({ ...foundService, categoryName: foundCategory });
                }

                // Fetch gallery images
                const gResponse = await fetch(`${API_BASE}/api/gallery/`);
                const gData = await gResponse.json();

                // Filter images that might be relevant (matching category or title)
                const relevant = gData.images.filter(img =>
                    img.category.toLowerCase() === foundCategory.toLowerCase() ||
                    img.title.toLowerCase().includes(slug.replace(/-/g, ' '))
                );
                setGalleryImages(relevant);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 className="animate-spin" size={48} color="#00a09a" />
        </div>
    );

    if (!service) return (
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
            <h2>Service Not Found</h2>
            <Link to="/specialities" className="btn" style={{ marginTop: '20px' }}>Back to Specialities</Link>
        </div>
    );

    return (
        <div className="speciality-detail-page">
            <section style={{ background: '#f4f9fd', padding: '60px 0' }}>
                <div className="container">
                    <Link to="/specialities" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00a09a', textDecoration: 'none', marginBottom: '20px', fontWeight: '600' }}>
                        <ArrowLeft size={20} /> Back
                    </Link>
                    <span style={{ color: '#00a09a', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', display: 'block', marginBottom: '10px' }}>{service.categoryName}</span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: '#1a1f36', fontWeight: '900', marginBottom: '15px' }}>{service.name}</h1>
                    <div style={{ width: '60px', height: '4px', background: '#00a09a' }}></div>
                </div>
            </section>

            <section style={{ padding: '60px 0', background: 'white' }}>
                <div className="container">
                    <div className="detail-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '2fr 1fr',
                        gap: window.innerWidth < 768 ? '40px' : '60px'
                    }}>
                        <div>
                            <div style={{ marginBottom: '40px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                                {service.image ? (
                                    <img src={`${API_BASE}${service.image}`} alt={service.name} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ height: '300px', background: 'linear-gradient(45deg, #00a09a, #eb6725)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <h2 style={{ fontSize: '3rem' }}>{service.name}</h2>
                                    </div>
                                )}
                            </div>

                            <h2 style={{ fontSize: '2rem', marginBottom: '25px', color: '#333' }}>Modern {service.name} Care</h2>
                            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.8, marginBottom: '30px' }}>
                                {service.description || `At Hope Win Hospitals, our ${service.name} department is dedicated to providing comprehensive diagnostic and treatment services. Our team of highly skilled specialists uses the latest medical technology to ensure the best possible outcomes for our patients.`}
                            </p>

                            <h3 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>What We Offer</h3>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                marginBottom: '40px',
                                display: 'grid',
                                gridTemplateColumns: window.innerWidth < 600 ? '1fr' : '1fr 1fr',
                                gap: '15px'
                            }}>
                                {[
                                    '24/7 Emergency Support',
                                    'Advanced Diagnostics',
                                    'Multi-Specialty Coordination',
                                    'Patient-Centric Care',
                                    'Intensive Care Support',
                                    'Post-Op Recovery Rooms'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                                        <CheckCircle2 size={20} style={{ color: '#00a09a' }} /> {item}
                                    </li>
                                ))}
                            </ul>

                            {galleryImages.length > 0 && (
                                <div style={{ marginTop: '60px' }}>
                                    <h3 style={{ marginBottom: '25px' }}>Related Facilities & Equipment</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                                        {galleryImages.slice(0, 4).map((img, i) => (
                                            <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', height: '150px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                                                <img src={`${API_BASE}${img.image}`} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                    <Link to="/gallery" style={{ display: 'inline-block', marginTop: '20px', color: '#00a09a', fontWeight: '600', textDecoration: 'none' }}>
                                        View All Gallery Photos →
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="detail-sidebar">
                            <div className="card booking-sidebar-card" style={{ padding: '30px', position: window.innerWidth < 1024 ? 'static' : 'sticky', top: '120px', borderRadius: '24px', background: '#f8fafc', border: '1px solid #e2f3f1' }}>
                                <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Book Consultation</h3>
                                <form>
                                    <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '15px' }} />
                                    <input type="tel" placeholder="Phone Number" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '15px' }} />
                                    <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px' }}>
                                        <option>{service.name}</option>
                                    </select>
                                    <button className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        <Calendar size={18} /> Schedule Now
                                    </button>
                                </form>
                                <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
                                    <div style={{ color: '#00a09a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <Phone size={20} /> <strong>+91 9703469700</strong>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '10px' }}>Call us for 24/7 emergency assistance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <GalleryStrip />
        </div>

    );
};

export default SpecialityDetail;

