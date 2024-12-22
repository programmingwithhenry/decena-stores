import { useState, useEffect, useRef } from 'react';
import './App.css';
import friedRiceImage from './fried-rice.jpg';
import carrotImage from './carrot.jpg';
import EggsImage from './eggs.jpg';
import fishesImage from './fishes.jpg';
import pastriesImage from './pastries.jpg';

export default function App() {
  const [showPastries, setShowPastries] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllowDeny, setShowAllowDeny] = useState(false);
  const [showLoginSignup, setShowLoginSignup] = useState(false);

  const handleGetStarted = () => {
    setShowAllowDeny(true); 
    setShowPastries(false); // Reset showPastries to false
  };

  const handleSkip = () => {
    setShowPastries(true);
  };

  const handleAllow = () => {
    setShowLoginSignup(true);
  };

  const handleDeny = () => {
    setShowLoginSignup(false); 
  };

  useEffect(() => {
    if (!showPastries && sliderRef.current) {
      const slider = sliderRef.current;
      const clientWidth = slider.clientWidth; 

      const intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => {
          const nextSlide = (prevSlide + 1) % 4;
          slider.scrollLeft = nextSlide * clientWidth;
          return nextSlide;
        });
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [showPastries]);

  const items = [
    { image: friedRiceImage, alt: "Fried Rice", text: "choose your favorite dishes\nfrom your nearest restaurants and cafes" },
    { image: fishesImage, alt: "Fishes", text: "Get Fresh Sea Foods" },
    { image: carrotImage, alt: "vegetable", text: "Get Fresh Vegetables\nstraight from farm" },
    { image: EggsImage, alt: "crate", text: "Get Eggs & Food stuffs\nstraight from farm." }
  ];

  return (
    <div className="main-container">
      {!showPastries && !showAllowDeny && !showLoginSignup && ( // Display slider initially
        <div className="slider-container" ref={sliderRef}>
          {items.map((item, index) => (
            <div className="item-container" key={index}>
              <div className="gradient-container">
                <img src={item.image} alt={item.alt} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                <p>{item.text}</p>
                <h1>DECENA</h1>
                <h2>services</h2>
                <div className="dots-container"> 
                  {items.map((_, index) => (
                    <div
                      key={index}
                      className={`dot ${currentSlide === index ? 'active' : ''}`}
                    />
                  ))}
                </div>
                <button className="skip-button" onClick={handleSkip}>Skip</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPastries && !showAllowDeny && !showLoginSignup && ( // Display pastries section
        <div className="main-container">
          <div className="item-container">
            <div className="gradient-container">
          <img src={pastriesImage} alt="Delicious pastries" />
          <p>Choose your favorite pastries and snacks.</p>
          <button className="get-started-button" onClick={handleGetStarted}>Get Started</button>
            </div>
          </div>
        </div>
      )}

      {showAllowDeny && !showPastries && !showLoginSignup && ( // Display allow/deny screen on separate page
        <div className="main-container"> 
          <div className="item-container"> 
            <div className="gradient-container">
              <h2>Allow Location Access?</h2>
              <button className="allow-button" onClick={handleAllow}>Allow</button>
              <button className="deny-button" onClick={handleDeny}>Deny</button>
            </div>
          </div>
        </div>
      )}

      {showLoginSignup && ( // Display login/signup screen
        <div className="main-container">
          <div className="item-container">
            <div className="gradient-container">
              <h1>DECENA SERVICES</h1>
              <button className="login-button">LOGIN</button>
              <button className="sign-up-button">SIGN UP</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}