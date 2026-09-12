import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, ChevronsRight } from 'lucide-react';
import { getVisitorCount, incrementVisitorCount, getItems } from '../services/cmsService';
import './Footer.css';

const JustdialIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <text x="12" y="16" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif">Jd</text>
    </svg>
);

const Footer = () => {
    const [visitorCount, setVisitorCount] = useState(1);
    const [formattedDate, setFormattedDate] = useState('');
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        const syncVisitorCount = async () => {
            // Purge old hardcoded fake counts from browser storage if present
            const stored = localStorage.getItem('hopewin_visitor_count');
            if (stored && (parseInt(stored, 10) >= 6000000 || isNaN(parseInt(stored, 10)))) {
                localStorage.removeItem('hopewin_visitor_count');
                sessionStorage.removeItem('hopewin_session_visited');
            }

            // Increment real count on backend if this is a new browser session
            if (!sessionStorage.getItem('hopewin_session_visited')) {
                const res = await incrementVisitorCount();
                if (res && res.count && res.count < 6000000) {
                    setVisitorCount(res.count);
                } else {
                    setVisitorCount(1);
                }
                sessionStorage.setItem('hopewin_session_visited', 'true');
            } else {
                // Otherwise fetch current live count from backend
                const res = await getVisitorCount();
                if (res && res.count && res.count < 6000000) {
                    setVisitorCount(res.count);
                } else {
                    setVisitorCount(1);
                }
            }
        };

        syncVisitorCount();

        // Live refresh: poll backend every 10 seconds to flip counter live when new visitors arrive
        const intervalId = setInterval(async () => {
            const res = await getVisitorCount();
            if (res && res.count && res.count < 6000000) {
                setVisitorCount(res.count);
            }
        }, 10000);

        const fetchSocial = async () => {
            const res = await getItems('social_links');
            if (res.success && res.data) setSocialLinks(res.data);
        };
        fetchSocial();

        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        setFormattedDate(now.toLocaleDateString('en-GB', options));

        return () => clearInterval(intervalId);
    }, []);

    const getSocialUrl = (platform, fallback) => {
        const item = socialLinks.find(s => s.platform && s.platform.toLowerCase() === platform.toLowerCase());
        return item && item.url ? item.url : fallback;
    };

    const visitorDigits = visitorCount.toString().padStart(7, '0').split('');

    const specialities = [
        "Cardiology", "Nephrology", "Vascular Surgery", "General Surgery",
        "Orthopaedics", "Obstetrics & Gynaecology", "Critical care", "General Medicine",
        "Paediatrics", "Neurology", "Gastroenterology", "Urology",
        "Surgical Oncology", "Neurosurgery", "Rheumatology", "Dentistry",
        "Podiatry", "Cardiothoracic Surgery", "Radiology", "Physiotherapy"
    ];

    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="container footer-grid">

                    {/* Column 1: Quick Links & Follow Us */}
                    <div className="footer-col">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><ChevronsRight size={16} /><Link to="/">Home</Link></li>

                            <li><ChevronsRight size={16} /><Link to="/doctors">Our Doctors</Link></li>
                            <li><ChevronsRight size={16} /><Link to="/health-packages">Health Packages</Link></li>
                            <li><ChevronsRight size={16} /><Link to="/gallery">Gallery</Link></li>
                            <li><ChevronsRight size={16} /><Link to="/feedback">Feedback</Link></li>
                            <li><ChevronsRight size={16} /><Link to="/contact">Contact</Link></li>
                        </ul>

                        <div className="follow-us">
                            <h3>Follow Us</h3>
                            <div className="social-icons">
                                <a href={getSocialUrl('facebook', 'https://www.facebook.com')} target="_blank" rel="noopener noreferrer" title="Facebook"><Facebook size={20} /></a>
                                <a href={getSocialUrl('instagram', 'https://www.instagram.com')} target="_blank" rel="noopener noreferrer" title="Instagram"><Instagram size={20} /></a>
                                <a href={getSocialUrl('linkedin', 'https://www.linkedin.com')} target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin size={20} /></a>
                                <a href={getSocialUrl('youtube', 'https://www.youtube.com')} target="_blank" rel="noopener noreferrer" title="YouTube"><Youtube size={20} /></a>
                                <a href={getSocialUrl('twitter', 'https://www.twitter.com')} target="_blank" rel="noopener noreferrer" title="Twitter"><Twitter size={20} /></a>
                                <a href={getSocialUrl('justdial', 'https://www.justdial.com/Guntur/Hope-Win-Hospitals-Beside-Life-Hospital-Street-Kotha-Peta/9999PX863-X863-191118125526-L2D7_BZDET')} target="_blank" rel="noopener noreferrer" title="Justdial"><JustdialIcon size={20} /></a>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Specialities (Spans 2 columns width effectively in grid) */}
                    <div className="footer-col specialities-col">
                        <h3>Specialities</h3>
                        <ul className="specialities-list">
                            {specialities.map((item, index) => (
                                <li key={index}>
                                    <ChevronsRight size={16} /> <Link to={`/specialities/${item.toLowerCase().replace(/ /g, '-')}`}>{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Us */}
                    <div className="footer-col contact-col">
                        <h3>Contact Us</h3>
                        <ul className="contact-list">
                            <li>
                                <Phone size={20} className="icon" />
                                <span>+91 97034 69700 | 07947194699</span>
                            </li>
                            <li>
                                <Mail size={20} className="icon" />
                                <span>info@hopewinhospitals.com</span>
                            </li>
                            <li>
                                <Clock size={20} className="icon" />
                                <div>
                                    <strong>OP Consultation Timings</strong>
                                    <p>Mon to Sat: 10 am to 3 pm</p>
                                    <p>evening: 5 pm to 8 pm</p>
                                    <p>Sunday : 10 am to 1 pm</p>
                                </div>
                            </li>
                            <li>
                                <MapPin size={24} className="icon" style={{ minWidth: '24px' }} />
                                <div>
                                    <strong>Hope Win Hospitals</strong>
                                    <p>D No.51-8-262, Beside Life HOSPITAL Street,</p>
                                    <p>Gunturivarithota 7th Line, Kotha Peta,</p>
                                    <p>Guntur-522001, Andhra Pradesh.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Visitors Counter and Last Updated Stats Bar */}
            <div className="footer-stats-bar">
                <div className="visitor-count-container">
                    <span className="stats-label">Visitors count : </span>
                    <div className="counter-digits" aria-label={`Visitor Count: ${visitorCount}`}>
                        {visitorDigits.map((digit, index) => (
                            <span key={index} className="counter-digit">{digit}</span>
                        ))}
                    </div>
                </div>
                <div className="last-updated-container">
                    <strong className="stats-label-bold">Last Updated on : </strong>
                    <span className="updated-date">{formattedDate || "Thursday, 30 July 2026"}</span>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <p>© {new Date().getFullYear()} Hope Win Hospitals. All Rights Reserved | Patient Privacy & Confidentiality Protected</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
