import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getItems } from '../services/cmsService';
import './Gallery.css';

// Dynamically import all images from the media/gallery folder
const galleryImagesModules = import.meta.glob('../media/gallery/*.{png,jpg,jpeg,svg,webp}', { eager: true });

// Convert the modules object to an array of image URLs
const galleryImages = Object.values(galleryImagesModules).map(module => module.default);

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [liveGallery, setLiveGallery] = useState([]);

    useEffect(() => {
        const fetchGallery = async () => {
            const res = await getItems('gallery');
            if (res.success && res.data && res.data.length > 0) {
                setLiveGallery(res.data);
            }
        };
        fetchGallery();
    }, []);

    const itemsToRender = liveGallery.length > 0 
        ? liveGallery.map(g => ({ url: g.image_url, title: g.title })) 
        : galleryImages.map(url => ({ url, title: '' }));

    return (
        <div className="gallery-page">
            <div className="page-header" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1500)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1.2rem', fontWeight: '800', opacity: 1, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <Link to="/" style={{ color: '#00f0ff', textDecoration: 'none' }}>Home</Link>
                        <ChevronRight size={22} />
                        <span>Our Gallery</span>
                    </div>
                    <h1 style={{ color: 'white' }}>Our Gallery</h1>
                    <p style={{ color: 'white' }}>Explore our state-of-the-art facilities and infrastructure</p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 20px' }}>
                {itemsToRender.length > 0 ? (
                    <div className="gallery-grid-page">
                        {itemsToRender.map((img, index) => (
                            <div key={index} className="gallery-card" onClick={() => setSelectedImage(img.url)} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                                <img src={img.url} alt={img.title || `Gallery Image ${index + 1}`} loading="lazy" style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.4s' }} />
                                {img.title && (
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(15,23,42,0.85))', padding: '20px 15px 10px', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>
                                        {img.title}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <h3>No images found in gallery folder.</h3>
                    </div>
                )}
            </div>

            {/* Lightbox for viewing larger images */}
            {selectedImage && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content">
                        <img src={selectedImage} alt="Full View" />
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
