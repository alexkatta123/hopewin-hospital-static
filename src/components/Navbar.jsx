import { Link, useLocation } from 'react-router-dom';
import { Phone, Facebook, Instagram, Linkedin, Youtube, Twitter, Menu, X, ChevronDown, ChevronRight, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { specialitiesData } from '../data/specialitiesData';
import { getItems } from '../services/cmsService';
import logo from '../media/Banners/hope-logo.avif';
import './Navbar.css';

const JustdialIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <text x="12" y="16" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif">Jd</text>
    </svg>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [initiativesOpen, setInitiativesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [initiatives, setInitiatives] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchNavData = async () => {
            const res = await getItems('initiatives');
            if (res.success && res.data && res.data.length > 0) {
                setInitiatives(res.data);
            }
            const resSoc = await getItems('social_links');
            if (resSoc.success && resSoc.data) {
                setSocialLinks(resSoc.data);
            }
        };
        fetchNavData();
    }, [location.pathname]);

    const getInitiativeUrl = (init, idx) => {
        if (init.link === '/yuvanari' || init.link === '/salaam-namaste') return init.link;
        if (init.link && init.link.startsWith('/initiatives/')) return init.link;
        return `/initiatives/${init.id || idx}`;
    };

    const getSocialUrl = (platform, fallback) => {
        const item = socialLinks.find(s => s.platform && s.platform.toLowerCase() === platform.toLowerCase());
        return item && item.url ? item.url : fallback;
    };

    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMouseEnter = () => {
        if (window.innerWidth > 1024) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setDropdownOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 1024) {
            timeoutRef.current = setTimeout(() => {
                setDropdownOpen(false);
            }, 200); // Small delay for stability
        }
    };

    // Handle scroll for navbar shadow/background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setDropdownOpen(false);
        setInitiativesOpen(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, [location]);

    const closeAll = () => {
        setIsOpen(false);
        setDropdownOpen(false);
        setInitiativesOpen(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    return (
        <header className={`header-wrapper ${scrolled ? 'scrolled' : ''}`}>
            {/* Top Bar - Teal Background */}
            <div className="top-bar">
                <div className="container top-bar-content">
                    <div className="top-bar-left">
                        <div className="info-item">
                            <Clock size={14} />
                            <span>24/7 Emergency & Trauma Care Available</span>
                        </div>
                    </div>
                    <div className="top-bar-right">
                        <div className="info-item marquee-container">
                            <div className="marquee-content">
                                <span>Emergency Number: <strong>+91 97034 69700</strong> | <strong>+91 79471 94699</strong></span>
                            </div>
                        </div>
                        {/* Social Media Icons */}
                        <div className="nav-social-icons top-social-icons">
                            <a href={getSocialUrl('facebook', 'https://www.facebook.com')} target="_blank" rel="noopener noreferrer" className="social-circle social-facebook" title="Facebook">
                                <Facebook size={16} />
                            </a>
                            <a href={getSocialUrl('instagram', 'https://www.instagram.com')} target="_blank" rel="noopener noreferrer" className="social-circle social-instagram" title="Instagram">
                                <Instagram size={16} />
                            </a>
                            <a href={getSocialUrl('linkedin', 'https://www.linkedin.com')} target="_blank" rel="noopener noreferrer" className="social-circle social-linkedin" title="LinkedIn">
                                <Linkedin size={16} />
                            </a>
                            <a href={getSocialUrl('youtube', 'https://www.youtube.com')} target="_blank" rel="noopener noreferrer" className="social-circle social-youtube" title="YouTube">
                                <Youtube size={16} />
                            </a>
                            <a href={getSocialUrl('twitter', 'https://www.twitter.com')} target="_blank" rel="noopener noreferrer" className="social-circle social-twitter" title="Twitter">
                                <Twitter size={16} />
                            </a>
                            <a href={getSocialUrl('justdial', 'https://www.justdial.com/Guntur/Hope-Win-Hospitals-Beside-Life-Hospital-Street-Kotha-Peta/9999PX863-X863-191118125526-L2D7_BZDET')} target="_blank" rel="noopener noreferrer" className="social-circle social-justdial" title="Justdial">
                                <JustdialIcon size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="navbar-main">
                <div className="container navbar-container">

                    {/* Logo Section */}
                    <div className="logo-section">
                        <Link to="/" className="brand-logo" onClick={closeAll}>
                            <img src={logo} alt="Hope Win Hospitals" className="logo-img" />
                            <div className="logo-text">
                                <h1>HOPE WIN</h1>
                                <span>HOSPITALS</span>
                                <small className="tagline">Caring with Compassion</small>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </div>

                    {/* Navigation Menu */}
                    <div className={`nav-menu-wrapper ${isOpen ? 'active' : ''}`}>
                        <nav className="main-nav">
                            <ul className="nav-list">
                                <li>
                                    <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeAll}>Home</Link>
                                </li>

                                <li
                                    className="dropdown-item"
                                    ref={dropdownRef}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="dropdown-link-group">
                                        <Link
                                            to="/specialities"
                                            className={`dropdown-link ${(location.pathname.includes('specialities') || dropdownOpen) ? 'active' : ''}`}
                                            onClick={(e) => {
                                                if (window.innerWidth <= 1024) {
                                                    e.preventDefault();
                                                    setDropdownOpen(!dropdownOpen);
                                                } else {
                                                    closeAll();
                                                }
                                            }}
                                        >
                                            Our Specialities
                                        </Link>
                                        <button
                                            className="dropdown-toggle-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDropdownOpen(!dropdownOpen);
                                            }}
                                            aria-label="Toggle Specialities Menu"
                                        >
                                            <ChevronDown size={16} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
                                        </button>
                                    </div>

                                    {/* Categorized Dropdown */}
                                    {dropdownOpen && (
                                        <div
                                            className="dropdown-menu mega-menu"
                                        >
                                            <div className="mega-menu-grid">
                                                {specialitiesData.map((cat, idx) => (
                                                    <div key={idx} className="mega-menu-col">
                                                        <h4 className="mega-menu-title">
                                                            {cat.category.split('(')[0]}
                                                        </h4>
                                                        <ul className="mega-menu-list">
                                                            {cat.items.slice(0, 8).map((item, i) => (
                                                                <li key={i}>
                                                                    <Link
                                                                        to={`/specialities#${item.replace(/\s+/g, '-').toLowerCase()}`}
                                                                        onClick={closeAll}
                                                                    >
                                                                        <ChevronRight size={12} /> {item}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mega-menu-footer">
                                                <Link to="/specialities" onClick={closeAll}>
                                                    View All Specialities <ChevronRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </li>

                                <li>
                                    <Link to="/doctors" className={location.pathname === '/doctors' ? 'active' : ''} onClick={closeAll}>Our Doctors</Link>
                                </li>
                                <li>
                                    <Link to="/health-packages" className={location.pathname === '/health-packages' ? 'active' : ''} onClick={closeAll}>Health Packages</Link>
                                </li>
                                <li className="dropdown-item">
                                    <div className="dropdown-link-group">
                                        <Link
                                            to="#"
                                            className={`dropdown-link ${(location.pathname === '/yuvanari' || location.pathname === '/salaam-namaste' || location.pathname.startsWith('/initiatives') || initiativesOpen) ? 'active' : ''}`}
                                            onClick={(e) => {
                                                if (window.innerWidth <= 1024) {
                                                    e.preventDefault();
                                                    setInitiativesOpen(!initiativesOpen);
                                                }
                                            }}
                                        >
                                            Our Initiatives
                                        </Link>
                                        <button
                                            className="dropdown-toggle-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setInitiativesOpen(!initiativesOpen);
                                            }}
                                        >
                                            <ChevronDown size={16} className={`dropdown-arrow ${initiativesOpen ? 'open' : ''}`} />
                                        </button>
                                    </div>
                                    <ul className={`dropdown-menu ${initiativesOpen ? 'show' : ''}`}>
                                        {initiatives.length > 0 ? (
                                            initiatives.map((init, idx) => (
                                                <li key={idx}>
                                                    <Link to={getInitiativeUrl(init, idx)} onClick={closeAll}>{init.title}</Link>
                                                </li>
                                            ))
                                        ) : (
                                            <>
                                                <li><Link to="/yuvanari" onClick={closeAll}>Yuvanari</Link></li>
                                                <li><Link to="/salaam-namaste" onClick={closeAll}>Salaam Namaste</Link></li>
                                            </>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''} onClick={closeAll}>Gallery</Link>
                                </li>
                                <li>
                                    <Link to="/feedback" className={location.pathname === '/feedback' ? 'active' : ''} onClick={closeAll}>Feedback</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeAll}>Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Navbar;
