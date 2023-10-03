import "./Contact.css";

export default function Contact() {

    return (
        <>
          <h2 className="about-subheader">Contact Me</h2>
          <form className="about-contact-form">
            <br />
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Name:"
            />
            <br />
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email:"
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
            <a
              href="https://www.linkedin.com/in/jamesredden1"
              className="linkedin"
            >
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
    )
}