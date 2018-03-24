import React from "react";
import { render } from "react-dom";
import './styles.css';

const App = () => (
  <frosted-glass-container stretch="true">
    <div id="app">
      <frosted-glass overlay-color="#ffffff52" class="nav-container">
        <i className="material-icons left-menu"></i>
        <ul className="nav-content">
          <li>Home</li>
          <li>Our Story</li>
          <li>Services</li>
          <li>Work</li>
          <li>Journal</li>
          <li>Contact</li>
          <button className="nav-cta">Call Us</button>
        </ul>
      </frosted-glass>
      <div className="hero-container">
        <frosted-glass
          overlay-color="#ffffff52"
          blur-amount="25px"
          class="hero-value-add"
        >
          <h1>
            <span className="hero-focus">Frosted Glass</span>
          </h1>
          <div className="hero-details">
            next level street art gastropub flannel keytar sartorial sustainable
            ennui Brooklyn kitsch artisan typewriter
          </div>
          <button className="hero-cta">Order now</button>
        </frosted-glass>
      </div>
      <div className="journal-container" />
      <div className="extra-container-1" />
      <div className="extra-container-2" />
    </div>
  </frosted-glass-container>
);

render(<App />, document.getElementById("root"));
