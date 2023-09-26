import "./About.css";

export default function About() {
  return (
    <div className="about">
      <h2 className="about-header">Welcome To Pantry Pal</h2>

      <p>Discover all the potential dish options in your pantry with Pantry Pal, your ultimate recipe finder! Ever found yourself wondering what to cook with the random assortment of ingredients you have on hand? Pantry Pal is here to transform those ingredients into mouthwatering dishes.
      </p>

      <h3 className="about-subheader">How To Use Pantry Pal:</h3>
      
      <p>
       Simply enter the ingredients you have on hand in the searchbar, and Pantry Pal will present you with a curated list of delicious recipes tailored to your pantry's content.
      <br/>
       Fall in love with a dish? Save the recipe with just a click, so you can revisit and cook it anytime you crave it.   
      </p>

      <h3 className="about-subheader">Technological Stack</h3>

      <p>Technologies used, include:</p>
      
      <ol className="tech-stack">
        <div>Spoonacular API</div>
        <div>Mongo DB</div>
        <div>Express</div>
        <div>Node.js</div>
        <div>React</div>
      </ol>

      <ul className="developer">
        <a href="https://www.linkedin.com/in/jamesredden1" className="linkin">James Redden | LinkedIn</a><a href="https://github.com/jaredden1/pantry-pal" className="github-link"> | GitHub Repo</a>
      </ul>
      <br/>
      <footer>&copy; 2023 Pantry Pal</footer>
    </div>
  );
}