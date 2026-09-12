import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { ShieldCheck, Facebook, Globe, Users, Heart, Award, ArrowRight, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { getItems } from '../services/cmsService';

const InitiativeDetail = ({ fallbackLink = null }) => {
    const location = useLocation();
    const { slug } = useParams();
    const [initiative, setInitiative] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndMatchInitiative = async () => {
            setLoading(true);
            try {
                const res = await getItems('initiatives');
                if (res && res.data) {
                    const currentPath = fallbackLink || location.pathname;
                    // Try exact link match first
                    let match = res.data.find(item => item.link === currentPath || item.link === `/${currentPath.replace(/^\//, '')}`);
                    
                    // Try slug match if using /initiatives/:slug route
                    if (!match && slug) {
                        match = res.data.find(item => 
                            String(item.id) === slug || 
                            (item.title && item.title.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()) ||
                            (item.link && item.link.toLowerCase().includes(slug.toLowerCase()))
                        );
                    }
                    
                    // Fallback to first initiative if nothing matched at all
                    if (!match && res.data.length > 0) {
                        if (currentPath.includes('salaam')) {
                            match = res.data.find(item => item.title && item.title.toLowerCase().includes('salaam')) || res.data[1] || res.data[0];
                        } else if (currentPath.includes('yuva')) {
                            match = res.data.find(item => item.title && item.title.toLowerCase().includes('yuva')) || res.data[0];
                        } else {
                            match = res.data[0];
                        }
                    }
                    setInitiative(match);
                }
            } catch (error) {
                console.error("Failed to load initiative details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndMatchInitiative();
    }, [location.pathname, slug, fallbackLink]);

    if (loading) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ fontSize: '1.3rem', color: '#00a09a', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span>Loading community initiative details...</span>
                </div>
            </div>
        );
    }

    if (!initiative) {
        return (
            <div style={{ minHeight: '60vh', padding: '100px 20px', textAlign: 'center', background: '#f8fafc' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '16px' }}>Initiative Not Found</h2>
                <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '1.1rem' }}>We couldn't find the requested hospital welfare initiative.</p>
                <Link to="/" className="btn btn-primary" style={{ background: '#00a09a', color: 'white', padding: '12px 30px', borderRadius: '30px', textDecoration: 'none', fontWeight: 700 }}>
                    Return Home
                </Link>
            </div>
        );
    }

    const isFacebook = initiative.social_link && initiative.social_link.toLowerCase().includes('facebook');
    const bgUrl = initiative.image_url || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1500';
    const sectionImgUrl = initiative.section_image_url || initiative.image_url || 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800';

    // Parse checklist features
    const features = initiative.features_list ? 
        initiative.features_list.split('\n').map(s => s.trim()).filter(Boolean) : 
        [
            "Dedicated healthcare screenings & consultation protocols",
            "Promoting community wellness, nutrition, and early detection",
            "Specialized clinical care programs by Hope Win leadership",
            "Empowering citizens through medical awareness and outreach"
        ];

    // Parse detailed paragraphs
    const paragraphs = initiative.detailed_content ? 
        initiative.detailed_content.split('\n\n').map(s => s.trim()).filter(Boolean) : 
        [initiative.description || "Hope Win Hospitals is committed to advancing community health, social empowerment, and accessible medical excellence across Guntur and beyond."];

    return (
        <div className="initiative-page" style={{ background: '#fff' }}>
            {/* Hero Section */}
            <section style={{
                background: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url("${bgUrl}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '130px 0 110px',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                boxShadow: 'inset 0 -10px 25px rgba(0,0,0,0.1)'
            }}>
                <div className="container">
                    <div className="badge" style={{ background: '#eb6725', color: 'white', padding: '8px 24px', borderRadius: '50px', display: 'inline-block', fontWeight: '800', marginBottom: '22px', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', boxShadow: '0 8px 20px rgba(235,103,37,0.4)' }}>
                        {initiative.subtitle || "HOPE WIN SOCIAL WELFARE INITIATIVE"}
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.8rem, 8vw, 4.8rem)', fontWeight: '900', marginBottom: '24px', lineHeight: 1.1, color: '#ffffff' }}>
                        {initiative.title}
                    </h1>
                    <p style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', opacity: 0.95, maxWidth: '820px', margin: '0 auto 42px', fontWeight: '400', lineHeight: '1.7', color: '#f8fafc' }}>
                        {initiative.description}
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {initiative.social_link && (
                            <a href={initiative.social_link} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '15px 36px', borderRadius: '50px', background: '#00a09a', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', textDecoration: 'none', boxShadow: '0 10px 25px rgba(0,160,154,0.35)', transition: 'all 0.3s' }}>
                                {isFacebook ? <Facebook size={20} /> : <Globe size={20} />} 
                                {isFacebook ? 'Visit Official Facebook' : 'Visit Social Link'}
                            </a>
                        )}
                        <Link to="/contact" className="btn btn-white" style={{ padding: '15px 36px', borderRadius: '50px', background: 'white', color: '#0f172a', fontWeight: '800', textDecoration: 'none', boxShadow: '0 10px 25px rgba(255,255,255,0.2)', transition: 'all 0.3s' }}>
                            Consult & Connect
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Mission & Content Section */}
            <section style={{ padding: '100px 0', background: '#f8fafc' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '65px' }}>
                        <h2 style={{ fontSize: '2.6rem', fontWeight: '900', color: '#0f172a', marginBottom: '18px' }}>
                            {initiative.section_heading || "Our Mission, Vision & Impact"}
                        </h2>
                        <div style={{ width: '80px', height: '5px', background: '#00a09a', margin: '0 auto', borderRadius: '10px' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 992 ? '1fr' : '1.05fr 0.95fr', gap: '55px', alignItems: 'center' }}>
                        <div>
                            <img
                                src={sectionImgUrl}
                                alt={initiative.title}
                                style={{ borderRadius: '28px', width: '100%', maxHeight: '560px', objectFit: 'cover', boxShadow: '0 25px 50px rgba(0,0,0,0.12)' }}
                            />
                        </div>
                        <div>
                            <span style={{ color: '#eb6725', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>
                                Hope Win Community Care
                            </span>
                            <h3 style={{ fontSize: '2.1rem', fontWeight: '800', marginBottom: '22px', color: '#1e293b', lineHeight: 1.3 }}>
                                Empowering Healthcare, Culture & Wellness
                            </h3>
                            
                            <div style={{ marginBottom: '28px' }}>
                                {paragraphs.map((para, idx) => (
                                    <p key={idx} style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.8, marginBottom: idx === paragraphs.length - 1 ? 0 : '16px' }}>
                                        {para}
                                    </p>
                                ))}
                            </div>

                            <div style={{ background: '#ffffff', padding: '28px', borderRadius: '22px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <CheckCircle2 color="#00a09a" size={24} /> Key Program Pillars & Objectives:
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {features.map((item, idx) => (
                                        <li key={idx} style={{ display: 'flex', gap: '14px', marginBottom: idx === features.length - 1 ? 0 : '15px', alignItems: 'flex-start' }}>
                                            <div style={{ background: '#e0f2f1', color: '#00a09a', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                                <ShieldCheck size={15} />
                                            </div>
                                            <span style={{ fontSize: '1.03rem', color: '#334155', fontWeight: '600', lineHeight: 1.5 }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Highlights Footer Section */}
            <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <Heart size={48} color="#eb6725" style={{ margin: '0 auto 20px', display: 'block' }} />
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '18px', color: 'white' }}>
                        Join Us in Making a Meaningful Difference
                    </h2>
                    <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '35px' }}>
                        At Hope Win Hospitals, our commitment extends beyond clinical hospital walls into the very fabric of our communities. Whether you are seeking medical consultations, volunteering for outreach drives, or participating in cultural society initiatives, our leadership team welcomes you.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn" style={{ background: '#00a09a', color: 'white', padding: '16px 40px', borderRadius: '50px', fontWeight: '800', fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 12px 25px rgba(0,160,154,0.4)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CalendarCheck size={20} /> Schedule a Consultation <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InitiativeDetail;
