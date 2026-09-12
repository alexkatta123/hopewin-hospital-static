import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="section-title">
                    <h2>Contact Us</h2>
                    <p>We are here to help. Reach out to us for appointments and inquiries.</p>
                </div>
                <div className="contact-grid">
                    <div className="contact-info-box">
                        <div className="info-item">
                            <MapPin className="info-icon" />
                            <div>
                                <h3>Our Location</h3>
                                <p>D No.51-8-262, Beside Life HOSPITAL Street, Gunturivarithota 7th Line, Kotha Peta, Guntur-522001, Andhra Pradesh</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Phone className="info-icon" />
                            <div>
                                <h3>Phone Number</h3>
                                <p>07947194699</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Mail className="info-icon" />
                            <div>
                                <h3>Email Address</h3>
                                <p>info@hopewinhospitals.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Clock className="info-icon" />
                            <div>
                                <h3>Working Hours</h3>
                                <p>Emergency: 24/7 Open</p>
                                <p>OPD: Mon-Sat, 9:00 AM - 9:00 PM</p>
                            </div>
                        </div>


                    </div>

                    <div className="contact-form-box">
                        <h3>Get In Touch</h3>
                        <form>
                            <div className="form-group">
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Your Email" required />
                            </div>
                            <div className="form-group">
                                <input type="tel" placeholder="Your Phone" required />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Message" rows="5" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
