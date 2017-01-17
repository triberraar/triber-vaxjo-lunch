import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Table } from 'react-bootstrap';
import Slider from 'react-slick';

import { getLunches } from '../actions/lunch';
import Lunch from './lunch';

import './lunches.css';

const mapDispatchToProps = dispatch => ({
  getLunches: () => dispatch(getLunches()),
});

class Lunches extends Component {
  componentWillMount() {
    this.props.getLunches();
  }
  componentDidMount() {
    // this.slider.slickGoTo(2);
  
  }
  render() {
    var settings = {
    	dots: true,
      autoplay: false
    }
    return (
    	<div className='lunches'>
      	<Slider ref={(c) => { this.slider = c; }} {...settings}>
          <div><Lunch day={0} /></div>
          <div><Lunch day={1} /></div>
          <div><Lunch day={2} /></div>
          <div><Lunch day={3} /></div>
          <div><Lunch day={4} /></div>
        </Slider>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Lunches);

// class Lunches extends Component {
//   static propTypes = {
//     lunches: React.PropTypes.arrayOf (
//       React.PropTypes.shape({
//         restaurant: React.PropTypes.string.isRequired,
//         lunchItems: React.PropTypes.arrayOf(
//           React.PropTypes.shape({
//             day: React.PropTypes.number,
//             description: React.PropTypes.string,
//             items: React.PropTypes.arrayOf(
//               React.PropTypes.string
//             )
//           }).isRequired
//         )
//       }).isRequired 
//     ).isRequired,
//     getLunches: React.PropTypes.func.isRequired
//   }

//   componentWillMount() {
//     this.props.getLunches();
//   }
//   render() {
//     return (
//       <Table striped bordered condensed hover>
//         <thead>
//           <tr>
//             <th>Restaurant</th>
//             <th>Monday</th>
//             <th>Tuesday</th>
//             <th>Wednesday</th>
//             <th>Thursday</th>
//             <th>Friday</th>
//           </tr>
//         </thead>
//          <tbody>
//             {this.props.lunches.map((lunch, i) => (
//               <Lunch key={i} lunch={lunch} />
//              ))}
//           </tbody>
//       </Table>
//     );
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Lunches);