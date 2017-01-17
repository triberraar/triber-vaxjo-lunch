import React from 'react';

export const Restaurant = ({restaurant}) =>
  <div>
    <h3>{restaurant.name}</h3>
    <ul>
      {restaurant.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>;

