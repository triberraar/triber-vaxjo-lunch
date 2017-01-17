import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidV1 from 'uuid/v1';

import { Item } from './item';
import { Restaurant } from './restaurant';

const mapStateToProps = (state, ownProps) => ({
  restaurant: state.lunches[ownProps.day],
});

const translateDay = day => {
  switch(day) {
    case 0:
      return 'Monday';
    case 1:
      return 'Tuesday';
    case 2:
      return 'Wednesday';
    case 3:
      return 'Thursday';
    case 4:
      return 'Friday';
  }
}

class Lunch extends Component {
  render() {
    return (
      <div>
        <h2>{translateDay(this.props.day)}</h2>
          {this.props.restaurant ? this.props.restaurant.map((restaurant, i) => (
            <Restaurant key={i} restaurant={restaurant} />
          )):null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Lunch);

// export default class Lunch extends Component {
//   static propTypes = {
//     lunch: React.PropTypes.shape({
//       restaurant: React.PropTypes.string.isRequired,
//       lunchItems: React.PropTypes.arrayOf(
//         React.PropTypes.shape({
//           day: React.PropTypes.number,
//           description: React.PropTypes.string,
//           items: React.PropTypes.arrayOf(
//             React.PropTypes.string
//           )
//         }).isRequired
//       )
//     }).isRequired 
//   }

//   getLunch(day) {
//     const returnValue = [];
//     for(const lunchItem of this.props.lunch.lunchItems) {
//       if(lunchItem.day === day || !lunchItem.day) {
//         returnValue.push({description: lunchItem.description, items: lunchItem.items});
//       }
//     }
//     return returnValue;
//   }

//   render() {
//     return (
//       <tr>
//         <td>{this.props.lunch.restaurant}</td>
//         <td>{this.getLunch(0).map((item) => (
//               <Item key={uuidV1()} item={item} />
//              ))}</td>
//         <td>{this.getLunch(1).map((item) => (
//               <Item key={uuidV1()} item={item} />
//              ))}</td>
//         <td>{this.getLunch(2).map((item) => (
//               <Item key={uuidV1()} item={item} />
//              ))}</td>
//         <td>{this.getLunch(3).map((item) => (
//               <Item key={uuidV1()} item={item} />
//              ))}</td>
//         <td>{this.getLunch(4).map((item) => (
//               <Item key={uuidV1()} item={item} />
//              ))}</td>
//       </tr>
//     );
//   }
// }