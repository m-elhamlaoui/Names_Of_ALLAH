import React from 'react';
import '../styles/style3.css'
import '../styles/styles.css'
import '../styles/stype2.css'

const Contact = () => {
  return (
    <section id="contact">
      <div className="contact-container">
        <form action="https://api.web3forms.com/submit" method="POST" className="contact-left">
          <div className="contact-left-title">
            <h2 className="C">Contact us</h2>
          </div>
          <input type="hidden" name="access_key" value="4ed69df9-05f3-4178-a510-9fe9ae7c34c0" />
          <input type="text" name="name" placeholder="Your Name" className="contact-inputs" required />
          <input type="email" name="email" placeholder="Your Email" className="contact-inputs" required />
          <textarea name="message" placeholder="Your Message" className="contact-inputs" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
