import { Stethoscope, Heart, Activity, User, ShieldCheck, Thermometer, Microscope, Baby } from 'lucide-react';
import './Services.css';

const services = [
    { id: 1, title: 'Gynaecology & Obstetrics', icon: <Baby size={40} />, description: 'Expert care for women’s health and maternity.' },
    { id: 2, title: 'General Surgery', icon: <Activity size={40} />, description: 'Comprehensive surgical procedures with advanced techniques.' },
    { id: 3, title: 'Laparoscopic Surgery', icon: <Microscope size={40} />, description: 'Minimally invasive surgeries for faster recovery.' },
    { id: 4, title: 'Gastroenterology', icon: <Stethoscope size={40} />, description: 'Treatment for digestive system disorders.' },
    { id: 5, title: 'Proctology', icon: <ShieldCheck size={40} />, description: 'Specialized care for colorectal conditions.' },
    { id: 6, title: 'Thyroid Treatment', icon: <Thermometer size={40} />, description: 'Diagnosis and exciting management of thyroid disorders.' },
    { id: 7, title: 'Varicose Veins', icon: <Activity size={40} />, description: 'Advanced treatments for vein health.' },
    { id: 8, title: 'Diagnostics', icon: <Microscope size={40} />, description: 'Accurate and timely diagnostic services.' },
];

const Services = () => {
    return (
        <section id="services" className="services-section">
            <div className="container">
                <div className="section-title">
                    <h2>Our Specialties</h2>
                    <p>We provide a wide range of medical services to ensure your well-being.</p>
                </div>
                <div className="services-grid">
                    {services.map(service => (
                        <div key={service.id} className="service-card">
                            <div className="icon-box">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
