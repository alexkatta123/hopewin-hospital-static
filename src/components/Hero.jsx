import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getItems } from '../services/cmsService';
import './Hero.css';

const defaultSlides = [
    {
        id: 1,
        image_url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        title: "Advanced Super-speciality Expertise",
        subtitle: "Guntur’s newest hospital of choice for comprehensive care.",
        link: "/specialities"
    },
    {
        id: 2,
        image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        title: "State-of-the-Art Technology",
        subtitle: "Equipped with modern infrastructure for precise diagnosis and treatment.",
        link: "/gallery"
    },
    {
        id: 3,
        image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        title: "Expert Medical Team",
        subtitle: "Dedicated specialists committed to your well-being 24/7.",
        link: "/doctors"
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState(defaultSlides);

    useEffect(() => {
        const fetchLiveBanners = async () => {
            const result = await getItems('banners');
            if (result.success && result.data && result.data.length > 0) {
                setSlides(result.data);
            }
        };
        fetchLiveBanners();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="hero-section" style={{ padding: 0, overflow: 'hidden', position: 'relative', height: '600px' }}>
            {slides.map((slide, index) => {
                const bgImg = slide.image_url || slide.image;
                return (
                    <div
                        key={slide.id || index}
                        className="hero-slide"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentSlide ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                            backgroundImage: `linear-gradient(rgba(0, 77, 64, 0.7), rgba(0, 77, 64, 0.6)), url("${bgImg}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            color: 'white',
                            pointerEvents: index === currentSlide ? 'auto' : 'none'
                        }}
                    >
                        <div className="container">
                            <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 'bold' }}>{slide.title}</h1>
                            <p style={{ fontSize: '1.5rem', marginBottom: '30px', maxWidth: '800px', margin: '0 auto 30px' }}>{slide.subtitle}</p>
                            <Link to={slide.link || '/specialities'} className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', backgroundColor: 'var(--accent-orange)', border: 'none' }}>
                                Explore More
                            </Link>
                        </div>
                    </div>
                );
            })}

            <button onClick={prevSlide} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                <ChevronLeft size={40} />
            </button>
            <button onClick={nextSlide} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                <ChevronRight size={40} />
            </button>

            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: idx === currentSlide ? 'var(--accent-orange)' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer'
                        }}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
