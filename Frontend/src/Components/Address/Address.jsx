import React, { useState } from 'react';
import './address.css';
import emailjs from 'emailjs-com';

const Address = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send email using EmailJS
    emailjs.sendForm('service_35129nu', 'template_efbj24j', e.target, 'QZBB4D1tzBaChGfhU')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        // Reset form fields after successful submission
        setFormData({ user_name: '', user_email: '', message: '' });
        // Set message sent status to true
        setIsMessageSent(true);
        // Reset message sent status after 3 seconds
        setTimeout(() => setIsMessageSent(false), 3000);
      }, (error) => {
        console.error('Error sending email:', error.text);
      });
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
      {isMessageSent && <p className="success-message">Message sent successfully!</p>}
    </div>
  );
};

export default Address;
