import { useRef } from "react";
import emailjs from '@emailjs/browser';
import "./Contact.css";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_drdamsj', 'template_u400f9n', form.current, 'aEGfpsjVO8A23dHoe')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };

  return (
    <>
      <h2 className="about-subheader">Contact Me</h2>
      <form ref={form} onSubmit={sendEmail} className="about-contact-form">
        <br />
        <input 
        type="text" 
        id="name" 
        name="user_name" 
        required placeholder="Name:"
        />
        <br />
        <input
          type="email"
          id="email"
          name="user_email"
          required
          placeholder="Email:"
        />
        <br />
        <input
          id="subject"
          name="subject"
          required
          placeholder="subject:"
        />
        <br />
        <textarea
          id="message"
          name="message"
          required
          placeholder="Message:"
        ></textarea>
        <button type="submit">Send Message</button>
      </form>

      <ul className="about-developer">
        James Redden<> | </>
        <a href="https://www.linkedin.com/in/jamesredden1" className="linkedin">
          LinkedIn
        </a>
        <> | </>
        <a
          href="https://github.com/jaredden1/pantry-pal"
          className="about-github-link"
        >
          GitHub
        </a>
      </ul>
    </>
  );
}
