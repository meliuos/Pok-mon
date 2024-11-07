import React from "react";
import "./index.css";

const ITEMS_PER_PAGE = 12;

function App() {

    return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pokémon Explorer</h1>
          <p className="text-lg text-gray-600">
            Discover and explore your favorite Pokémon
          </p>
        </div>
       </div>
    </div>
  );
}

export default App;