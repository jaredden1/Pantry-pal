import React, { useState } from "react";
import Contact from "../../components/Contact/Contact";
import "./About.css";

export default function About() {
  const [selectedTab, setSelectedTab] = useState("welcome");

  return (
    <div className="about">
      <ul className="about-tabs">
        <li
          onClick={() => setSelectedTab("welcome")}
          className={selectedTab === "welcome" ? "active" : ""}
        >
          Welcome
        </li>
        <li
          onClick={() => setSelectedTab("usage")}
          className={selectedTab === "usage" ? "active" : ""}
        >
          How To Use
        </li>
        <li
          onClick={() => setSelectedTab("tech")}
          className={selectedTab === "tech" ? "active" : ""}
        >
          Tech Stack
        </li>
        <li
          onClick={() => setSelectedTab("contact")}
          className={selectedTab === "contact" ? "active" : ""}
        >
          Contact Me
        </li>
      </ul>

      {selectedTab === "welcome" && (
        <>
          <h2 className="about-header">Welcome To Pantry Pal</h2>
          <p>
            Discover all the potential dish options in your pantry with Pantry
            Pal, your ultimate recipe finder! Ever found yourself wondering what
            to cook with the random assortment of ingredients you have on hand?
            Pantry Pal is here to transform those ingredients into mouthwatering
            dishes.
          </p>
        </>
      )}

      {selectedTab === "usage" && (
        <>
          <h2 className="about-subheader">How To Use Pantry Pal</h2>

          <p>
            Simply enter the ingredients you have on hand in the searchbar, and
            Pantry Pal will present you with a curated list of delicious recipes
            tailored to your pantry's content. Fall in love with a dish? Save
            the recipe with just a click, so you can revisit and cook it anytime
            you crave it.
          </p>
        </>
      )}

      {selectedTab === "tech" && (
        <>
          <h2 className="about-subheader">Technological Stack</h2>
          <ol className="about-tech-stack">
            <p>
              The MERN stack was used to create Pantry Pal, leveraging MongoDB,
              Express.js, React.js, and Node.js. When amalgamated with the
              comprehensive capabilities of the Spoonacular API, this tech stack
              has allowed me to create an application that is not only scalable
              but also has an intuitive user experience that is rich in content
              related to food.
            </p>
            <br />
            <div>Spoonacular API</div>
            <div>Mongo DB</div>
            <div>Express</div>
            <div>Node.js</div>
            <div>React</div>
          </ol>
        </>
      )}

      {selectedTab === "contact" && <Contact />}
    </div>
  );
}
