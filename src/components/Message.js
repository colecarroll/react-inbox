import React from 'react'
import '../App.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
   
  }
  

  render() {

    let classNames = 'row message'
    
    classNames += this.props.message.read === true
      ? ' read' : ' unread'

    if (this.props.message.selected === true) {classNames += ' selected'}

    let isStarred = 'star fa '
    isStarred += this.props.message.starred === true
      ? 'fa-star' : 'fa-star-o'

  



    return (
      
      <div className={classNames}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" onChange = {this.props.onSelect} checked={this.props.message.selected} />
          </div>
          <div className="col-xs-2">
          <i className={isStarred} onClick={this.props.onStar}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
      {this.props.message.labels.map(label => <span className="label label-warning">{label}</span>)}
        <a onClick = {this.props.onRead} href="#">
          {this.props.message.subject}
        </a>
      </div>
      </div>
    )
  }
}

export default Message