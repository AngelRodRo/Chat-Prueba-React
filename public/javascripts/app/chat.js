
var Contact = React.createClass({
    selectedContact: function(){
        var data = {
            name : this.props.name,
            lastname : this.props.lastname,
            email : this.props.email,
            socket_id : this.props.socket_id
        }
        this.saveSelectedContact(data);
        this.saveLastContacts(data);
        this.props.onHandleChat();
    },

    findContact : function(contacts,data){
        for (var i = 0; i < contacts.length; i++) {
            if(contacts[i].email=data.email) return true;
        }
        return false;
    }

    saveSelectedContact:function(data){
        localStorage.selectedContact = JSON.stringify(data);
    },
    saveLastContacts : function(data){
        if(!localStorage.lastContacts){
            var lastContacts = [];
            lastContacts.push(data);
            localStorage.lastContacts = lastContacts;
        }
        else {
            var _lastContacts = JSON.parse(localStorage.lastContacts);

            if(!this.findContact(_lastContacts,data))
            {
                _lastContacts.push(data);
                localStorage.lastContacts = JSON.stringify(_lastContacts);
            }
        }
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

    changeChat(user){
        this.prop.alternChat(user);
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
                                  onHandleChat={this.changeChat(user)}
                              ></Contact>
                          );
                      })
                  }
              </ul>
          </div>
      );
    }
});

// var Message = React.createClass({
//     render() {
//       return (
//           <div className="message">
//               <strong>{this.props.user} :</strong>
//               <span>{this.props.text}</span>
//               <span>{this.props.date}</span>
//           </div>
//       );
//     }
// });
// //
//
// var Typing = React.createClass({
//     render() {
//         return (
//             <div className="typing">
//                 <strong>{this.props.name} {this.prop.lastname} :</strong>
//                 <span> esta escribiendo un mensajes ...</span>
//             </div>
//         );
//     }
// });

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

// var MessageForm = React.createClass({
//
//   getInitialState() {
//       return {text: ''};
//   },
//
//   handleSubmit(e) {
//       e.preventDefault();
//       var message = {
//           email : localStorage.getItem('email'),
//           token : localStorage.getItem('token'),
//           text : this.state.text
//       }
//       this.props.onMessageSubmit(message);
//       this.setState({ text: '' });
//   },
//
//   changeHandler(e) {
//       this.setState({ text : e.target.value });
//   },
//
//   render() {
//       return(
//           <div className='message_form'>
//               <h3>Nuevo mensajes</h3>
//               <form onSubmit={this.handleSubmit}>
//                   <input
//                       onChange={this.changeHandler}
//                       value={this.state.text}
//                   />
//               </form>
//           </div>
//       );
//   }
// });


// var Chat = React.createClass({
//
//     getInitialState() {
//         return { messages:[], text: '', email:''};
//     },
//
//     componentDidMount() {
//         this.loadHistoryFromServer();
//     },
//
//     _messageRecieve(data) {
//         var {messages} = this.state;
//         messages.push(message);
//         this.setState({messages});
//     },
//
//     _userTyping(){
//
//     },
//
//     handleMessageSubmit(message) {
//         var {messages} = this.state;
//         messages.push(message);
//         this.setState({messages});
//         socket.emit('send:message', message);
//     },
//
//
//     loadHistoryFromServer : function(){
//         $.ajax({
//             type : "post",
//             url: this.props.url,
//             dataType: 'json',
//             data : { email : this.props.email  }
//             cache: false,
//             beforeSend : function(xhr) {
//                 xhr.setRequestHeader("Authorization", "Basic " + token());
//             },
//             success: function(data) {
//                 this.setState({ messages: data});
//             }.bind(this),
//             error: function(xhr, status, err) {
//                 console.error(this.props.url, status, err.toString());
//             }.bind(this)
//         });
//     },
//
//     handleMessageSubmit(message) {
//         var {messages} = this.state;
//         messages.push(message);
//         this.setState({messages});
//         socket.emit('new message', message);
//     },
//
//     render() {
//       return (
//           <div>
//               <MessageList
//                   messages={this.state.messages}
//               />
//           </div>
//       );
//     }
// });

var TabChatList = React.createClass({
    render(){
        return(
            <ul className="TabChatList">
                {
                    this.props.users.map((user, i) => {
                        return (
                            <TabChat
                                key={i}
                                name={user.name}
                                lastname={user.lastname}
                                socket_id={user.socket_id}
                                email={user.email}
                            ></TabChat>
                        );
                    })
                }
            </ul>
        )
    }
});
//
var TabChat = React.createClass({
    render(){
        return(
            <li className="tabChat">
                {this.props.name} {this.props.lastname}
            </li>
        )
    }
})

// var chatList = React.createClass({
//
//     getInitialState: function() {
//         return {contacts: [], chats: [], messages: []};
//     },
//
//     componentDidMount() {
//         socket.on('new message', this._messageRecieve);
//         socket.on('new participant', this._userJoined);
//         socket.on('left participant', this._userLeft);
//         socket.on('typing', this._userTyping);
//     },
//
//     _userJoined(data) {
//         var {contacts, messages} = this.state;
//         contacts.push({
//             name: data.name,
//             lastname : data.lastname
//         });
//         this.setState({contacts, messages});
//     },
//
//     _userLeft(){
//         var {contacts} = this.state;
//     },
//
//     loadContactsFromServer: function() {
//         $.ajax({
//           type : "GET",
//           url: this.props.url,
//           dataType: 'json',
//           cache: false,
//           beforeSend : function(xhr) {
//               xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('token'));
//           },
//           success: function(data) {
//             this.setState({contacts: data});
//           }.bind(this),
//           error: function(xhr, status, err) {
//             console.error(this.props.url, status, err.toString());
//           }.bind(this)
//         });
//     },
//
//
//     render(){
//         return (
//             <div>
//                 <UsersList
//                     users={this.state.users}
//                 />
//                 {
//                     this.props.chats.map((chat, i) => {
//                         return (
//                             <Chat
//                                 key={i}
//                                 message={message.user}
//                             />
//                         );
//                     })
//                 }
//                 <MessageForm
//                   onMessageSubmit={this.handleMessageSubmit}
//                   user={this.state.user}
//                 />
//             </div>
//         );
//     }
// })

var ChatList = React.createClass({

    getInitialState: function() {
        return {contacts: [], chats: [], messages: [], selectedContact: '', lastContacts:[]};
    },

    getSelectedContact(){
        if(localStorage.selectedContact) this.state.selectedContact = JSON.parse(localStorage.selectedContact)
    },

    getLastContacts(){
        if(localStorage.lastContacts) this.state.lastContacts = JSON.parse(localStorage.lastContacts)
    },

    componentDidMount() {
        this.getSelectedContact();
        this.getLastContacts();
        this.loadContactsFromServer();
    },

    changeChat(){

    },
    loadContactsFromServer: function() {
        $.ajax({
          type : "GET",
          url: this.props.url,
          dataType: 'json',
          cache: false,
          beforeSend : function(xhr) {
              xhr.setRequestHeader("Authorization", "Basic " + localStorage.token);
          },
          success: function(data) {
            this.setState({contacts: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
        // var {contacts} = this.state;
        // contacts.push({
        //         name : "Angel",
        //         lastname : "Rodriguez",
        //         email : "aleangrodriguez123@gmail",
        //         socket_id : "dakdsadsakdasmdsa"
        // });
        //
        // this.setState({contacts})

    },


    render:function(){
        return (

            <TabChatList
                users={this.state.lastContacts}
            >
            </TabChatList>

            <ContactsList
                users={this.state.contacts}
                alternChat = {this.}
                ></ContactsList>
        );
    }
})
//


// var ChatApp = React.createClass({
//     getInitialState(){
//
//     },
//     render(){
//         return (
//             <div>
//                 <TabChatList
//                     users={this.state.contactsSelected}
//                 />
//                 <ContactsList
//                     users={this.state.contacts}
//                 />
//                 <ChatList
//                     chat={this.state.chats}
//                 />
//                 <MessageForm
//                 />
//             </div>
//         );
//     }
// })


ReactDOM.render(<ChatList/>, document.getElementById('app'));
