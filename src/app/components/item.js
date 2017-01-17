import React from 'react';
import uuidV1 from 'uuid/v1';
import { Grid, Jumbotron, Row, Col } from 'react-bootstrap';

export const Item = ({item}) =>
  <span>
    {item.description } {item.description ? ':' : null}
    <ul>
      {item.items.map((item, i) => (
              <li key={i} >{item}</li>
             ))}
    </ul>
  </span>;
