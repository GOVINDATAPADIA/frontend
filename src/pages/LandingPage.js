import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI, clientsAPI, contactAPI, newsletterAPI } from '../services/api';
import './LandingPage.css';

const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    city: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [contactMessage, setContactMessage] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, clientsRes] = await Promise.all([
        projectsAPI.getAll(),
        clientsAPI.getAll()
      ]);
      setProjects(projectsRes.data.data);
      setClients(clientsRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactAPI.create(contactForm);
      setContactMessage('Thank you! Your message has been sent successfully.');
      setContactForm({ fullName: '', email: '', mobileNumber: '', city: '' });
      setTimeout(() => setContactMessage(''), 5000);
    } catch (error) {
      setContactMessage('Error sending message. Please try again.');
      setTimeout(() => setContactMessage(''), 5000);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await newsletterAPI.subscribe({ email: newsletterEmail });
      setNewsletterMessage('Successfully subscribed to our newsletter!');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterMessage(''), 5000);
    } catch (error) {
      setNewsletterMessage(error.response?.data?.message || 'Error subscribing. Please try again.');
      setTimeout(() => setNewsletterMessage(''), 5000);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') 
      ? imagePath 
      : `http://localhost:5000${imagePath}`;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              {/* Uncomment below to use logo image from public/images/logo.png */}
              {/* <img src="/images/logo.png" alt="Company Logo" style={{ height: '40px' }} /> */}
              <h1>Company Name</h1>
            </div>
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#clients">Clients</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><Link to="/admin" className="admin-link">Admin Panel</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="hero" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%), url(/images/bg.jpg)`
        }}
      >
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Our Company</h1>
            <p className="hero-subtitle">Building Amazing Digital Solutions</p>
            <button className="cta-button">Get Started</button>
          </div>
        </div>
      </section>

      {/* Our Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Our Projects</h2>
          <div className="projects-grid">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="project-card">
                  <div className="project-image">
                    <img src={getImageUrl(project.image)} alt={project.name} />
                  </div>
                  <div className="project-content">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <button className="read-more-btn">Read More</button>
                  </div>
                </div>
              ))
            ) : (
              // Default projects with images from public/images folder
              <>
                {[
                  { img: 'estate1.jpg', name: 'Luxury Villa Project', desc: 'Modern luxury villa with state-of-the-art amenities and stunning architecture.' },
                  { img: 'estate2.jpg', name: 'Commercial Complex', desc: 'Premium commercial space designed for modern businesses and retail outlets.' },
                  { img: 'estate3.jpg', name: 'Residential Towers', desc: 'High-rise residential towers offering spectacular city views and comfort.' },
                  { img: 'estate4.jpg', name: 'Office Building', desc: 'Contemporary office building with cutting-edge facilities and smart technology.' },
                  { img: 'estate5.jpg', name: 'Shopping Mall', desc: 'Spacious shopping destination with diverse retail and entertainment options.' },
                  { img: 'estate6.jpg', name: 'Modern Apartment', desc: 'Stylish apartments with premium finishes and world-class facilities.' }
                ].map((project, index) => (
                  <div key={index} className="project-card">
                    <div className="project-image">
                      <img src={`/images/${project.img}`} alt={project.name} />
                    </div>
                    <div className="project-content">
                      <h3>{project.name}</h3>
                      <p>{project.desc}</p>
                      <button className="read-more-btn">Read More</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Happy Clients Section */}
      <section id="clients" className="clients-section">
        <div className="container">
          <h2 className="section-title">Happy Clients</h2>
          <div className="clients-grid">
            {clients.length > 0 ? (
              clients.map((client) => (
                <div key={client._id} className="client-card">
                  <div className="client-image">
                    <img src={getImageUrl(client.image)} alt={client.name} />
                  </div>
                  <div className="client-content">
                    <p className="client-description">"{client.description}"</p>
                    <h4 className="client-name">{client.name}</h4>
                    <p className="client-designation">{client.designation}</p>
                  </div>
                </div>
              ))
            ) : (
              // Default clients with images from public/images folder
              <>
                {['hp1', 'hp2', 'hp3', 'hp4', 'hp5', 'hp6'].map((hp, index) => (
                  <div key={index} className="client-card">
                    <div className="client-image">
                      <img src={`/images/${hp}.jpg`} alt={`Client ${index + 1}`} />
                    </div>
                    <div className="client-content">
                      <p className="client-description">"Great service and professional team. Highly recommend for any business needs!"</p>
                      <h4 className="client-name">Client {index + 1}</h4>
                      <p className="client-designation">Business Owner</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={contactForm.fullName}
                  onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={contactForm.mobileNumber}
                  onChange={(e) => setContactForm({ ...contactForm, mobileNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="City"
                  value={contactForm.city}
                  onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
            {contactMessage && <p className="message">{contactMessage}</p>}
          </form>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <h2 className="section-title">Subscribe to Our Newsletter</h2>
          <p className="newsletter-text">Stay updated with our latest news and offers</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>
          {newsletterMessage && <p className="message">{newsletterMessage}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
