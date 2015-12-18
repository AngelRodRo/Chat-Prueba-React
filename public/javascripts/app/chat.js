
var Contact = React.createClass({

    selectedContact: function(){
        // if(JSON.parse(localStorage.contacts).length!=0){
        //     var contacts = JSON.parse(localStorage.contacts);
        //     contacts.push(this.props.user);
        // }
        // else {
        //     localStorage.contacts = JSON.stringfy([this.props.user]);
        // }

    },

    render:function(){
        return(
            <li
                className="contact"
                onClick = {this.selectedContact}
            >
                {this.props.name} {this.props.lastname}
            </li>
        );
    }
})


var ContactsList = React.createClass({

    selectedChat: function (user) {
        alert(user)
    },

    render:function() {
      return (
          <div className='users'>
              <h3> Usuarios activos </h3>
              <ul>
                  {
                      this.props.users.map((user, i) => {
                          return (
                              <Contact
                                  key={i}
                                  name={user.name}
                                  lastname={user.lastname}
                                  socket_id={user.socket_id}
                                  email={user.email}
                              ></Contact>
                          );
                      })
                  }
              </ul>
          </div>
      );
    }
});

var Message = React.createClass({
  render() {
      return (
          <div className="message">
              <strong>{this.props.user} :</strong>
              <span>{this.props.text}</span>
              <span>{this.props.date}</span>
          </div>
      );
  }
});
//

var Typing = React.createClass({
    render() {
        return (
            <div className="typing">
                <strong>{this.props.user} :</strong>
                <span> esta escribiendo un mensajes ...</span>
            </div>
        );
    }
});

//
// var MessageList = React.createClass({
//   render() {
//       return (
//           <div className='messages'>
//               <h2> Conversation: </h2>
//               {
//                   this.props.messages.map((message, i) => {
//                       return (
//                           <Message
//                               key={i}
//                               user={message.user}
//                               text={message.text}
//                               date={message.date}
//                           />
//                       );
//                   })
//               }
//           </div>
//       );
//   }
// });
//
//

var MessageForm = React.createClass({

  getInitialState() {
      return {text: ''};
  },

  handleSubmit(e) {
      e.preventDefault();
      var message = {
          email : localStorage.getItem('email'),
          token : localStorage.getItem('token'),
          text : this.state.text
      }
      this.props.onMessageSubmit(message);
      this.setState({ text: '' });
  },

  changeHandler(e) {
      this.setState({ text : e.target.value });
  },

  render() {
      return(
          <div className='message_form'>
              <h3>Nuevo mensajes</h3>
              <form onSubmit={this.handleSubmit}>
                  <input
                      onChange={this.changeHandler}
                      value={this.state.text}
                  />
              </form>
          </div>
      );
  }
});

//
//
// var Chat = React.createClass({
//
//   getInitialState() {
//       return { messages:[], text: '', email:''};
//   },
//
//   componentDidMount() {
//       this.loadHistoryFromServer();
//   },
//
//
//   _messageRecieve(message) {
//       var {messages} = this.state;
//       messages.push(message);
//       this.setState({messages});
//   },
//
//   _userTyping(){
//
//   },
//
//   handleMessageSubmit(message) {
//       var {messages} = this.state;
//       messages.push(message);
//       this.setState({messages});
//       socket.emit('send:message', message);
//   },
//
//
//   loadHistoryFromServer : function(){
//       $.ajax({
//         type : "post",
//         url: this.props.url,
//         dataType: 'json',
//         data : { email : this.props.email  }
//         cache: false,
//         beforeSend : function(xhr) {
//            xhr.setRequestHeader("Authorization", "Basic " + token());
//          },
//         success: function(data) {
//           this.setState({ messages: data});
//         }.bind(this),
//         error: function(xhr, status, err) {
//           console.error(this.props.url, status, err.toString());
//         }.bind(this)
//       });
//   },
//
//   _initialize(data) {
//       var {users, name} = data;
//       this.setState({users, user: name});
//   },
//
//   handleMessageSubmit(message) {
//       var {messages} = this.state;
//       messages.push(message);
//       this.setState({messages});
//       socket.emit('send:message', message);
//   },
//
//   render() {
//       return (
//           <div>
//               <MessageList
//                   messages={this.state.messages}
//               />
//           </div>
//       );
//   }
// });
//
//
var chatList = React.createClass({

    getInitialState: function() {
        return {contacts: [], chats: [], messages: []};
    },

    componentDidMount() {
        socket.on('new message', this._messageRecieve);
        socket.on('new participant', this._userJoined);
        socket.on('left participant', this._userLeft);
        socket.on('typing', this._userTyping);
    },

    _userJoined(data) {
        var {contacts, messages} = this.state;
        contacts.push({
            user: data.name
        });
        this.setState({contacts, messages});
    },

    _userLeft(){

    },

    loadContactsFromServer: function() {
        $.ajax({
          type : "GET",
          url: this.props.url,
          dataType: 'json',
          cache: false,
          beforeSend : function(xhr) {
              xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('token'));
          },
          success: function(data) {
            this.setState({contacts: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },


    render(){
        return (
            <div>
                <UsersList
                    users={this.state.users}
                />
                {
                    this.props.chats.map((chat, i) => {
                        return (
                            <Chat
                                key={i}
                                message={message.user}
                            />
                        );
                    })
                }
                <MessageForm
                  onMessageSubmit={this.handleMessageSubmit}
                  user={this.state.user}
                />
            </div>
        );
    }
})

var ChatList = React.createClass({

    getInitialState: function() {
        return {contacts: [], chats: [], messages: []};
    },

    componentDidMount() {
        this.loadContactsFromServer();
    },

    loadContactsFromServer: function() {
        // $.ajax({
        //   type : "GET",
        //   url: this.props.url,
        //   dataType: 'json',
        //   cache: false,
        //   beforeSend : function(xhr) {
        //       xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('token'));
        //   },
        //   success: function(data) {
        //     this.setState({contacts: data});
        //   }.bind(this),
        //   error: function(xhr, status, err) {
        //     console.error(this.props.url, status, err.toString());
        //   }.bind(this)
        // });

        var {contacts} = this.state;
        contacts.push({
                name : "Angel",
                lastname : "Rodriguez",
                email : "aleangrodriguez123@gmail",
                socket_id : "dakdsadsakdasmdsa"
        });

        this.setState({contacts})

    },


    render:function(){
        return (
            <div>
                <ContactsList
                    users={this.state.contacts}
                />
            </div>
        );
    }
})



ReactDOM.render(<ChatList/>, document.getElementById('app'));
