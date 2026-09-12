import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import { specialitiesData } from '../data/specialitiesData';
import { ArrowRight, Activity, Star } from 'lucide-react';
import { getAllFeedback } from '../services/feedbackService';
import { getItems } from '../services/cmsService';
import drNazeeruddin from '../media/doctors/dr-nazeeruddin.jpg';
import drShamaSultana from '../media/doctors/dr-shama-sultana.jpg';
import drBashiruddin from '../media/doctors/dr-bashiruddin.jpg';
import facility1 from '../media/gallery/IMAGE 1.png';
import facility2 from '../media/gallery/IMAGE 3.png';
import facility3 from '../media/gallery/IMAGE 5.png';
import './Home.css';

const Home = () => {
    const [recentReviews, setRecentReviews] = useState([]);
    const [initiatives, setInitiatives] = useState([]);
    const previewSpecialities = specialitiesData.slice(0, 3).map(cat => cat.category);

    useEffect(() => {
        const fetchHomeData = async () => {
            const result = await getAllFeedback();
            if (result.success && result.data.length > 0) {
                setRecentReviews(result.data.slice(0, 3));
            }
            const resInit = await getItems('initiatives');
            if (resInit.success && resInit.data) {
                setInitiatives(resInit.data);
            }
        };
        fetchHomeData();
    }, []);

    const getInitiativeUrl = (init, idx) => {
        if (init.link === '/yuvanari' || init.link === '/salaam-namaste') return init.link;
        if (init.link && init.link.startsWith('/initiatives/')) return init.link;
        return `/initiatives/${init.id || idx}`;
    };

    const displayReviews = recentReviews;

    return (
        <div className="home-page">
            <Hero />

            {/* About Section */}
            <About />

            {/* Specialities Preview */}
            <section className="section-preview bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Centers of Excellence</h2>
                        <p>Specialized care across varying disciplines</p>
                    </div>
                    <div className="grid-3">
                        {previewSpecialities.map((item, idx) => (
                            <div key={idx} className="feature-card">
                                <div className="icon-box">
                                    <Activity size={32} />
                                </div>
                                <h3>{item.split('(')[0]}</h3>
                                <p>World-class diagnostics and treatment for {item.toLowerCase()}.</p>
                                <Link to={`/specialities`} className="link-btn">
                                    Read More <ArrowRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-40">
                        <Link to="/specialities" className="btn btn-outline">View All Specialities</Link>
                    </div>
                </div>
            </section>

            {/* Doctors Preview */}
            <section className="section-preview">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Our Medical Experts</h2>
                        <p>Highly qualified doctors committed to your health</p>
                    </div>

                    <div className="grid-3 doctors-preview">
                        <div className="doc-card">
                            <img src={drNazeeruddin} alt="Dr. Nazeeruddin" />
                            <div className="doc-info">
                                <h3>Dr. Nazeeruddin</h3>
                                <p style={{ fontWeight: 'bold', color: '#333' }}>Founder & Vice Chairman</p>
                                <p>General & Laparoscopic Surgeon</p>
                            </div>
                        </div>
                        <div className="doc-card">
                            <img src={drShamaSultana} alt="Dr. Shama Sultana" />
                            <div className="doc-info">
                                <h3>Dr. Shama Sultana</h3>
                                <p style={{ fontWeight: 'bold', color: '#333' }}>Founder & Chairman</p>
                                <p>Obstetrician & Gynecologist</p>
                            </div>
                        </div>
                        <div className="doc-card">
                            <img src={drBashiruddin} alt="Dr. Basheeruddin" />
                            <div className="doc-info">
                                <h3>Dr. Basheeruddin</h3>
                                <p style={{ fontWeight: 'bold', color: '#333' }}>Director</p>
                                <p>Anesthetist & Critical Care Specialist</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-40">
                        <Link to="/doctors" className="btn btn-primary">Meet Our Doctors</Link>
                    </div>
                </div>
            </section>

            {/* Health Packages Banner */}
            <section className="cta-section" style={{ background: 'var(--secondary-blue)', color: 'white', padding: '60px 0' }}>
                <div className="container flex-row-center">
                    <div className="cta-text">
                        <h2>Holistic Health Packages</h2>
                        <p>Preventive care starts with regular checkups. Explore our complimentary health checkup packages.</p>
                    </div>
                    <Link to="/health-packages" className="btn btn-white" style={{ background: 'white', color: 'var(--secondary-blue)', padding: '15px 30px' }}>
                        View Packages
                    </Link>
                </div>
            </section>

            {/* Live Our Initiatives & Outreach Section */}
            {initiatives && initiatives.length > 0 && (
                <section id="initiatives-showcase" className="section-preview" style={{ background: '#f8fafc', padding: '90px 0' }}>
                    <div className="container">
                        <div className="section-header text-center" style={{ marginBottom: '55px' }}>
                            <span style={{ color: '#eb6725', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                                Community & Social Responsibility
                            </span>
                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a' }}>Our Welfare & Healthcare Initiatives</h2>
                            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Advancing women welfare, free diagnostics, and social empowerment across Guntur</p>
                            <div style={{ width: '70px', height: '4px', background: '#00a09a', margin: '14px auto 0', borderRadius: '10px' }}></div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${window.innerWidth < 768 ? '280px' : '330px'}, 1fr))`, gap: '32px' }}>
                            {initiatives.map((item, idx) => (
                                <div key={item.id || idx} style={{
                                    background: 'white',
                                    borderRadius: '22px',
                                    overflow: 'hidden',
                                    boxShadow: '0 12px 35px rgba(0,0,0,0.06)',
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,160,154,0.15)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.06)'; }}
                                >
                                    <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#e2e8f0' }}>
                                        <img 
                                            src={item.image_url || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600'} 
                                            alt={item.title} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                                        />
                                        <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(235, 103, 37, 0.95)', color: 'white', padding: '6px 16px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.5px' }}>
                                            {item.subtitle || 'Welfare Initiative'}
                                        </div>
                                    </div>
                                    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#1e293b', marginBottom: '12px', lineHeight: '1.3' }}>{item.title}</h3>
                                        <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                                            {item.description ? (item.description.length > 135 ? item.description.substring(0, 135) + '...' : item.description) : "Discover how Hope Win Hospitals is actively empowering communities through dedicated leadership and medical outreach."}
                                        </p>
                                        <div style={{ paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
                                            <Link to={getInitiativeUrl(item, idx)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00a09a', fontWeight: '800', textDecoration: 'none', fontSize: '0.98rem' }}>
                                                Explore Program <ArrowRight size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery Preview */}
            <section className="section-preview">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Our Facilities</h2>
                        <p>State-of-the-art infrastructure for superior care</p>
                    </div>
                    <div className="grid-3 gallery-grid">
                        <img src={facility1} alt="Advanced Ward Facilities" />
                        <img src={facility2} alt="Modern Operation Theatre" />
                        <img src={facility3} alt="Patient Care Units" />
                    </div>
                    <div className="text-center mt-40">
                        <Link to="/gallery" className="btn btn-outline">Visit Gallery</Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-preview bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Patient Voices</h2>
                        <p>What our patients say about their experience</p>
                    </div>
                    <div className="grid-3 testimonials-grid">
                        {displayReviews.map((review, idx) => (
                            <div key={review.id || idx} className="testimonial-card">
                                <div className="quote-icon">“</div>
                                <p className="feedback-text">
                                    {review.comment}
                                </p>
                                <div className="patient-info">
                                    <h4>{review.name}</h4>
                                    <span>
                                        {review.status
                                            ? review.status
                                            : (review.service && review.service.split(',')[0]) || 'Patient'}
                                    </span>
                                    {review.rating && (
                                        <div className="star-rating" style={{ display: 'flex', gap: '2px', marginTop: '5px' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    fill={i < review.rating ? "#ffd700" : "none"}
                                                    color={i < review.rating ? "#ffd700" : "#ccc"}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency CTA */}
            <section className="emergency-cta">
                <div className="container text-center">
                    <h2>Need Emergency Assistance?</h2>
                    <p>We are available 24/7 to handle any medical emergency.</p>
                    <div className="emergency-numbers">
                        <span className="phone">+91 97034 69700</span>
                        <span className="divider">|</span>
                        <span className="phone">07947194699</span>
                    </div>
                    <Link to="/contact" className="btn btn-emergency">Contact Us Now</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
