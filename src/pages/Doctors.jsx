import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getItems } from '../services/cmsService';
import './Doctors.css';

// Import doctor images dynamically
const doctorImagesModules = import.meta.glob('../media/doctors/*.{png,jpg,jpeg,webp}', { eager: true });

const getFileName = (path) => {
    const parts = path.split('/');
    const name = parts[parts.length - 1].split('.')[0];
    return name.toLowerCase();
};

const imageMap = {};
Object.keys(doctorImagesModules).forEach(path => {
    const key = getFileName(path);
    imageMap[key] = doctorImagesModules[path].default;
});

const getDocImage = (key) => {
    if (!key) return null;
    if (key.startsWith('http') || key.startsWith('data:') || key.startsWith('/uploads')) return key;
    return imageMap[key] || null;
};

// Flattened list for a single view if needed, but categories are better.
// We will apply the 3-color cycle logic across the cards.
const cardColors = ['color-teal', 'color-blue', 'color-orange'];

const doctorsCategories = [
    {
        category: "Senior & Founding Doctors",
        id: "founders",
        doctors: [
            { name: "Dr. Nazeeruddin", qualification: "MBBS, MS, FMAS, FIAGES", role: "Founder & Vice Chairman", speciality: "General & Laparoscopic Surgeon", imageKey: "dr-nazeeruddin" },
            { name: "Dr. Shama Sultana", qualification: "MBBS, DGO, FMAS, DRM (Germany)", role: "Founder & Chairman", speciality: "Obstetrician & Gynecologist", imageKey: "dr-shama-sultana" }
        ]
    },
    {
        category: "Emergency & Critical Care",
        id: "emergency",
        doctors: [
            { name: "Dr. Basheeruddin", qualification: "Anesthetist & Critical Care Specialist", role: "Director", speciality: "Anesthetist", imageKey: "dr-bashiruddin" }
        ]
    },
    {
        category: "Specialists",
        id: "specialists",
        doctors: [
            { name: "Dr. Sambasiva Rao", qualification: "MBBS, MD (General Medicine)", role: "General Physician", speciality: "General Medicine", imageKey: "dr-sambasiva-rao" },
            { name: "Dr. G.V.S. Rahul Reddy", qualification: "MBBS, MS (Ortho)", role: "Orthopaedician", speciality: "Orthopaedics", imageKey: "dr-rahul-reddy" },
            { name: "Dr. M.D. Aslam", qualification: "MD, DM (Nephrology)", role: "Nephrologist", speciality: "Nephrology", imageKey: "dr-aslam" },
            { name: "Dr. Venkateswara Rao", qualification: "MBBS, MS (ENT)", role: "ENT Surgeon", speciality: "ENT", imageKey: "dr-venkateswara-rao" },
            { name: "Dr. Chandrasekhar Rao", qualification: "MBBS, MCh (Neuro)", role: "Brain & Spine Surgeon", speciality: "Neuro Surgery", imageKey: "dr-chandrasekhar-rao" },
            { name: "Dr. P. Nataraj", qualification: "MBBS, MD, DM (Neuro)", role: "Neurology Specialist", speciality: "Neurology", imageKey: "dr-nataraj" },
            { name: "Dr. J. Cornelius", qualification: "MS, MCh (Uro)", role: "Urologist", speciality: "Urology", imageKey: "dr-cornelius" },
            { name: "Dr. Nazma", qualification: "MBBS, MS, MCh", role: "Plastic Surgeon", speciality: "Plastic Surgery", imageKey: "dr-nazma" },
            { name: "Dr. K. Murali Krishna", qualification: "MD, DM (Cardiology)", role: "Interventional Cardiologist", speciality: "Cardiology", imageKey: "dr-murali-krishna" },
            { name: "Dr. L. Durga Kalyan", qualification: "MDS", role: "Maxillofacial Surgeon", speciality: "Maxillofacial Surgery", imageKey: "dr-durga-kalyan" }
        ]
    }
];

const Doctors = () => {
    const [categories, setCategories] = useState(doctorsCategories);

    useEffect(() => {
        const fetchLiveDoctors = async () => {
            const res = await getItems('doctors');
            if (res.success && res.data && res.data.length > 0) {
                const grouped = [
                    { category: "Senior & Founding Doctors", id: "founders", doctors: [] },
                    { category: "Emergency & Critical Care", id: "emergency", doctors: [] },
                    { category: "Specialists", id: "specialists", doctors: [] }
                ];
                res.data.forEach(doc => {
                    let group = grouped.find(g => g.category === doc.category);
                    if (!group) {
                        group = { category: doc.category || "Specialists", id: (doc.category || "specialists").toLowerCase().replace(/[^a-z0-9]/g, '-'), doctors: [] };
                        grouped.push(group);
                    }
                    group.doctors.push({
                        name: doc.name,
                        qualification: doc.qualification,
                        role: doc.role,
                        speciality: doc.speciality,
                        imageKey: doc.image_key
                    });
                });
                setCategories(grouped.filter(g => g.doctors.length > 0));
            }
        };
        fetchLiveDoctors();
    }, []);

    return (
        <div className="doctors-page">
            <div className="page-header" style={{ backgroundImage: 'linear-gradient(rgba(0,95,115,0.9), rgba(0,95,115,0.8)), url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)', backgroundSize: 'cover' }}>
                <div className="container">
                    <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1.2rem', fontWeight: '800', opacity: 1, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <Link to="/" style={{ color: '#00f0ff', textDecoration: 'none' }}>Home</Link>
                        <ChevronRight size={22} />
                        <span>Our Doctors</span>
                    </div>
                    <h1>Meet Our Specialists</h1>
                    <p>Our team of experienced specialists is dedicated to your health.</p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 20px' }}>

                {categories.map((cat, catIndex) => (
                    <div key={cat.id || catIndex} className="doctor-category-section mb-12">
                        <div className="category-header">
                            <h2 className="text-2xl font-bold text-secondary">{cat.category}</h2>
                            <div className="divider"></div>
                        </div>

                        <div className="doctors-grid-3">
                            {cat.doctors.map((doctor, idx) => {
                                const hasImage = !!getDocImage(doctor.imageKey);
                                const colorClass = cardColors[idx % 3]; // Cycle through 3 colors

                                return (
                                    <div key={idx} className={`doctor-card-colored ${colorClass}`}>
                                        <div className="doctor-card-inner">
                                            <div className="doctor-image-wrapper">
                                                {hasImage ? (
                                                    <img src={getDocImage(doctor.imageKey)} alt={doctor.name} />
                                                ) : (
                                                    <div className="placeholder-img">
                                                        <span>{doctor.name.charAt(4)}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="doctor-details">
                                                <h3>{doctor.name}</h3>
                                                <p className="qualification">{doctor.qualification}</p>
                                                <p className="role">{doctor.role}</p>
                                                <span className="speciality-badge">{doctor.speciality}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Doctors;
