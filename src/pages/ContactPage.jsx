import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Contact from '../components/Contact';
import './Contact.css';

const ContactPage = () => {
    return (
        <div>
            <div className="contact-page-header" style={{ padding: '80px 0', backgroundColor: 'var(--secondary-blue)', color: 'white' }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1.2rem', fontWeight: '800', opacity: 1, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <Link to="/" style={{ color: '#00f0ff', textDecoration: 'none' }}>Home</Link>
                        <ChevronRight size={22} />
                        <span>Contact Us</span>
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>Contact Us</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>We're here to help you 24/7</p>
                </div>
            </div>
            <Contact />

            <div className="map-section">
                <div className="container">
                    <h2 style={{ color: 'var(--secondary-blue)', marginBottom: '10px' }}>Location: Hope Win Hospitals</h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px', color: '#555' }}>
                        <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#e67e22' }}>
                            4.8 <span style={{ marginLeft: '4px' }}>★★★★★</span>
                        </span>
                        <span>(150 reviews)</span>
                        <span>•</span>
                        <span>Hospital</span>
                        <span>•</span>
                        <span style={{ color: '#16a085', fontWeight: 'bold' }}>Open 24 hours</span>
                    </div>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.742366874838!2d80.4523416!3d16.2981657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a0b48bf28202f%3A0xf4abe5b9566ebc24!2sHOPE%20WIN%20HOSPITALS!5e0!3m2!1sen!2sin!4v1707900000000!5m2!1sen!2sin"
                            title="Hope Win Hospitals Location"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <a
                            href="https://maps.app.goo.gl/uMdaPXMbQeaxumcc8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                            style={{ backgroundColor: 'var(--primary-teal)', color: 'white', textDecoration: 'none', padding: '12px 25px', borderRadius: '30px', fontWeight: 'bold' }}
                        >
                            Get Directions to Hope Win Hospitals
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
