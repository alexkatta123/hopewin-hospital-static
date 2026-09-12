import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, ChevronRight } from 'lucide-react';

import useHeaders from '../hooks/useHeaders';
import { getItems } from '../services/cmsService';

const Packages = () => {
    const { headers } = useHeaders();
    const [packages, setPackages] = useState([
        {
            name: "Basic Health Checkup",
            description: "Essential screenings for early detection of common health issues, ensuring you stay ahead of your wellbeing.",
            original_price: "1500",
            features: ["Complete Blood Count (CBC)", "Urine Routine", "Fast Blood Sugar", "Serum Cholesterol", "ECG", "General Consultation"]
        },
        {
            name: "Master Health Checkup",
            description: "A comprehensive assessment of your vital organs and metabolic health for a thorough nutritional and clinical evaluation.",
            original_price: "3500",
            features: ["Liver Function Test", "Kidney Function Test", "Lipid Profile", "Chest X-Ray", "Ultrasound Abdomen", "Physician Consultation"]
        },
        {
            name: "Cardiac Excellence Package",
            description: "Specialized heart-focused screenings designed to evaluate cardiovascular health and identify potential risks early.",
            original_price: "5000",
            features: ["Complete Haemogram", "Fasting Blood Sugar", "2D Echo", "TMT (Treadmill Test)", "Cardiologist Consultation"]
        }
    ]);
    const [loading, setLoading] = useState(true);
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const headerData = headers['packages'] || {};
    const pkgHeader = {
        title: headerData.title || "Prioritize Your Health",
        subtitle: headerData.subtitle || "We believe healthcare is a right, not a privilege. Explore our range of complimentary health checkup packages designed for every need.",
        image: headerData.image || "https://images.unsplash.com/photo-1576091160550-217359f42af1?auto=format&fit=crop&q=80&w=1500",
        breadcrumb: headerData.breadcrumb
    };

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await getItems('packages');
                if (res.success && res.data && res.data.length > 0) {
                    setPackages(res.data);
                }
            } catch (error) {
                console.error('Error fetching packages:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    if (loading) return (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 className="animate-spin" size={60} color="#00a09a" />
        </div>
    );

    return (
        <div className="packages-page">
            <section className="hero-section" style={{
                background: pkgHeader.image && pkgHeader.image.includes('unsplash')
                    ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${pkgHeader.image}")`
                    : 'inherit',
                backgroundSize: 'cover'
            }}>
                <div className="container hero-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth < 992 ? '1fr' : '1.2fr 0.8fr',
                    gap: '40px',
                    alignItems: 'center'
                }}>
                    <div className="hero-content">
                        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '900', marginBottom: '20px', lineHeight: 1.1 }}>{pkgHeader.title}</h1>
                        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', opacity: 0.8, marginBottom: '30px' }}>{pkgHeader.subtitle}</p>
                        <div className="badge" style={{ background: '#00a09a', color: 'white', padding: '12px 25px', borderRadius: '50px', display: 'inline-block', fontWeight: '800', boxShadow: '0 10px 20px rgba(0,160,154,0.2)', fontSize: '0.85rem' }}>
                            ALL PACKAGES ARE COMPLIMENTARY
                        </div>
                    </div>
                    <div className="hero-visual" style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}>
                        {pkgHeader.image && (
                            <img
                                src={pkgHeader.image.startsWith('http') ? pkgHeader.image : API_BASE + pkgHeader.image}
                                alt="Packages"
                                style={{ borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', width: '100%', height: 'auto', display: 'block' }}
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1576091160550-217359f42af1?auto=format&fit=crop&q=80&w=1000";
                                }}
                            />
                        )}
                    </div>
                </div>
            </section>

            <section style={{ padding: window.innerWidth < 768 ? '40px 0' : '80px 0', background: '#f8fafc' }}>
                <div className="container">
                    <div className="package-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: window.innerWidth < 768 ? '25px' : '35px'
                    }}>
                        {packages.length > 0 ? packages.map((pkg, idx) => {
                            let feat = pkg.features;
                            if (!feat && pkg.features_json) {
                                try { feat = JSON.parse(pkg.features_json); } catch(e){}
                            }
                            return (
                            <div key={idx} className="card package-card-premium" style={{ border: '1px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden', background: 'white', transition: '0.4s', display: 'flex', flexDirection: 'column' }}>
                                {/* Package Image Container */}
                                <div style={{ height: '200px', width: '100%', overflow: 'hidden', background: '#e2f3f1', position: 'relative' }}>
                                    <img
                                        src={pkg.image ? (pkg.image.startsWith('http') ? pkg.image : API_BASE + pkg.image) : `https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800`}
                                        alt={pkg.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }}
                                        className="package-img"
                                    />
                                    <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                        <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', background: '#00a09a', padding: '5px 12px', borderRadius: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                            Hope Win Exclusive
                                        </span>
                                    </div>
                                </div>

                                <div className="card-content" style={{ padding: window.innerWidth < 600 ? '25px' : '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                                        <span style={{ fontSize: '0.7rem', color: '#00a09a', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', background: '#e2f3f1', padding: '4px 10px', borderRadius: '50px' }}>Community Outreach</span>
                                        {idx === 1 && <span style={{ fontSize: '0.7rem', color: '#eb6725', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', background: '#fff0e6', padding: '4px 10px', borderRadius: '50px' }}>Top Choice</span>}
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px', color: '#1a1f36' }}>{pkg.name}</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '25px' }}>{pkg.description || pkg.desc}</p>

                                    <div style={{ marginBottom: '25px' }}>
                                        <p style={{ fontWeight: '700', fontSize: '0.85rem', color: '#1a1f36', marginBottom: '12px' }}>What's Included:</p>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {(feat || []).map((f, i) => (
                                                <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '0.9rem', color: '#4a5568', alignItems: 'center' }}>
                                                    <div style={{ background: '#00a09a', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <Check size={10} color="white" strokeWidth={4} />
                                                    </div>
                                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div style={{ borderTop: '1px solid #f1f5f9', marginTop: 'auto', paddingTop: '20px' }}>
                                        <Link to="/contact" className="btn" style={{
                                            display: 'block',
                                            textAlign: 'center',
                                            width: '100%',
                                            padding: '12px 20px',
                                            borderRadius: '12px',
                                            fontSize: '0.95rem',
                                            fontWeight: '800',
                                            background: '#eb6725',
                                            border: 'none',
                                            color: 'white',
                                            textDecoration: 'none'
                                        }}>
                                            Enroll Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            );
                        }) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px' }}>
                                <h3>Health packages will be listed here soon.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>



            <style>{`
                .package-card-premium:hover {
                    transform: translateY(-15px);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
                    border-color: #00a09a40;
                }
            `}</style>
        </div>
    );
};

export default Packages;
