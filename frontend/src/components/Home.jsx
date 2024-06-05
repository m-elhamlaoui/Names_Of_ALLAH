// Importation de React et des hooks nécessaires
import React, { useRef, useEffect } from 'react';

// Définition du composant fonctionnel Home avec une prop setRefs
const Home = ({ setRefs }) => {
  // Utilisation de useRef pour créer des références aux sections home, about et contact
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Utilisation de useEffect pour mettre à jour les références dès que setRefs change
  useEffect(() => {
    setRefs({
      home: homeRef,
      about: aboutRef,
      contact: contactRef,
    });
  }, [setRefs]);

  // Rendu du composant Home
  return (
    <div className="content h-[300vh] overflow-y-auto">
      {/* Section Home */}
      <div
        id="home"
        ref={homeRef}
        className="className= h-calc(170vh) m-0 p-0 bg-cover flex items-center justify-center flex-col font-sans text-center text-white border border-black sticky top-0 h-screen w-full bg-home bg-cover bg-center bg-fixed flex flex-col justify-center items-center"
      >
        {/* Contenu de la section Home */}
        <div className="bg-[rgba(0,0,0,0.5)] p-[35px] rounded-[15px] bg-black bg-opacity-50 p-9 rounded-lg overflow-auto absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center">
          <h4 className=" mb-[35px] text-[27px]  text-white   font-bold font-serif"> 
            "يقول ﷺ: "إن لله تسعة وتسعين اسمًا، من أحصاها دخل الجنة
            <p>
              Prophet Muhammad (ﷺ) said, "Allah has ninety-nine names, i.e.
              one-hundred minus one, and whoever knows them will go to Paradise."
            </p>
          </h4>
          <button className="bg-transparent" Button>
            <a href="/LOGIN" className="bg-customBrown rounded-[25px] py-[20px] px-[40px] text-black text-[18px] no-underline cursor-pointer border-none shadow-custom-orange">
              Go to the Quiz
            </a>
          </button>
        </div>
      </div>
      
      {/* Section About */}
      <section id="about" ref={aboutRef} className="bg-orange-200 w-full">
        <div className="text-[27px]">
          <h2 className="text-center text-4xl text-customBrown">About the quiz</h2>
          <br />
          <p className="font-serif">
            Knowing the names of Allah is of great importance in the Islamic faith,
            as these names reflect the attributes and majesty of Allah.
            Understanding and memorizing these names allows believers to
            strengthen their relationship with God, deepen their spirituality, and
            find comfort and guidance in their daily lives. It is with this goal
            in mind that our quiz was created: to offer a fun and interactive way
            to learn the names of Allah.
          </p>
          <br />
          <p className="font-serif">
            The quiz on the names of Allah is designed to be flexible and
            user-friendly. Users can start the quiz at their convenience and are
            not required to complete it in one session. Thanks to our
            progress-saving feature, they can log out at any time and return
            later to continue exactly where they left off. This allows for a more
            relaxed and personalized learning experience.
          </p>
          <br />
          <p className="font-serif">
            Our team hopes that this quiz has helped you take the first steps in
            knowing Allah through His beautiful names. If you have benefited
            from this site, we kindly ask you to remember our parents in your
            prayers. For any questions or     assistance, please feel free to contact us.
          </p>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" ref={contactRef} className="bg-orange-200 w-full">
        <div className="p-0 m-0 box-border h-screen flex items-center justify-evenly">
          {/* Formulaire de contact */}
          <form 
            action="https://api.web3forms.com/submit"
            method="POST"
            className="flex flex-col items-center gap-10 "
          >
            <div className="contact-left-title">
              <h2 className="text-center text-4xl text-customBrown">Contact us</h2>
            </div>
            {/* Champ caché pour la clé d'accès */}
            <input
              type="hidden"
              name="access_key"
              value="4ed69df9-05f3-4178-a510-9fe9ae7c34c0"
            />
            {/* Champ de saisie pour le nom */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="h-149px pt-40px rounded-40px placeholder-gray-400 contact-inputs focus:border-4 border-solid border-orange-500 w-400 h-50 border-none outline-none pl-25 font-medium text-black rounded-full"
              required
            />
            {/* Champ de saisie pour l'email */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="h-140px pt-40px rounded-40px placeholder-gray-400 contact-inputs focus:border-4 border-solid border-orange-500 w-400 h-50 border-none outline-none pl-25 font-medium text-black rounded-full"
              required
            />
            {/* Champ de saisie pour le message */}
            <textarea
              name="message"
              placeholder="Your Message"
              className="h-140px pt-40px rounded-lg w-400 border-none outline-none pl-25 font-medium text-black"
              required
            ></textarea>
            {/* Bouton de soumission */}
            <button
              type="submit"
              className="flex items-center justify-center px-30 py-30 text-lg text-white bg-orange-300 rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;