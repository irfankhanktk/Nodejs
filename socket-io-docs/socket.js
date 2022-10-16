const io = require("socket.io"),
  socketUsers = require("./userAndgroupRooms"),
  socketRooms = require("./rooms"),
  config = require("../config/common.config"),
  logger = require("./loggerMiddleware"),
  conversations = require("../models/conversation.model"),
  callmetaData = require("../models/callMetaData.model"),
  messages = require("../models/messages.model"),
  deletedMessages = require("../models/deletedMessages.model"),
  groupInfo = require("../models/group.model"),
  groupKeys = require("../models/groupKey.model"),
  apiService = require("../libraries/api.service"),
  fileLogger = require("../libraries/logFiles"),
  queueMessages = require("./queueMessagesSocket"),
  moment = require("moment"),
  twilio = require("twilio")(config.twillioSid, config.twillioAuth);

class SocketClass {
  constructor(server) {
    io({
      path: "/bridge",
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 60000,
    })
      .listen(server, {
        log: true,
      })
      .on("connection", this.initSocket);
  }

  initSocket(socket) {
    let connectedUserCount = 0;
    let remaingTodaySmsCount = 0;
    let remaingTodayCallCount = 0;
    let user;
    const savingDuration = 30 * 1000;
    let id;
    let myRoomId;
    let myInfo = {
      userNumber: "",
      last_changed: "",
      last_delivered: "",
      on_screen: "",
      state: "offline",
      typing: {
        typing: false,
      },
    };
    socket

      .on("init", (data, callback) => {
        // deviceToken,isReadReceiptOn,name,publicKey,profileImage,xPalNumber
        try {
          if (!data || !data.id) {
            callback && callback("id is missing in your request");
            return;
          }

          id = data.id;
          myInfo.userNumber = id;
          socketUsers.create(socket, data.id);
          createRoom(id, myInfo, (id) => {
            myRoomId = id;
            myInfo.state = "online";
            socket.to(myRoomId).emit("realTimePresence", myInfo);
          });
          user = data;

          updateUserStatus(true, data.id);

          fileLogger.logFile(`${id} connected with socket`);
          logger.writeLog(`init called:  ${id}`);

          // For Admin
          // connectedUserCount++;
          // socket.emit('userAdded', { connectedUserCount: connectedUserCount });

          socket.emit("init", { id: id });
          callback && callback({ id: id });
          fileLogger.logFile(`callback send to ${id}`);
        } catch (err) {
          logger.writeLog(`exception init event catch: ${err}`);
        }
      })

      .on("getToken", () => {
        try {
          twilio.tokens.create((err, response) => {
            if (err) {
              logger.writeLog(`create token error:  ${err}`);
            } else {
              socket.emit("getToken", { id: id, token: response });
            }
          });
        } catch (err) {
          logger.writeLog(`exception get token event catch: ${err}`);
        }
      })

      .on("joinFriendsRoom", (data, callback) => {
        // data = friendNumber

        try {
          if (id == data.friendNumber) {
            callback && callback(`friend number and your id is same room`);
            return;
          }
          if (!data.friendNumber) {
            callback && callback(`friend number is missing`);
            return;
          }

          let roomId = socketRooms.get(data.friendNumber);
          if (roomId) {
            logger.writeLog(`user ${id} joined the ${roomId.id} room`);
            socket.join(roomId.id);
            callback && callback(`user ${id} joined the ${roomId.id} room`);
          }

          // check if friend did not joined your room then he will also join
          let friendsSocket = socketUsers.get(data.friendNumber);
          if (friendsSocket) {
            friendsSocket.join(myRoomId);
            logger.writeLog(
              `user ${data.friendNumber} joined the ${myRoomId} room`
            );
            callback &&
              callback(`user ${data.friendNumber} joined the ${myRoomId} room`);
          } else {
            callback &&
              callback(`user ${data.friendNumber} is not connected on socket`);
          }
        } catch (err) {
          logger.writeLog(`exception joinFriendsRoom event catch: ${err}`);
        }
      })

      .on("updateFriendInfo", (data, callback) => {
        try {
          if (!data.to) {
            callback && callback("to is missing in data");
            return;
          }
          const receiver = socketUsers.get(data.to);
          if (receiver) {
            receiver.emit("updateFriendInfo", data);
          }
        } catch (err) {
          logger.writeLog(`exception updateFriendInfo event catch: ${err}`);
        }
      })

      .on("updateUserInfo", (data, callback) => {
        try {
          if (!myRoomId) {
            createRoom(id, myInfo, (id) => {
              myRoomId = id;
              logger.writeLog(
                `updateUserInfo:  ${id} now emtting to room ${myRoomId} , data: ${JSON.stringify(
                  data
                )}`
              );
              socket.to(myRoomId).emit("listenRealTimeUserUpdate", data);
              callback &&
                callback(
                  `${id} emit listenRealTimeUserUpdate and roomId is ${myRoomId}`
                );
            });
          } else {
            logger.writeLog(
              `updateUserInfo:  ${id} now emtting to room ${myRoomId} , data: ${JSON.stringify(
                data
              )}`
            );
            socket.to(myRoomId).emit("listenRealTimeUserUpdate", data);
            callback &&
              callback(
                `${id} emit listenRealTimeUserUpdate and roomId is ${myRoomId}`
              );
          }
        } catch (err) {
          logger.writeLog(`exception updateUserInfo event catch: ${err}`);
        }
      })

      .on("updateUserRealTimeInfo", (data, callback) => {
        try {
          if (!data.from) {
            callback && callback("from is missing in data");
            return;
          }
          if (!myRoomId) {
            createRoom(id, myInfo, (id) => {
              myRoomId = id;
              logger.writeLog(`updateUserRealTimeInfo_:  ${id} now emtting to room ${myRoomId}`);
              socket
                .to(myRoomId)
                .emit(`updateUserRealTimeInfo_${data.from}`, data);
              socket
                .to(myRoomId)
                .emit(`updateUserRealTimeInfo`, data);

              callback && callback(`updateUserRealTimeInfo_${data.from}`);
            });
          } else {
            logger.writeLog(`updateUserRealTimeInfo_:  ${id} now emtting to room ${myRoomId}`);
            socket
              .to(myRoomId)
              .emit(`updateUserRealTimeInfo_${data.from}`, data);
            socket
              .to(myRoomId)
              .emit(`updateUserRealTimeInfo`, data);
            callback && callback(`Emitt to another user`);
          }
        } catch (err) {
          callback && callback(`updateUserRealTimeInfo_ event catch: ${err}`);
          logger.writeLog(
            `exception updateUserRealTimeInfo_ event catch: ${err}`
          );
        }
      })

      .on("online", (data, callback) => {
        try {
          if (!data.id) {
            callback && callback("id is missing in data");
            return;
          }

          if (!myRoomId) {
            createRoom(id, myInfo, (id) => {
              myRoomId = id;
              myInfo.last_delivered = myInfo.last_changed = Date.now();
              myInfo.state = "online";
              fileLogger.logFile(`${id} is online`);
              logger.writeLog(
                `online user:  ${data.id
                } now emtting to room ${myRoomId} , data: ${JSON.stringify(
                  myInfo
                )}`
              );
              socket.to(myRoomId).emit("realTimePresence", myInfo);
            });
          } else {
            myInfo.last_delivered = myInfo.last_changed = Date.now();
            myInfo.state = "online";
            fileLogger.logFile(`${id} is online`);
            logger.writeLog(
              `online user:  ${data.id
              } now emtting to room ${myRoomId} , data: ${JSON.stringify(
                myInfo
              )}`
            );
            socket.to(myRoomId).emit("realTimePresence", myInfo);
          }
        } catch (err) {
          logger.writeLog(`exception online event catch: ${err}`);
        }
      })

      .on("offline", (callback) => {
        try {
          logger.writeLog(`offline called by user`);
          logger.writeLog(`offline called by user ${id}`);
          if (!myRoomId) {
            createRoom(id, myInfo, (id) => {
              myInfo.last_delivered = myInfo.last_changed = Date.now();
              myInfo.state = "offline";
              socket.to(myRoomId).emit("realTimePresence", myInfo);
              socketUsers.remove(id);
              callback && callback(`${id} is offline now`);
            });
          } else {
            myInfo.last_delivered = myInfo.last_changed = Date.now();
            myInfo.state = "offline";
            socket.to(myRoomId).emit("realTimePresence", myInfo);
            socketUsers.remove(id);
            callback && callback(`${id} is offline now`);
          }

          fileLogger.logFile(`${id} is offline`);
          updateUserStatus(false, id);
          updateMessagesCount(remaingTodaySmsCount, id);
          updateCallCount(remaingTodayCallCount, id);
        } catch (err) {
          logger.writeLog(`exception offline envent catch: ${err}`);
        }
      })

      .on("offlineWeb", (callback) => {
        try {
          if (!myRoomId) {
            createRoom(id, myInfo, () => {
              myInfo.last_delivered = myInfo.last_changed = Date.now();
              myInfo.state = "offline";
              socket.to(myRoomId).emit("realTimePresence", myInfo);
            });
          } else {
            myInfo.last_delivered = myInfo.last_changed = Date.now();
            myInfo.state = "offline";
            socket.to(myRoomId).emit("realTimePresence", myInfo);
          }

          fileLogger.logFile(`${id} is offlineWeb`);
          updateUserStatus(false, id);
          updateMessagesCount(remaingTodaySmsCount, id);
          updateCallCount(remaingTodayCallCount, id);
          callback && callback("offlineweb worked! ");
        } catch (err) {
          logger.writeLog(`exception offlineWeb envent catch: ${err}`);
        }
      })

      .on("disconnect", () => {
        try {
          // For Admin
          // connectedUserCount--;
          // socket.emit("userRemoved", {
          //   connectedUserCount: connectedUserCount,
          // });

          logger.writeLog(`disconnect user: ${id}`);

          updateMessagesCount(remaingTodaySmsCount, id);
          updateCallCount(remaingTodayCallCount, id);

          myInfo.last_delivered = myInfo.last_changed = Date.now();
          myInfo.state = "offline";
          socket.to(myRoomId).emit("realTimePresence", myInfo);

          // Check if user have active call then disconnect
          if (id) {
            updateUserStatus(false, id);
            getActiveCall(id, (res) => {
              logger.writeLog(
                `getActiveCall: ${id} responce ${JSON.stringify(res)}`
              );
              if (res && res[0]) {
                let callReceiver =
                  res[0][0].from == userId ? res[0].receiver : res[0].from;
                logger.writeLog(
                  `getActiveCall : ${id} and call receiver ${callReceiver}`
                );
                if (callReceiver) {
                  const receiver = socketUsers.get(callReceiver);
                  receiver.emit("onconfigchange", {
                    action: "CALL_FINISHED",
                    to: callReceiver,
                    data: null,
                  });
                }
              }
            });
          }

          socketUsers.remove(id);
        } catch (err) {
          logger.writeLog(`exception disconnect event catch: ${err}`);
        }
      })

      .on("deviceChanged", (data, callback) => {

        logger.writeLog(
          `deviceChanged: ${data.to} and data ${JSON.stringify(data)}`)

        const receiver = socketUsers.get(data.to);
        if (receiver) {
          logger.writeLog(
            `deviceChanged event send to ${data.to} from ${id} type deviceChanged`
          );
          receiver.emit("deviceChanged", data);
          callback && callback("realtime event send to other user");
        }
        else {
          updateIsDeleteData(data.isDeleteData, data.from);
          callback && callback("deviceChanged realtime event not delivered, othere user not connected");
        }
      })

      .on("convoConfig", (data, callback) => {
        // data = type,to,convo object(object)
        // type = create, deleteForEveryOne, reversePinTriggered,allow_communication,deviceChanged

        try {
          // Delete chats from friend side

          logger.writeLog(
            `convoConfig called: ${data.type}`
          );

          if (data && data.type == "deviceChanged") {
            const receiver = socketUsers.get(data.to);
            if (receiver) {
              logger.writeLog(
                `new conversation event send to ${data.to} from ${id} type deviceChanged`
              );
              receiver.emit("convoConfig", data);
              callback && callback("realtime event send to other user");
            }
            else {
              callback && callback("realtime event not delivered, othere user not connected");
            }
            return;
          }

          if (data && data.type == "reversePinTriggered") {
            if (!myRoomId) {
              if (!data.from) {
                callback && callback("from in data is missing in data");
                return;
              }

              createRoom(id, myInfo, (id) => {
                myRoomId = id;
                logger.writeLog(
                  `convoConfig from:  ${data.from} reversePinTriggered Emit`
                );
                socket.to(myRoomId).emit("convoConfig", data);
                conversations.deleteAllMyConversations(data.from, () => { });
                callback && callback(`event triggered, my Id: ${myRoomId}`);
              });
            } else {
              if (!data.from) {
                callback && callback("from in data is missing in data");
                return;
              }

              logger.writeLog(
                `convoConfig from:  ${data.from} reversePinTriggered Emit`
              );
              socket.to(myRoomId).emit("convoConfig", data);
              conversations.deleteAllMyConversations(data.from, () => { });
              callback && callback(`event triggered, my Id: ${myRoomId}`);
            }

            callmetaData.deleteAllMyCallRecord(id);
          } else {
            if (!data.to) {
              callback && callback("to in data is missing in data");
              return;
            }
            const receiver = socketUsers.get(data.to);
            if (receiver) {
              logger.writeLog(
                `new conversation event send to ${data.to} from ${id}`
              );
              receiver.emit("convoConfig", data);
              callback && callback("realtime event send to other user");
            }
            if (data && data.type == "create") {
              processNewConversation(data.conversation, callback);
            } else if (data && data.type == "deleteForEveryOne") {
              if (data.conversation && data.conversation.chatId) {
                logger.writeLog(
                  `deleteForEveryOne: ${data.conversation.chatId} is deleteing for everyone`
                );
                processDeleteConversation(data.conversation.chatId, callback);
              }
            }
          }
        } catch (err) {
          logger.writeLog(`exception convoConfig event catch: ${err}`);
        }
      })

      .on("chatRecreateConfig", (data, callback) => {
        // data.to
        try {
          logger.writeLog(`chatRecreateConfig called ${data}`);

          if (!data || !data.to) {
            callback && callback("chatRecreateConfig send to and chatId");
            return;
          }

          const receiver = socketUsers.get(data.to);
          if (receiver) {
            logger.writeLog(`chatRecreateConfig receiver ${id} available and data ${data}`);
            receiver.emit("chatRecreateConfig", data);
            callback && callback(`chatRecreateConfig emit to receiver ${id}`);
          }
        }
        catch (err) {
          callback && callback(`chatRecreateConfig emit to receiver ${id}`);
          logger.writeLog(`exception chatRecreateConfig: ${err}`);
        }

      })

      .on("chatConfig", (chatData, callback) => {
        // data = remaingTodaySmsCount, type,to,chat object(object)
        // type = create,fetch_messages,received_ack,unmount_chat

        try {

          if (!chatData || chatData === undefined) {
            callback && callback("chatConfig data send data object");
            return;
          }

          logger.writeLog(`chatConfig data here type is ${chatData.type} and id of user = ${id}`);

          if (chatData && chatData.type == 'allow_communication') {
            const receiver = socketUsers.get(chatData.to);
            if (receiver) {
              logger.writeLog(
                `chatConfig event send to ${chatData.to} from ${id} type allow_communication`
              );
              // for app
              receiver.emit(`chatConfig_${chatData.conversationId}`, chatData);
              // for web
              receiver.emit("chatConfig", chatData);
              callback && callback("realtime event send to other user");
            }
            else {
              logger.writeLog(`chatConfig event send to ${chatData.to} from ${id} type allow_communication and receiver is offline`);
              callback && callback("receiver not available");
            }
            return;
          }

          if (chatData.type == "all_messagess_received") {
            const receiver = socketUsers.get(chatData.to);
            if (receiver) {
              receiver.emit(`chatConfig`, chatData);
              callback && callback("all_messagess_received emit to receiver");
              return;
            }
            callback && callback("all_messagess_received receiver not availble");
            return;
          }

          if (chatData.type == "fetch_messages") {
            fileLogger.logFile(
              `fetch_messages: from ${chatData.from} and conversationId ${chatData.conversationId}`
            );
            return;
          }

          if (chatData.type == "delete_message_array") {
            const receiver = socketUsers.get(chatData.to);
            if (receiver) {
              logger.writeLog(`chatConfig delete_message receiver available`);
              chatData.from = id;
              // for app
              receiver.emit(`chatConfig_${chatData.conversationId}`, chatData);
              // for web
              receiver.emit("chatConfig", chatData);
              callback && callback(
                {
                  status: "ok",
                  type: "msg_deleted",
                  message: "message deleted successfully",
                });
            }
            else {
              logger.writeLog(`chatConfig delete_message_array receiver not available chatData.ids:  ${chatData.ids}`);
              if (chatData.ids && chatData.ids.length) {
                for (var i = 0; i < chatData.ids.length; i++) {
                  deletedMessages.saveDeletedMessage({
                    // id: moment().format('x'),
                    deletedBy: chatData.from,
                    deletedFor: chatData.to,
                    messgeId: chatData.ids[i],
                    conversationId: chatData.conversationId,
                    eventType: chatData.type,
                    bubbleMessageAddedTime: chatData.bubbleMessageAddedTime,
                    dateAdded: moment().format('llll')
                  }, (err, data) => {
                    logger.writeLog(`chatConfig delete_message_array receiver not available err:  ${err}`);
                  });
                }
                callback && callback(callback && callback(
                  {
                    status: "ok",
                    type: "msg_deleted",
                    message: `resp of save delete messeages: ${resp}`,
                  }));
              }
            }

            return;
          }

          if (
            !chatData ||
            !chatData.to ||
            !chatData.conversationId ||
            !chatData.message
          ) {
            callback &&
              callback("to, conversationId, or message is missing in data");
            return;
          }

          if (chatData.type == "received_ack") {
            // removing message from queue message

            queueMessages.removeMessages(chatData.id);
            fileLogger.logFile(
              `message received  type is ${chatData.type} and id is ${chatData.id}`
            );
            return;
          }

          if (chatData.type == "unmount_chat") {
            logger.writeLog(
              `user chat component unmout ${chatData.unmount_chat} and userNumber ${chatData.from} and conversationsId is ${chatData.id}`
            );

            fileLogger.logFile(
              `user chat component unmout ${chatData.unmount_chat} and userNumber ${chatData.from} and conversationsId is ${chatData.id}`
            );
            return;
          }

          logger.writeLog(
            `chatConfig called from ${id} to ${chatData.to} and type ${chatData.type} and remaingTodaySmsCount ${chatData.remaingTodaySmsCount}`
          );

          if (chatData.remaingTodaySmsCount) {
            remaingTodaySmsCount = chatData.remaingTodaySmsCount;
          }

          const receiver = socketUsers.get(chatData.to);

          if (chatData.type == "delete_message" || chatData.type == "bubble_msg_seen" || chatData.type == "message_not_delivered") {
            logger.writeLog(`chatConfig event called type ${chatData.type} from ${id} and to ${chatData.to} `);
            if (receiver) {
              logger.writeLog(`chatConfig delete_message receiver available`);
              chatData.from = id;
              // for app
              receiver.emit(`chatConfig_${chatData.conversationId}`, chatData);
              // for web
              receiver.emit("chatConfig", chatData);
              callback && callback(
                {
                  status: "ok",
                  type: "msg_deleted",
                  message: "message deleted successfully",
                });
            }

            if (chatData.message && chatData.message.id) {
              logger.writeLog(`chatConfig delete_message chatData.message.id: ${chatData.message.id}`);

              if (!receiver) {
                logger.writeLog(`chatConfig delete_message receiver not available`);
                deletedMessages.saveDeletedMessage({
                  // id: moment().format('x'),
                  deletedBy: chatData.from,
                  deletedFor: chatData.to,
                  messgeId: chatData.message.created,
                  conversationId: chatData.conversationId,
                  eventType: chatData.type,
                  bubbleMessageAddedTime: chatData.bubbleMessageAddedTime || "",
                  dateAdded: moment().format('llll')
                }, (resp) => {
                  logger.writeLog(`resp of save delete messeages: ${resp}`);
                  callback && callback(callback && callback(
                    {
                      status: "ok",
                      type: "msg_deleted",
                      message: `resp of save delete messeages: ${resp}`,
                    }));
                });
              }

              messages.updateIsDeleted(chatData.message.id, (err, data) => {
                if (err) { }
                else {
                  callback && callback(
                    {
                      status: "ok",
                      type: "msg_updated",
                      message: `message update isDeleted successfully`,
                    }
                  );
                }
              });
            }

            return;
          }

          conversations.updateConversationTime(
            chatData.conversationId,
            () => { }
          );

          if (chatData.type == "spam_message") {
            processMessage(chatData.message, callback);
          }
          if (receiver) {
            chatData.from = id;
            // for app
            receiver.emit(`chatConfig_${chatData.conversationId}`, chatData);
            // for web
            receiver.emit("chatConfig", chatData);
            fileLogger.logFile(
              `new message ${chatData.message.content} send to ${chatData.to} from ${id} and type is ${chatData.type} and id is ${chatData.id}`
            );
            logger.writeLog(`chatConfig called receiver available`);

            if (chatData.type == 'create' || chatData.type == 'spam_message') {
              // save messages in queue to save in temp messages
              queueMessages.setMessages(chatData);
              setTimeout(() => {
                // here send this acknowldgment to sender    ,chatData.from
                logger.writeLog(
                  `after 30 seconds chat config ${chatData.type} and userNumber ${chatData.from
                  } and conversationsId is ${chatData.id
                  } and is message exist ${queueMessages.getMessages(chatData)}`
                );

                if (queueMessages.getMessages(chatData)) {
                  const receiver = socketUsers.get(chatData.from);
                  if (receiver) {
                    logger.writeLog(
                      `chat config ${chatData.type} sender available`
                    );
                    chatData.type = "msg_not_delivered_ack";
                    logger.writeLog(
                      `emitting recived ack event: messageDelivered_${chatData.conversationId}`
                    );
                    receiver.emit(
                      `messageDelivered_${chatData.conversationId}`,
                      chatData
                    );
                    receiver.emit("messageDelivered", chatData);
                    receiver.emit("message_not_delivered", chatData);
                  }

                  queueMessages.saveQuesMessages(chatData);
                }
              }, savingDuration);
            }

            if (chatData && chatData.type == "create" && chatData.pushData && chatData.source == "mobile_web") {
              sendPushNotification(chatData.pushData, id, "message", chatData.source);
            }

            callback &&
              callback({
                status: "ok",
                type: "other_user_online",
                message: "message delivered successfully",
              });
          } else if (chatData && chatData.type == "create") {
            logger.writeLog("i am here saving prcess message");
            if (chatData.pushData) {
              sendPushNotification(chatData.pushData, id, "message", chatData.source);
            }
            processMessage(chatData.message, callback);
          }

          if (chatData.type == 'create') {
            let meConnected = socketUsers.get(id);
            if (!meConnected) {
              fileLogger.logFile(`chatConfig my user is not connected and getting messages from db`);
              socketUsers.create(socket, id);
              messages.getAllMyChat((err, data) => {
                if (!err) {
                  data.forEach((myMsg) => {
                    let _msg = {
                      "subType": "delete_msgs",
                      "type": "create",
                      "to": id,
                      "id": myMsg.created,
                      "from": myMsg.user,
                      "conversationId": myMsg.conversationId,
                      message: {
                        "conversationId": myMsg.conversationId,
                        "content": myMsg.content,
                        "bubbleMessageAddedTime": myMsg.bubbleMessageAddedTime,
                        "created": myMsg.created,
                        "duration": myMsg.duration,
                        "imageMetaData": myMsg.metaData,
                        "messageType": myMsg.messageType,
                        "id": myMsg.created,
                        "time": myMsg.time,
                        "type": myMsg.type,
                        "user": myMsg.user
                      }
                    }
                    socket.emit("chatConfig", _msg);
                    fileLogger.logFile(`chatConfig emit when we get from db and emit`);
                  });
                }
              });
            }
          }

        } catch (err) {
          logger.writeLog(
            `exception chatConfig event catch: ${err} and data is ${JSON.stringify(
              chatData
            )}`
          );
        }
      })

      .on("chatConfigRealTime", (data, callback) => {
        // data = type,to,chat object(object)
        // type = create

        try {
          if (!data.to || !data.conversationId || !data.message || !data.from) {
            callback &&
              callback("to,from, conversationId or message is missing in data");
            return;
          }

          if (data.type == "received_ack") {
            fileLogger.logFile(
              `message received  type is ${data.type} and id is ${data.id}`
            );
            return;
          }

          if (data.type == "unmount_chat") {
            fileLogger.logFile(
              `user chat component unmout ${data.unmount_chat} and userNumber ${data.from} and conversationsId is ${data.id}`
            );
            return;
          }

          logger.writeLog(
            `chatConfigRealTime called from ${id} to ${data.to} and type ${data.type}`
          );
          const receiver = socketUsers.get(data.to);
          conversations.updateConversationTime(data.conversationId, () => { });
          if (data.type == "spam_message") {
            processMessage(data.message, callback);
          }
          if (receiver) {
            receiver.emit(
              `${data.from}_chatConfig_${data.conversationId}`,
              data
            );
            fileLogger.logFile(
              `new message ${data.message.content} send to ${data.to} from ${id} and type is ${data.type} and id is ${data.id}`
            );
            logger.writeLog(`chatConfigRealTime called receiver available`);
            callback &&
              callback({
                status: "ok",
                message: "message delivered successfully",
              });
          } else if (data && data.type == "create") {
            processMessage(data.message, callback);
          }
        } catch (err) {
          logger.writeLog(`exception chatConfigRealTime event catch: ${err}`);
        }
      })

      .on("typing", (data, callback) => {
        // data = to,typing(object)
        try {
          if (!data.to) {
            callback && callback("to  in data is missing in data");
            return;
          }
          const receiver = socketUsers.get(data.to);
          if (receiver) {
            logger.writeLog(`Typing: ${id} is typing to ${data.to}`);
            myInfo.typing = data.typing;
            myInfo.state = "online";
            receiver.emit("realTimePresence", myInfo);
          }
        } catch (err) {
          logger.writeLog(`exception typing event catch: ${err}`);
        }
      })

      .on("request", (data, callback) => {
        try {
          if (!data.to) {
            callback && callback("to  in data is missing in data");
            return;
          }
          logger.writeLog(`request: request from ${id} to ${data.to}`);
          const receiver = socketUsers.get(data.to);
          if (receiver) {
            receiver.emit("request", { from: id, data: data });
          } else {
            if (data.pushData) {
              sendPushNotification(data.pushData, id, "call");
            }
            socket.emit("callFailed", { to: data.to });
          }
        } catch (err) {
          logger.writeLog(`exception request call event catch: ${err}`);
        }
      })

      .on("call", (data, callback) => {
        try {
          if (!data.to) {
            callback && callback("to  in data is missing in data");
            return;
          }
          logger.writeLog(`call: call from ${id} to ${data.to}`);
          const receiver = socketUsers.get(data.to);
          if (receiver) {
            receiver.emit("call", { ...data, from: id });
          } else {
            socket.emit("failed");
          }
        } catch (err) {
          logger.writeLog(`exception call event catch: ${err}`);
        }
      })

      .on("end", (data, callback) => {
        try {
          if (!data.to) {
            callback && callback("to  in data is missing in data");
            return;
          }
          logger.writeLog(`end: end from ${id} to ${data.to}`);
          if (data.remaingTodayCallCount) {
            remaingTodayCallCount = data.remaingTodayCallCount;
          }
          const receiver = socketUsers.get(data.to);
          if (receiver) {
            logger.writeLog(`end: end from ${id} to ${data.to} receiver online`);
            receiver.emit("end", data);
          }
          else {
            logger.writeLog(`end: end from ${id} to ${data.to} receiver offline`);
          }
        } catch (err) {
          logger.writeLog(`exception end call event catch: ${err}`);
        }
      })

      .on("onconfigchange", (data, callback) => {
        try {
          if (!data || !data.to) {
            callback && callback("to  in data is missing in data");
            return;
          }
          logger.writeLog(
            `onconfigchange: from ${id} to ${JSON.stringify(data)} and from ${id}`
          );
          const receiver = socketUsers.get(data.to);
          if (receiver) {
            data.from = id;
            receiver.emit("onconfigchange", { ...data });
            callback && callback("send event to other user ");
          }
        } catch (err) {
          logger.writeLog(`exception onconfig event catch: ${err}`);
        }
      })

      .on("token", () => {
        try {
          console.log("Twilio Response");
          twilio.tokens.create(function (err, response) {
            if (err) {
              console.log(err);
            } else {
              console.log("response===>   ", response);
              socket.emit("token", response);
            }
          });
        } catch (err) {
          logger.writeLog(`exception token event catch: ${err}`);
        }
      })

      .on("joinGroup", (data, callback) => {
        try {
          logger.writeLog(`joinGroup data: ${data}`);

          if (!data || !data.groupId) {
            callback && callback(`data & groupId required in data`);
            return;
          }
          let _groupId = createGroupRoomId(data.groupId);
          let groupSocket = socketUsers.get(_groupId);
          if (groupSocket) {
            groupSocket.join(id);
          }
          else {
            socket.join(socketUsers.create(socket, _groupId));
          }
          callback && callback(`${id} joined the group ${_groupId}`);
        }
        catch (err) {
          logger.writeLog(`exception joinGroup: ${err}`);
          callback && callback(`exception joinGroup: ${err}`);
        }
      })

      .on("groupConfig", (data, callback) => {
        try {

          if (!data || !data.groupId || !data.type) {
            callback && callback(`data, groupId and type are required in data obj`);
            return;
          }

          if (data.type == "addUser") {
            if (!data.userNumber) {
              callback && callback(`userNumber is required in data`);
              return;
            }
            groupInfo.addUserInGroup(data.userNumber, data.groupId, (err, data) => {
              if (err) {
                logger.writeLog(`Error addUserInGroup: ${err}`);
                callback && callback(`Error addUserInGroup: ${err}`);
                return;
              }
              callback && callback(`addUserInGroup resp: ${data}`);
            });
          }
          if (data.type == "removeUser") {
            if (!data.userNumber) {
              callback && callback(`userNumber is required in data`);
              return;
            }
            groupInfo.removeUserFromGroup(data.grouId, data.userNumber, (err, data) => {
              if (err) {
                logger.writeLog(`Error removeUserFromGroup: ${err}`);
                callback && callback(`Error removeUserFromGroup: ${err}`);
                return;
              }
              callback && callback(`removeUserFromGroup resp: ${data}`);
            })
          }
          if (data.type == "addUserAsAdmin") {
            if (!data.userNumber) {
              callback && callback(`userNumber is required in data`);
              return;
            }
            groupInfo.addUserAsAdmin(data.userNumber, data.grouId, (err, data) => {
              if (err) {
                logger.writeLog(`Error addUserAsAdmin: ${err}`);
                callback && callback(`Error addUserAsAdmin: ${err}`);
                return;
              }
              callback && callback(`addUserAsAdmin resp: ${data}`);
            });
          }

          if (data.type == "sharePrivateKey") {
            if (!data.userNumber || !data.key) {
              callback && callback(`userNumber and key is required in data`);
              return;
            }
            const receiver = socketUsers.get(data.userNumber);
            if (receiver) {
              let _groupId = createGroupRoomId(data.groupId);
              logger.writeLog(`sharePrivateKey event sharePrivateKey send to other user ${data.userNumber}`);
              receiver.emit(`groupConfig_${_groupId}`, data);
              callback && callback("realtime sharePrivateKey event send to other user");
            }
            else {
              groupKeys.createGroupKey({
                userNumber: data.userNumber,
                groupId: data.groupId,
                key: data.key,
              }, (err, data) => {
                if (err) {
                  logger.writeLog(`Error createGroupKey: ${err}`);
                  callback && callback(`Error createGroupKey: ${err}`);
                  return;
                }
                callback && callback(`createGroupKey resp: ${data}`);
              });
              return;
            }

          }
          if (data.type == "configChange") { }

          let _groupId = createGroupRoomId(data.groupId);
          let groupSocket = socketUsers.get(_groupId);
          if (groupSocket) {
            // User must first join the group before emiting in group
            groupSocket.emit(`groupConfig_${_groupId}`, data);
          }
        }
        catch (err) {
          logger.writeLog(`exception groupConfig: ${err}`);
          callback && callback(`exception groupConfig: ${err}`);
        }
      })

      .on("testPing", (callback) => {
        callback && callback("test ping callback working");
      });
    ;
  }
}


function createGroupRoomId(grouId) {
  return `xpal_group_${grouId}`;
}

function createRoom(id, myInfo, callback) {
  try {
    if (!id) return;
    let roomID = socketRooms.get(id);
    if (roomID) {
      logger.writeLog(`${roomID.id} room already exist`);
      callback && callback(roomID.id);
      return;
    }
    myInfo.last_delivered = myInfo.last_changed = Date.now();
    logger.writeLog(`xpal_${id} new room created`);
    callback && callback(socketRooms.create(id, myInfo));
  } catch (err) {
    logger.writeLog(`exception createRoom: ${err}`);
  }
}

//#region Conversation

function processDeleteConversation(data, callback) {
  try {
    conversations.deleteConversations(data, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          callback && callback(err);
        } else {
          callback && callback(err);
        }
      } else {
        callback && callback(data);
      }
    });
  } catch (err) {
    logger.writeLog(`exception process delete conversation: ${err}`);
  }
}

function processNewConversation(_data, callback) {
  try {
    conversations.saveConversation(_data, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          console.log("error saving message not found");
          callback && callback(err);
        } else {
          console.log("error saving message: ", err);
          callback && callback(err);
        }
      } else {
        console.log("saveConversation success: " + data);
        callback && callback(data);
      }
    });
  } catch (err) {
    logger.writeLog(`exception process new conversation: ${err}`);
  }
}

function processMessage(message, callback) {
  try {
    logger.writeLog("i am here saving prcess message in process message");
    messages.saveMessage(message, (err, data) => {
      if (err) {
        logger.writeLog("error saving message: " + err);
        callback && callback(
          {
            status: "error",
            type: "msg_saved_error",
            message: err,
          }
        );
        logger.writeLog(
          `new message ${message.content} save to db error and callback send ${message.user}`
        );
      } else {
        {
          logger.writeLog(
            `new message ${message.content} save to db succee and callback send ${message.user}`
          );
          callback && callback(
            {
              status: "ok",
              type: "msg_saved",
              message: data,
            }
          );
        }
      }
    });
  } catch (err) {
    logger.writeLog(`exception process message: ${err}`);
  }
}

//#endregion Conversations

//#region Users

function sendPushNotification(params, id, type, source) {
  try {
    if (!id) {
      logger.writeLog(`calling Transporter/sendpush id missing`);
      return;
    }
    logger.writeLog(`calling Transporter/sendpush = ${JSON.stringify(params)}`);
    params.from = id;
    params.type = type;
    params.click_action = source == "mobile_web" ? "https://m.xpal.com" : "https://web.xpal.com";

    apiService.post(`Transporter/sendpush`, params, (resp) => {
      logger.writeLog(`resp Transporter/sendpush = ${resp}`);
    });
  } catch (err) {
    logger.writeLog(`exception send push notificaiton: ${err}`);
  }
}

function updateMessagesCount(count, xPalNumber) {
  try {
    logger.writeLog(`updatecount user id = ${xPalNumber} and count = ${count}`);
    if (xPalNumber && count) {
      apiService.post(
        `Transporter/updatecount?number=${xPalNumber}&count=${count}`,
        {},
        (resp) => {
          logger.writeLog("resp of Transporter/updatecount: ", resp)
        }
      );
    }
  } catch (err) {
    logger.writeLog(`exception update message count: ${err}`);
  }
}

function updateCallCount(count, xPalNumber) {
  try {
    logger.writeLog(`updateCallCount user id = ${xPalNumber} and count = ${count}`);
    if (xPalNumber && count) {
      apiService.post(
        `Transporter/updatecallcount?number=${xPalNumber}&count=${count}`,
        {},
        (resp) => {
          logger.writeLog("resp of Transporter/updatecallcount: ", resp)
        }
      );
    }
  } catch (err) {
    logger.writeLog(`exception update message count: ${err}`);
  }
}

function updateUserStatus(status, xPalNumber) {
  try {
    apiService.post(
      `Transporter/updateconnection?number=${xPalNumber}&isConnect=${status}`,
      {},
      (resp) => { }
    );
  } catch (err) {
    logger.writeLog(`exception update user stats: ${err}`);
  }
}

function updateIsDeleteData(isDeleteData, xPalNumber) {
  logger.writeLog(`updateIsDeleteData user id = ${xPalNumber} and isDeleteData = ${isDeleteData}`);
  try {
    apiService.post(
      `Transporter/updconversation?number=${xPalNumber}&isconversation=${isDeleteData}`,
      {},
      (resp) => { }
    );
  } catch (err) {
    logger.writeLog(`exception updateIsDeleteData user stats: ${err}`);
  }
}

function getActiveCall(userId, callback) {
  callmetaData.getActiveCall(userId, callback);
}

//#endregion Users

module.exports = SocketClass;
