import React from 'react'
import '../App.css';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }


  render () {

  
   for (var i = 0; i < this.props.data.length; i++ ) {
      if (!this.props.data[i].selected) {
        var manageClick = this.props.selectAll
      }
      else {
        var manageClick = this.props.deselectAll
      }
    }

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button onClick= {manageClick} className="btn btn-default">
            <i className="fa fa-minus-square-o"></i>
          </button>

          <button onClick = {this.props.markAsRead} className="btn btn-default">Mark As Read</button>

          <button onClick = {this.props.markAsUnread}className="btn btn-default">Mark As Unread</button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar