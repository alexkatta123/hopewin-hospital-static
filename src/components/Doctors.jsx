import './Doctors.css';

const doctors = [
    { id: 1, name: 'Dr. John Doe', department: 'General Surgery', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Dr. Jane Smith', department: 'Gynaecology', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Dr. Emily Johnson', department: 'Pediatrics', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 4, name: 'Dr. Michael Brown', department: 'Cardiology', image: 'https://images.unsplash.com/photo-1537368910025-bc008f3416ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

const Doctors = () => {
    return (
        <section id="doctors" className="doctors-section">
            <div className="container">
                <div className="section-title">
                    <h2>Meet Our Doctors</h2>
                    <p>Our team of experienced specialists is dedicated to your health.</p>
                </div>
                <div className="doctors-grid">
                    {doctors.map(doctor => (
                        <div key={doctor.id} className="doctor-card">
                            <div className="doctor-image">
                                <img src={doctor.image} alt={doctor.name} />
                            </div>
                            <div className="doctor-info">
                                <h3>{doctor.name}</h3>
                                <p>{doctor.department}</p>
                                <button className="btn-text">View Profile</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Doctors;
