import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useHeaders from '../hooks/useHeaders';
import { createItem } from '../services/cmsService';

const Contact = () => {
    const { headers } = useHeaders();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const contactHeader = headers['contact'] || {
        title: "Let's Start Your Journey to Recovery",
        subtitle: "Our dedicated patient care team is available round the clock to assist with appointments, inquiries, and emergency services.",
        image: ""
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await createItem('contacts', {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now()
        });

        if (result.success) {
            setSubmitted(true);
            setFormData({ name: '', phone: '', email: '', message: '' });
            setLoading(false);
        } else {
            setError('Failed to transmit message. Please call our emergency helpline.');
            setLoading(false);
        }
    };

    return (
        <div className="contact-page" style={{ background: '#f8fafc' }}>
            {/* Premium Hero Section */}
            <section style={{
                background: contactHeader.image
                    ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${contactHeader.image.startsWith('http') ? contactHeader.image : API_BASE + contactHeader.image}")`
                    : 'linear-gradient(135deg, #00a09a 0%, #004d40 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '120px 0 100px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'rgba(255,255,255,0.05)', transform: 'skewX(-20deg) translateX(50%)' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '800px' }}>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '900', color: 'white', lineHeight: 1.1, marginBottom: '25px' }}>{contactHeader.title}</h1>
                        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', opacity: 0.9, lineHeight: 1.6, marginBottom: '40px' }}>{contactHeader.subtitle}</p>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start' }}>
                            <a href="tel:+919703469700" className="btn btn-white" style={{ padding: '15px 30px', fontSize: '1rem', borderRadius: '15px', color: '#00695c', display: 'flex', alignItems: 'center' }}>
                                <Phone size={20} style={{ marginRight: '10px' }} /> Call Now
                            </a>
                            <a href="https://wa.me/919703469700" className="btn" style={{ padding: '15px 30px', fontSize: '1rem', borderRadius: '15px', background: '#25d366', border: 'none' }}>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ padding: '80px 0 120px', marginTop: '-60px' }}>
                <div className="container">
                    <div className="contact-main-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: window.innerWidth < 992 ? '1fr' : '1.8fr 1.2fr',
                        gap: window.innerWidth < 768 ? '30px' : '50px',
                        alignItems: 'start'
                    }}>
                        {/* Contact Form Card */}
                        <div className="card contact-form-card" style={{ padding: window.innerWidth < 768 ? '30px' : '60px', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)', border: 'none', background: 'white' }}>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '900', color: '#1a1f36', marginBottom: '30px' }}>Send a Message</h2>

                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <div style={{ background: '#e2f3f1', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', color: '#00a09a' }}>
                                        <Send size={48} />
                                    </div>
                                    <h3 style={{ fontSize: '2rem', color: '#1a1f36', marginBottom: '15px' }}>Message Sent!</h3>
                                    <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '30px' }}>Thank you for reaching out. A patient care coordinator will contact you shortly.</p>
                                    <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ padding: '12px 30px', borderRadius: '12px' }}>Send Another Message</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row" style={{
                                        display: 'grid',
                                        gridTemplateColumns: window.innerWidth < 600 ? '1fr' : '1fr 1fr',
                                        gap: '20px',
                                        marginBottom: '20px'
                                    }}>
                                        <div className="form-group">
                                            <label style={{ color: '#4a5568', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', display: 'block' }}>Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', transition: '0.3s' }}
                                                className="contact-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label style={{ color: '#4a5568', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', display: 'block' }}>Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder="+91 00000 00000"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                                                className="contact-input"
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '25px' }}>
                                        <label style={{ color: '#4a5568', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', display: 'block' }}>Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                                            className="contact-input"
                                        />
                                    </div>
                                    <div style={{ marginBottom: '40px' }}>
                                        <label style={{ color: '#4a5568', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', display: 'block' }}>Your Message / Requirement</label>
                                        <textarea
                                            rows="5"
                                            placeholder="Tell us how we can help you..."
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', resize: 'none' }}
                                            className="contact-input"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn"
                                        style={{
                                            width: '100%',
                                            padding: '20px',
                                            borderRadius: '15px',
                                            fontSize: '1.1rem',
                                            fontWeight: '800',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            boxShadow: '0 10px 20px rgba(0,160,154,0.3)',
                                            background: '#eb6725',
                                            border: 'none',
                                            color: 'white'
                                        }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Transmitting...' : <><Send size={20} /> Secure Send</>}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Sidebar Info Cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div className="card" style={{ padding: '40px', borderRadius: '30px', border: 'none', background: 'white' }}>
                                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #00a09a, #004d40)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '25px' }}>
                                    <MapPin size={30} />
                                </div>
                                <h3 style={{ fontSize: '1.4rem', color: '#1a1f36', marginBottom: '15px' }}>Our Location</h3>
                                <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
                                    D.No.51-8-262, Beside Life Hospital Street, Kotha Peta, Guntur - 522001, Andhra Pradesh.
                                </p>
                            </div>

                            <div className="card" style={{ padding: '40px', borderRadius: '30px', border: 'none', background: 'white' }}>
                                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #eb6725, #bf360c)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '25px' }}>
                                    <Phone size={30} />
                                </div>
                                <h3 style={{ fontSize: '1.4rem', color: '#1a1f36', marginBottom: '15px' }}>Quick Contacts</h3>
                                <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>+91 97034 69700</p>
                                <p style={{ color: '#64748b', fontSize: '1rem' }}>hopewinhospitals@gmail.com</p>
                            </div>

                            {/* Google Map Integration */}
                            <div className="card" style={{ padding: '0', borderRadius: '30px', border: 'none', background: 'white', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.742366874838!2d80.4523416!3d16.2981657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a0b48bf28202f%3A0xf4abe5b9566ebc24!2sHOPE%20WIN%20HOSPITALS!5e0!3m2!1sen!2sin!4v1707900000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Hope Win Hospitals Location"
                                ></iframe>
                                <div style={{ padding: '20px', textAlign: 'center', background: '#f8fafc' }}>
                                    <a
                                        href="https://maps.app.goo.gl/uMdaPXMbQeaxumcc8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#00a09a', fontWeight: '800', textDecoration: 'none', fontSize: '0.9rem' }}
                                    >
                                        GET DIRECTIONS ON GOOGLE MAPS →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <style>{`
                .contact-input:focus {
                    border-color: #00a09a !important;
                    background: white !important;
                    box-shadow: 0 0 0 4px rgba(0,160,154,0.1);
                }
                @media (max-width: 992px) {
                    .grid-3 { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default Contact;
