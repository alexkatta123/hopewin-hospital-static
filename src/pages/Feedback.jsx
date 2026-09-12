import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { specialitiesData } from '../data/specialitiesData';
import { Star, CheckCircle, ChevronRight, User } from 'lucide-react';
import { addFeedback, getAllFeedback } from '../services/feedbackService';
import './Feedback.css';

const Feedback = () => {
    // Flatten the specialities data for list
    const allServices = specialitiesData.reduce((acc, category) => {
        return [...acc, ...category.items];
    }, []).sort();

    // Add "General Hospital Service" and "Other" to the list for selection
    const availableServices = ["General Hospital Service", ...allServices, "Other"];

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        services: [], // Changed to array for multi-select
        rating: 0,
        comments: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoadingReviews(true);
        const result = await getAllFeedback();
        if (result.success) {
            setReviews(result.data);
        }
        setLoadingReviews(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleService = (service) => {
        setFormData(prev => {
            const isSelected = prev.services.includes(service);
            if (isSelected) {
                return { ...prev, services: prev.services.filter(s => s !== service) };
            } else {
                return { ...prev, services: [...prev.services, service] };
            }
        });
    };

    const handleRating = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating: rating
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.services.length === 0) {
            alert("Please select at least one service.");
            return;
        }

        const newReview = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            rating: formData.rating,
            comment: formData.comments,
            service: formData.services.join(", ")
        };

        const result = await addFeedback(newReview);

        if (result.success) {
            setSubmitted(true);
            fetchReviews(); // Refresh the list
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="feedback-page" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div className="feedback-container">
                {submitted ? (
                    <div className="success-message">
                        <CheckCircle size={64} className="success-icon" />
                        <h2>Thank You!</h2>
                        <p>Your feedback has been submitted successfully.</p>
                        <p>We appreciate your time to help us improve our services.</p>
                        <button
                            className="submit-btn"
                            style={{ marginTop: '20px' }}
                            onClick={() => {
                                setSubmitted(false);
                                setFormData({ name: '', phone: '', email: '', services: [], rating: 0, comments: '' });
                            }}
                        >
                            Submit Another Response
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="feedback-header">
                            <h2>Share Your Experience</h2>
                            <p>We value your feedback to improve our services</p>
                        </div>

                        <form className="feedback-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email address"
                                />
                            </div>

                            <div className="form-group">
                                <label>Services Availed * (Select all that apply)</label>
                                <div className="services-grid">
                                    {availableServices.map((service, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`service-btn ${formData.services.includes(service) ? 'selected' : ''}`}
                                            onClick={() => toggleService(service)}
                                        >
                                            {service}
                                        </button>
                                    ))}
                                </div>
                                {formData.services.length === 0 && (
                                    <span style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px', display: 'block' }}>
                                        Please select at least one service.
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Your Rating *</label>
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className={star <= (hoverRating || formData.rating) ? "active" : "inactive"}
                                            onClick={() => handleRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        >
                                            <Star
                                                fill={star <= (hoverRating || formData.rating) ? "#ffd700" : "none"}
                                                color={star <= (hoverRating || formData.rating) ? "#ffd700" : "#ccc"}
                                            />
                                        </button>
                                    ))}
                                </div>
                                {formData.rating > 0 && (
                                    <span style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px', display: 'block' }}>
                                        {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][formData.rating - 1]}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="comments">Additional Comments</label>
                                <textarea
                                    id="comments"
                                    name="comments"
                                    rows="4"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    placeholder="Tell us more about your experience..."
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn" style={{ marginBottom: '40px' }}>
                                Submit Feedback
                            </button>
                        </form>
                    </>
                )}

                {/* Reviews Section */}

            </div>

            {/* Banner Section */}
            <div className="page-header" style={{
                backgroundImage: 'linear-gradient(rgba(0,160,154,0.9), rgba(0,77,64,0.8)), url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1500)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '80px 0',
                margin: '60px 0 40px 0',
                width: '100%',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>Your Feedback Matters</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Help us serve you better with your valuable suggestions</p>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section" style={{ width: '100%', maxWidth: '1200px', padding: '0 20px', marginBottom: '60px' }}>
                <div className="review-header">
                    <h3>Recent Reviews <span style={{ fontSize: '0.8em', fontWeight: 'normal', color: '#666' }}>({reviews.length})</span></h3>
                </div>

                {loadingReviews ? (
                    <p>Loading reviews...</p>
                ) : reviews.length > 0 ? (
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <div className="reviewer-info">
                                        <div className="avatar-placeholder">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h4>{review.name}</h4>
                                            <div className="star-rating" style={{ marginBottom: 0 }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        fill={i < review.rating ? "#ffd700" : "none"}
                                                        color={i < review.rating ? "#ffd700" : "#ccc"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="review-date">{review.date}</span>
                                </div>
                                {review.service && review.service.split(', ').map((svc, idx) => (
                                    <span key={idx} className="review-service-tag">{svc}</span>
                                ))}
                                <p className="review-comment">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: '#666' }}>No reviews yet. Be the first to share your experience!</p>
                )}
            </div>
        </div>
    );
};

export default Feedback;
