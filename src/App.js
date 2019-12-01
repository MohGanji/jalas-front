import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Meeting from "./components/Meeting/Meeting";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Meeting
        title="Some meeting"
        polls={[
          { date: "11 jan 2018 14:30", likes: 2, dislikes: 4 },
          { date: "11 jan 2018 16:30", likes: 4, dislikes: 2 },
          { date: "11 jan 2018 18:30", likes: 6, dislikes: 1 }
        ]}
      />

      {/* see created page */}
      <div className="meeting-container">
        <div className="meeting-title"></div>
        <div className="meeting-time"></div>
        <div className="meeting-location"></div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
