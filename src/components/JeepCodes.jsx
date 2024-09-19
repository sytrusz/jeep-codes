import React, { useState } from 'react';

const jeepRoutes = {
  "01A": ["Alpha", "Bravo", "Charlie", "Echo", "Golf"],
  "02B": ["Alpha", "Delta", "Echo", "Foxtrot", "Golf"],
  "03C": ["Charlie", "Delta", "Foxtrot", "Hotel", "India"],
  "04A": ["Charlie", "Delta", "Echo", "Foxtrot", "Golf"],
  "04D": ["Charlie", "Echo", "Foxtrot", "Golf", "India"],
  "06B": ["Delta", "Hotel", "Juliet", "Kilo", "Lima"],
  "06D": ["Delta", "Foxtrot", "Golf", "India", "Kilo"],
  "10C": ["Foxtrot", "Golf", "Hotel", "India", "Juliet"],
  "10H": ["Foxtrot", "Hotel", "Juliet", "Lima", "November"],
  "11A": ["Foxtrot", "Golf", "Kilo", "Mike", "November"],
  "11B": ["Foxtrot", "Golf", "Lima", "Oscar", "Papa"],
  "20A": ["India", "Juliet", "November", "Papa", "Romeo"],
  "20C": ["India", "Kilo", "Lima", "Mike", "Papa", "Romeo"],
  "42C": ["Juliet", "Kilo", "Lima", "Mike", "Oscar"],
  "42D": ["Juliet", "November", "Oscar", "Quebec", "Romeo"]
};

const validateJeepCode = (codes) => {
  const regex = /^(\d{2}[A-Z])(,\d{2}[A-Z])*$/;
  return regex.test(codes);
};

const JeepCodes = () => {
  const [input, setInput] = useState('');
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setRoutes([]);
    setError('');

    if (!validateJeepCode(input)) {
      setError('Invalid Input!');
      return;
    }

    const codes = input.split(',');
    const result = codes.map((code) => ({
      code,
      places: jeepRoutes[code] || []
    }));

    setRoutes(result);
  };

  const findCommonPlaces = (allRoutes) => {
    const common = {};

    allRoutes.forEach(({ places }, i) => {
      places.forEach((place) => {
        if (!common[place]) {
          common[place] = new Set();
        }
        common[place].add(i);
      });
    });

    return common;
  };

  const renderRoutes = () => {
    const commonPlaces = findCommonPlaces(routes);

    return routes.map(({ code, places }, routeIndex) => (
      <div key={code} style={{ marginBottom: '10px', color:'black'}}>
        <strong style={{ fontSize: '1.2rem' }}>{code}</strong> ={' '}
        {places.map((place, index) => {
          let style = {};
          if (commonPlaces[place].size > 1) {
            const commonRouteIndices = [...commonPlaces[place]];
            const color = routeIndex === commonRouteIndices[0] ? 'red' : 'blue';
            const bgColor = routeIndex === commonRouteIndices[0] ? '#f2d7d5' : '#d6eaf8';
            style = { color, backgroundColor: bgColor, padding: '0 5px' };
          }
          return (
            <span key={index} style={style}>
              {place} {index < places.length - 1 && ' <-> '}
            </span>
          );
        })}
      </div>
    ));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', margin: '20px auto', padding: '20px', maxWidth: '600px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#EDE8DC' }}>
      <h1 style={{ fontSize: '2rem', color: 'black', marginBottom: '5px' }}>Jeep Code Route Finder</h1>
      <h4 style={{ color: '#2980b9', marginTop:'5px', marginBottom: '20px' }}>Sample Input (e.g. 01A,03C,06B)</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Jeep Code Here"
          style={{ width: '80%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ backgroundColor: '#2ecc71', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }}>
          Find Route
        </button>
      </form>
      {error && <p style={{ color: 'black', fontWeight: 'bold' }}>{error}</p>}
      <div style={{ marginTop: '20px', textAlign: 'left', backgroundColor:'#C1CFA1' }}>
        {routes.length > 0 && renderRoutes()}
      </div>
    </div>
  );
};

export default JeepCodes;
