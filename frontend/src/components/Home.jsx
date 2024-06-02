import React, { useRef, useEffect } from 'react';
import './style.css'

const Home = ({ setRefs }) => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

 useEffect(() => {
    setRefs({
      home: homeRef,
      about: aboutRef,
      contact: contactRef,
    });
  }, [setRefs]);

  return (
    <div className="content">  
      <div id='home' ref={homeRef} >
        <div className='B'>
        <h4 >
          "يقول ﷺ:  "إن لله تسعة وتسعين اسمًا، من أحصاها دخل الجنة
          <p>
            Prophet Muhammad (ﷺ) said, “Allah has ninety-nine names, i.e. one-hundred minus one, and whoever knows them will go to Paradise.”
          </p>
         
        </h4>
        </div>
        <button className="btn"> <a href="/quiz">Go to the Quiz</a></button>
      </div>
      <section id="about" ref={aboutRef} className='w-full h-screen'>
        <div className="paragh">
          <h2 className="C">About the quiz</h2>
          <p>
            Knowing the names of Allah is of great importance in the Islamic faith, as these names reflect the attributes and majesty of Allah. Understanding and memorizing these names allows believers to strengthen their relationship with God, deepen their spirituality, and find comfort and guidance in their daily lives. It is with this goal in mind that our quiz was created: to offer a fun and interactive way to learn the names of Allah.
          </p>
          <p>
            The quiz on the names of Allah is designed to be flexible and user-friendly. Users can start the quiz at their convenience and are not required to complete it in one session. Thanks to our progress-saving feature, they can log out at any time and return later to continue exactly where they left off. This allows for a more relaxed and personalized learning experience.
          </p>
          <p>
            Our team hopes that this quiz has helped you take the first steps in knowing Allah through His beautiful names. If you have benefited from this site, we kindly ask you to remember our parents in your prayers. For any questions or further assistance, please feel free to contact us.
          </p>
        </div>
      </section>
      <section id="contact" ref={contactRef} className=' '>
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
    </div>
  );
};

export default Home;