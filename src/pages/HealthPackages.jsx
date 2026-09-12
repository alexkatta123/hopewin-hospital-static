import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const HealthPackages = () => {
    const packages = [
        {
            title: "Basic Health Checkup",
            price: "₹0 (FREE)",
            features: ["CBC", "Urine Routine", "Fast Blood Sugar", "Serum Cholesterol", "ECG", "Consultation"],
            color: "#00a099"
        },
        {
            title: "Master Health Checkup",
            price: "₹0 (FREE)",
            features: ["Complete Blood Picture", "Liver Function Test", "Kidney Function Test", "Lipid Profile", "ECG", "X-Ray Chest", "Ultrasound Abdomen", "Physician Consultation"],
            color: "#0e4d68"
        },
        {
            title: "Cardiac Health Checkup",
            price: "₹0 (FREE)",
            features: ["Complete Haemogram", "Fasting Blood Sugar", "Lipid Profile", "ECG", "2D Echo", "TMT", "Cardiologist Consultation"],
            color: "#f37021"
        }
    ];

    return (
        <div className="health-packages-page">
            {/* Premium Hero Section with Breadcrumb */}
            <div className="page-header" style={{
                backgroundImage: 'linear-gradient(rgba(14,77,104,0.9), rgba(14,77,104,0.8)), url(https://images.unsplash.com/photo-1576091160550-217359f42af1?auto=format&fit=crop&q=80&w=1500)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '80px 0',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1.2rem', fontWeight: '800', opacity: 1, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <Link to="/" style={{ color: '#00f0ff', textDecoration: 'none' }}>Home</Link>
                        <ChevronRight size={22} />
                        <span>Health Packages</span>
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>Our Health Packages</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Comprehensive health checkups tailored for you</p>
                </div>
            </div>

            <div style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {packages.map((pkg, index) => (
                            <div key={index} style={{
                                background: 'white',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                borderTop: `5px solid ${pkg.color}`
                            }}>
                                <div style={{ padding: '30px', textAlign: 'center', background: pkg.color, color: 'white' }}>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{pkg.title}</h2>
                                    <h3 style={{ fontSize: '2rem' }}>{pkg.price}</h3>
                                </div>
                                <div style={{ padding: '30px' }}>
                                    <ul style={{ listStyle: 'none' }}>
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} style={{
                                                padding: '10px 0',
                                                borderBottom: '1px solid #eee',
                                                color: '#555',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{ color: pkg.color, marginRight: '10px', fontWeight: 'bold' }}>✓</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn" style={{
                                        width: '100%',
                                        marginTop: '20px',
                                        backgroundColor: pkg.color,
                                        color: 'white',
                                        border: 'none',
                                        padding: '15px'
                                    }}>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthPackages;
