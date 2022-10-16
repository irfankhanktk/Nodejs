import { Server } from "socket.io";
var usersList = {};

export const SocketIO = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log('connected new user::', socket.id);

    socket.on("init", (data, error) => {
      try {
        if (!data || !data.id) {
          error && error("id is missing in your request");
          return;
        }
        console.log('data:', usersList);
        usersList = { ...usersList, [socket.id]: { user_id: data.id, email: data.email, socket_id: socket.id } };
        console.log('data:after', usersList);
        // If you want to send to all sockets 
        io.sockets.emit('addUser', usersList);
      } catch (err) {
        console.log('error:::', err);
      }
    });



    socket.on("sendMessage", (data) => {
      try {
        if (!data) {
          // error && error('something went wrong');
          return;
        }
        console.log('data:::', data);
        if(!data.socket_id){
          socket.broadcast.emit('receiveMessage', data);
        }else{
          //If you want to send to a specific user
          socket.broadcast.to(data.socket_id).emit('receiveMessage', data);
        }
      } catch (err) {
        console.log('error:::', err);
      }
    });

    socket.on("leaveGroup", (data) => {
      try {
        if (!data) {
          // error && error('something went wrong');
          return;
        }
        console.log('on leave data:::', data);
        //If you want to send to all sockets except yourself 
        socket.broadcast.emit('onLeaveGroup', data);
      } catch (err) {
        console.log('error:::', err);
      }
    });
    socket.on("joinGroup", (data) => {
      try {
        if (!data) {
          // error && error('something went wrong');
          return;
        }
        console.log('on join data:::', data);
        socket.broadcast.emit('onJoinGroup', data);
      } catch (err) {
        console.log('error:::', err);
      }
    });
    socket.on("likePost", (data) => {
      try {
        if (!data) {
          // error && error('something went wrong');
          return;
        }
        console.log('on like data:::', data);
         //If you want to send to all sockets except yourself 
        socket.broadcast.emit('onLikePost', data);
      } catch (err) {
        console.log('error:::', err);
      }
    });

    socket.on("commentPost", (data) => {
      try {
        if (!data) {
          // error && error('something went wrong');
          return;
        }
        console.log('on comment data:::', data);
         //If you want to send to all sockets except yourself 
         socket.broadcast.emit('onCommentPost', data);
      } catch (err) {
        console.log('error:::', err);
      }
    });

    socket.on("post", (data) => {
      try {
        if (!data) {
          // error && error('something went wrong');
          return;
        }
        console.log('on post data:::', data);
         //If you want to send to all sockets except yourself 
         socket.broadcast.emit('onPost', data);
      } catch (err) {
        console.log('error:::', err);
      }
    });
    //below is forum events
    socket.on("likeForumPost", (data) => {
      try {
        if (!data) {
          // error && error('something went wrong');
          return;
        }
        console.log('on like Forum data:::', data);
         //If you want to send to all sockets except yourself 
        socket.broadcast.emit('onLikeForumPost', data);
      } catch (err) {
        console.log('error:::', err);
      }
    });

    socket.on("commentForumPost", (data) => {
      try {
        if (!data) {
          // error && error('something went wrong');
          return;
        }
        console.log('on comment data:::', data);
         //If you want to send to all sockets except yourself 
         socket.broadcast.emit('onCommentForumPost', data);
      } catch (err) {
        console.log('error:::', err);
      }
    });

    socket.on("forumPost", (data) => {
      try {
        if (!data) {
          // error && error('something went wrong');
          return;
        }
        console.log('on post data:::', data);
         //If you want to send to all sockets except yourself 
         socket.broadcast.emit('onForumPost', data);
      } catch (err) {
        console.log('error:::', err);
      }
    });

    socket.on("disconnect", (data) => {
      try {
        console.log('name:',data);
        console.log('disconnect', socket.id);
        // usersList=usersList.filter(ele=>ele.socket_id!==socket.id);
        delete usersList[socket.id];
        console.log('usersListafter', usersList);
        io.sockets.emit('removeUser', usersList);
      } catch (err) {
        console.log('error:::', err);
        // logger.writeLog(`exception disconnect event catch: ${err}`);
      }
    });
  })
}