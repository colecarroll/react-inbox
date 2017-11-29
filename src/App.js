import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'

const data =
[
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    }
    
    
    for (var i = 0; i < data.length; i++) {
      data[i].selected = false
     }

    this.selectAll = this.selectAll.bind(this)
  }

  handleStarred = (i) => {
    let newData = this.state.data
    newData[i].starred = !newData[i].starred
    this.setState({data: newData})
  }

  handleSelected = (i) => {
    let newData = this.state.data
    newData[i].selected = !newData[i].selected
    this.setState({data: newData})
  }

  handleRead = (i) => {
    let newData = this.state.data
    newData[i].read = true
    this.setState({data: newData})
  }

 selectAll = (e) => {
    for (var i = 0; i < this.state.data.length; i++){ 
      this.state.data[i].selected = true
      let data = this.state.data
      }
      this.setState({ data: data})
  }

  deselectAll = (e) => {
    for (var i = 0; i < this.state.data.length; i++){ 
      this.state.data[i].selected = false
      let data = this.state.data
      }
      this.setState({ data: data})
  }

  markAsRead = (e) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        if (this.state.data[i].read === false) {
          this.state.data[i].read = true
        }
      }
    }
    let data = this.state.data
    this.setState({ data: data})
  }

  markAsUnread = (e) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        if (this.state.data[i].read === true) {
          this.state.data[i].read = false
        }
      }
    }
    let data = this.state.data
    this.setState({ data: data})
  }


  deleteMessage = (e) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        this.state.data.splice(i, 1)
      }
    }
    let data = this.state.data
    this.setState({ data: data})
  }

  applyLabel = (e) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        if (e.target.value !== 'Apply label') { 
          var labelsArr =this.state.data[i].labels
          var label = e.target.value
          if (labelsArr.indexOf(label) === -1) {
              labelsArr.push(label) 
          }
        }
      }
    }
    let data = this.state.data
    this.setState({ data: data})
  }

  removeLabel = (e) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        if (e.target.value !== 'Remove label') { 
          var labelsArr =this.state.data[i].labels
          var label = e.target.value
             labelsArr.splice(labelsArr.indexOf(label)) 
        }
      }
    }
    let data = this.state.data
    this.setState({ data: data})
  }

   //unread message count
   unreadCount = () => {
    var unreadCount = 0
    for (var i = 0; i < this.state.data.length; i++) {
      if (!this.state.data[i].read) {
        unreadCount++
      }
    }
    return unreadCount
   }

  render() {
    return (
      <div className="App">
        <Toolbar 
        selectAll= {this.selectAll} 
        deselectAll = {this.deselectAll}
        data = {this.state.data} 
        markAsRead = {this.markAsRead}
        markAsUnread = {this.markAsUnread}
        deleteMessage = {this.deleteMessage}
        applyLabel = {this.applyLabel}
        removeLabel = {this.removeLabel}
        unreadCount = {this.unreadCount}
        />
        <MessageList 
        data = {this.state.data} 
        toggleStar = {this.handleStarred}
        handleSelected = {this.handleSelected}
        handleRead = {this.handleRead}
        />
      </div>
    );
  }
}

export default App;
