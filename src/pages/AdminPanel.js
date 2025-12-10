import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI, clientsAPI, contactAPI, newsletterAPI } from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [message, setMessage] = useState('');

  // Project form
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    image: null
  });

  // Client form
  const [clientForm, setClientForm] = useState({
    name: '',
    description: '',
    designation: '',
    image: null
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [projectsRes, clientsRes, contactsRes, newslettersRes] = await Promise.all([
        projectsAPI.getAll(),
        clientsAPI.getAll(),
        contactAPI.getAll(),
        newsletterAPI.getAll()
      ]);
      setProjects(projectsRes.data.data);
      setClients(clientsRes.data.data);
      setContacts(contactsRes.data.data);
      setNewsletters(newslettersRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000);
  };

  // Project handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', projectForm.name);
      formData.append('description', projectForm.description);
      if (projectForm.image) {
        formData.append('image', projectForm.image);
      }

      await projectsAPI.create(formData);
      showMessage('Project added successfully!');
      setProjectForm({ name: '', description: '', image: null });
      fetchAllData();
    } catch (error) {
      showMessage('Error adding project: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        showMessage('Project deleted successfully!');
        fetchAllData();
      } catch (error) {
        showMessage('Error deleting project');
      }
    }
  };

  // Client handlers
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', clientForm.name);
      formData.append('description', clientForm.description);
      formData.append('designation', clientForm.designation);
      if (clientForm.image) {
        formData.append('image', clientForm.image);
      }

      await clientsAPI.create(formData);
      showMessage('Client added successfully!');
      setClientForm({ name: '', description: '', designation: '', image: null });
      fetchAllData();
    } catch (error) {
      showMessage('Error adding client: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await clientsAPI.delete(id);
        showMessage('Client deleted successfully!');
        fetchAllData();
      } catch (error) {
        showMessage('Error deleting client');
      }
    }
  };

  // Contact handlers
  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.delete(id);
        showMessage('Contact deleted successfully!');
        fetchAllData();
      } catch (error) {
        showMessage('Error deleting contact');
      }
    }
  };

  // Newsletter handlers
  const handleDeleteNewsletter = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await newsletterAPI.delete(id);
        showMessage('Subscription deleted successfully!');
        fetchAllData();
      } catch (error) {
        showMessage('Error deleting subscription');
      }
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') 
      ? imagePath 
      : `http://localhost:5000${imagePath}`;
  };

  return (
    <div className="admin-panel">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-container">
          <h1>Admin Panel</h1>
          <Link to="/" className="back-link">← Back to Landing Page</Link>
        </div>
      </header>

      {message && <div className="admin-message">{message}</div>}

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={activeTab === 'projects' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={activeTab === 'clients' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('clients')}
        >
          Clients
        </button>
        <button
          className={activeTab === 'contacts' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('contacts')}
        >
          Contact Forms
        </button>
        <button
          className={activeTab === 'newsletters' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('newsletters')}
        >
          Newsletter Subscriptions
        </button>
      </div>

      <div className="admin-container">
        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="tab-content">
            <h2>Add New Project</h2>
            <form className="admin-form" onSubmit={handleProjectSubmit}>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files[0] })}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Add Project</button>
            </form>

            <h2 className="list-title">All Projects</h2>
            <div className="data-grid">
              {projects.map((project) => (
                <div key={project._id} className="data-card">
                  <img src={getImageUrl(project.image)} alt={project.name} />
                  <div className="data-card-content">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProject(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="tab-content">
            <h2>Add New Client</h2>
            <form className="admin-form" onSubmit={handleClientSubmit}>
              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Client Description (Testimonial)</label>
                <textarea
                  value={clientForm.description}
                  onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Client Designation</label>
                <input
                  type="text"
                  value={clientForm.designation}
                  onChange={(e) => setClientForm({ ...clientForm, designation: e.target.value })}
                  placeholder="e.g., CEO, Web Developer, Designer"
                  required
                />
              </div>
              <div className="form-group">
                <label>Client Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setClientForm({ ...clientForm, image: e.target.files[0] })}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Add Client</button>
            </form>

            <h2 className="list-title">All Clients</h2>
            <div className="data-grid">
              {clients.map((client) => (
                <div key={client._id} className="data-card">
                  <img src={getImageUrl(client.image)} alt={client.name} />
                  <div className="data-card-content">
                    <h3>{client.name}</h3>
                    <p className="designation">{client.designation}</p>
                    <p>"{client.description}"</p>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteClient(client._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="tab-content">
            <h2>Contact Form Submissions</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>City</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.fullName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.mobileNumber}</td>
                      <td>{contact.city}</td>
                      <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="delete-btn-small"
                          onClick={() => handleDeleteContact(contact._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {contacts.length === 0 && (
                <p className="no-data">No contact submissions yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Newsletters Tab */}
        {activeTab === 'newsletters' && (
          <div className="tab-content">
            <h2>Newsletter Subscriptions</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Email Address</th>
                    <th>Subscription Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletters.map((newsletter) => (
                    <tr key={newsletter._id}>
                      <td>{newsletter.email}</td>
                      <td>{new Date(newsletter.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          className="delete-btn-small"
                          onClick={() => handleDeleteNewsletter(newsletter._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {newsletters.length === 0 && (
                <p className="no-data">No newsletter subscriptions yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
