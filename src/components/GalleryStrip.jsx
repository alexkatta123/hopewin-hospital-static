import './GalleryStrip.css';

const GalleryStrip = () => {
    const images = [
        "https://images.unsplash.com/photo-1516574187841-693083f05212?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516549833213-73933f2e8638?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519494080410-f9aa826ff29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ];

    return (
        <div className="gallery-strip">
            <h2 className="text-center mb-4">Our Facilities</h2>
            <div className="gallery-container">
                {images.map((img, index) => (
                    <div key={index} className="gallery-item">
                        <img src={img} alt={`Facility ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryStrip;
