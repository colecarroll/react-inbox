import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import ComposeForm from "./components/ComposeForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      compose: false
    };
  }
  async componentDidMount() {
    const response = await fetch(
      "https://hypermedia-api-server.herokuapp.com/api/messages"
    );
    const json = await response.json();
    this.setState({ data: json._embedded.messages });
  }

  async patchItem(item) {
    const response = await fetch(
      "https://hypermedia-api-server.herokuapp.com/api/messages",
      {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
  }

  async createItem(item) {
    const response = await fetch(
      "https://hypermedia-api-server.herokuapp.com/api/messages",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    this.componentDidMount();
  }

  handleStarred = i => {
    var patchUpdate = {
      messageIds: [],
      command: "star",
      star: false
    };
    let newData = this.state.data;
    newData[i].starred = !newData[i].starred;
    patchUpdate.messageIds.push(newData[i].id);
    var starred = newData[i].starred;
    patchUpdate.star = starred;
    this.patchItem(patchUpdate);
    this.setState({ data: newData });
  };

  handleSelected = i => {
    let newData = this.state.data;
    newData[i].selected = !newData[i].selected;
    this.setState({ data: newData });
  };

  handleRead = i => {
    var patchUpdate = {
      messageIds: [],
      command: "read",
      read: false
    };
    let newData = this.state.data;
    newData[i].read = true;
    patchUpdate.messageIds.push(newData[i].id);
    var read = newData[i].read;
    patchUpdate.read = read;
    this.patchItem(patchUpdate);
    this.setState({ data: newData });
  };

  selectAll = e => {
    for (var i = 0; i < this.state.data.length; i++) {
      this.state.data[i].selected = true;
      var data = this.state.data;
    }
    this.setState({ data: data });
  };

  deselectAll = e => {
    for (var i = 0; i < this.state.data.length; i++) {
      this.state.data[i].selected = false;
      var data = this.state.data;
    }
    this.setState({ data: data });
  };

  markAsRead = e => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        if (this.state.data[i].read === false) {
          this.state.data[i].read = true;
        }
      }
    }
    let data = this.state.data;
    var patchUpdate = {
      messageIds: [],
      command: "read",
      read: false
    };
    for (var i = 0; i < data.length; i++) {
      if (data[i].selected) {
        data[i].read = true;
        patchUpdate.messageIds.push(data[i].id);
        patchUpdate.read = true;
      }
    }
    this.patchItem(patchUpdate);
    this.setState({ data: data });
  };

  markAsUnread = e => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        if (this.state.data[i].read === true) {
          this.state.data[i].read = false;
        }
      }
    }
    let data = this.state.data;
    var patchUpdate = {
      messageIds: [],
      command: "read",
      read: false
    };
    for (var i = 0; i < data.length; i++) {
      if (data[i].selected) {
        data[i].read = false;
        patchUpdate.messageIds.push(data[i].id);
        patchUpdate.read = false;
      }
    }
    this.patchItem(patchUpdate);
    this.setState({ data: data });
  };

  deleteMessage = e => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        var patchUpdate = {
          messageIds: [],
          command: "delete"
        };
        patchUpdate.messageIds.push(this.state.data[i].id);
        this.patchItem(patchUpdate);
        this.state.data.splice(i, 1);
      }
    }
    let data = this.state.data;
    this.setState({ data: data });
  };

  applyLabel = e => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        if (e.target.value !== "Apply label") {
          var labelsArr = this.state.data[i].labels;
          var label = e.target.value;
          if (labelsArr.indexOf(label) === -1) {
            labelsArr.push(label);
            var patchUpdate = {
              messageIds: [],
              command: "addLabel",
              label: ""
            };
            patchUpdate.messageIds.push(this.state.data[i].id);
            patchUpdate.label = label;
            this.patchItem(patchUpdate);
          }
        }
      }
    }
    let data = this.state.data;
    this.setState({ data: data });
  };

  removeLabel = e => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected === true) {
        if (e.target.value !== "Remove label") {
          var labelsArr = this.state.data[i].labels;
          var label = e.target.value;
          labelsArr.splice(labelsArr.indexOf(label));
          var patchUpdate = {
            messageIds: [],
            command: "removeLabel",
            label: ""
          };
          patchUpdate.messageIds.push(this.state.data[i].id);
          patchUpdate.label = label;
          this.patchItem(patchUpdate);
        }
      }
    }
    let data = this.state.data;
    this.setState({ data: data });
  };

  unreadCount = () => {
    var unreadCount = 0;
    for (var i = 0; i < this.state.data.length; i++) {
      if (!this.state.data[i].read) {
        unreadCount++;
      }
    }
    return unreadCount;
  };

  messagesSelectedButton = () => {
    var count = 0;
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected) {
        count++;
      }
    }
    if (count === this.state.data.length) {
      return "fa fa-check-square-o";
    } else if (count === 0) {
      return "fa fa-square-o";
    } else {
      return "fa fa-minus-square-o";
    }
  };

  submitMessage(e) {
    e.preventDefault();
    let composedData = {
      subject: e.target.subject.value,
      body: e.target.body.value
    };
    this.createItem(composedData);
  }

  toggleCompose(e) {
    if (this.state.compose === true) {
      this.setState({ compose: false });
    } else {
      this.setState({ compose: true });
    }
  }

  render() {
    return (
      <div className="App">
        <Toolbar
          toggleCompose={this.toggleCompose.bind(this)}
          selectAll={this.selectAll}
          deselectAll={this.deselectAll}
          data={this.state.data}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          deleteMessage={this.deleteMessage}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}
          unreadCount={this.unreadCount}
          messagesSelectedButton={this.messagesSelectedButton}
        />
        {this.state.compose ? (
          <ComposeForm submitMessage={this.submitMessage.bind(this)} />
        ) : null}
        <MessageList
          data={this.state.data}
          toggleStar={this.handleStarred}
          handleSelected={this.handleSelected}
          handleRead={this.handleRead}
        />
      </div>
    );
  }
}

export default App;
