import React from 'react';
import { Grid, Jumbotron, Row, Col } from 'react-bootstrap';

import Lunches from './components/lunches';

export const App = () =>
  <div>
    <Jumbotron>
      <Grid>
        <h1>Lunches in Växjö</h1>
      </Grid>
    </Jumbotron>
    <Grid>
      <Row>
        <Col sm={1} />
        <Col sm={10}>
          <Lunches />
        </Col>
        <Col sm={1} />
      </Row>
    </Grid>
  </div>;

export default App;
