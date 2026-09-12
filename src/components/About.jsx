import { CheckCircle } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="about-content">
                    <div className="about-image">
                        <img
                            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Hope Win Hospitals Building"
                        />
                        <div className="experience-badge">
                            <span className="years">10+</span>
                            <span className="text">Years of Excellence</span>
                        </div>
                    </div>
                    <div className="about-text">
                        <h4>About Hope Win Hospitals</h4>
                        <h2>Leading the Way in Medical Excellence</h2>
                        <p>
                            Hope Win Hospitals, located in Kotha Peta, Guntur, is a premier healthcare facility dedicated to providing
                            comprehensive and compassionate care. We are renowned for our patient-centric approach and state-of-the-art
                            medical infrastructure.
                        </p>
                        <p>
                            Our team of highly skilled doctors and support staff are committed to ensuring the best possible outcomes for every patient.
                        </p>

                        <ul className="features-list">
                            <li><CheckCircle className="check-icon" size={20} /> Advanced Surgical Facilities</li>
                            <li><CheckCircle className="check-icon" size={20} /> 24/7 Emergency & Trauma Care</li>
                            <li><CheckCircle className="check-icon" size={20} /> Expert Team of Specialists</li>
                            <li><CheckCircle className="check-icon" size={20} /> Patient-Centered Care Approach</li>
                        </ul>

                        <a href="#contact" className="btn btn-primary">Learn More</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
