import React from 'react';
import NumberFormatter from '../../utils/NumberFormatter.js';

class Stat extends React.Component {

  render() {
    let description = !this.props.description ? '' : (
      <small className="stat-description">{this.props.description}</small>
    );

    let statClassName = 'stat' + (description ? ' with-stat-description' : '');

    return (
      <div className={statClassName}>
        <div className="stat-icon">
          <span className={this.props.icon}> </span>
        </div>
        <div>
          <h2>{NumberFormatter.format(this.props.count)}</h2>
          <h4>{this.props.name} {description}</h4>
        </div>
      </div>
    );
  }
}

Stat.propTypes = {
  icon: React.PropTypes.string.isRequired,
  count: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired
};

export default Stat;
