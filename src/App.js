import React, { useState } from "react";
import Home from "./components/Home";
import BirdsList from "./components/BirdsList";

function App() {
  const [showBirds, setShowBirds] = useState(false);

  return (
    <div>
      {!showBirds ? (
        <Home onLoad={() => setShowBirds(true)} />
      ) : (
        <BirdsList onBack={() => setShowBirds(false)} />
      )}
    </div>
  );
}

export default App;

