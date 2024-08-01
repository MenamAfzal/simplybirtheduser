import io from 'socket.io-client';
import {ACTION_TYPE} from '../redux/actionTypes';
import {SOCKET_URL} from '../constants/url';
// import {SOCKET_CHAT} from '../constants/urls';
// import SOCKET from '../constants/socket';
// import ACTION_TYPE from '@constants/actions';

class Socket {
  socket = null;
  isConnected = false;

  static socketInit(userId, dispatch) {
    if (true) {
      this.socket = io.connect(SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      });

      globalThis.socket = this.socket;

      this.socket.on('connect', res => {
        this.isConnected = this.socket.connected;
        console.log('this.socket.connected', this.socket.connected);
      });

      this.socket.on('acknowledgement', res => {
        // console.log('here in acknowledgement', res);
      });

      this.socket.on('connectUser', res => {
        this.isConnected = this.socket.connected;
        console.log('this.socket', this.socket, res);
      });

      this.socket.on('disconnect', res => {
        // console.log('disconnect', res);
        this.isConnected = this.socket.connected;
      });

      this.socket.on('msgAcknowledgement', res => {
        // console.log('msgAcknowledgement', res);
        this.isConnected = this.socket.connected;
        dispatch({
          type: ACTION_TYPE.ADD_CHAT,
          payload: res.data,
        });
      });

      this.socket.on('carechatList', res => {
        console.log('carechatList', res);
        // dispatch({
        //   type: ACTION_TYPE.SET_CHAT_LIST,
        //   payload: chatlist,
        // });
      });

      this.socket.on('reconnect', e => {
        // console.log('reconnect', this.socket, e);
        this.isConnected = this.socket.connected;
      });

      this.socket.on('messageReceived', sendMessageData => {
        // console.log('new-message-read', sendMessageData);
        dispatch({
          type: ACTION_TYPE.ADD_CHAT,
          payload: sendMessageData,
        });
      });
    }
  }

  static connectUser(data) {
    // console.log('in connect user emit');
    this.socket.emit('connectUser', data);
  }

  static onSend(messageData) {
    // console.log('messageData', messageData);
    this.socket.emit('sendMessage', messageData);
  }

  static videoCallHangup(channel_id) {
    const messageData = {
      channel_id: channel_id,
    };
    globalThis.socket.emit('videoCut', messageData);
  }

  static videoDisconnect() {
    return new Promise((resolve, reject) => {
      globalThis.socket.on('videoCut', data => {
        resolve(data);
      });
    });
  }

  static logoutUser() {
    this.socket.disconnect();
    this.socket = null;
    this.isConnected = false;
  }
}

export default Socket;


