import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import BackHeader from '../../../components/BackHeader';
import {
  renderBubble,
  renderInputToolbar,
  renderSend,
} from '../../../components/CustomChatInput';
import {COLORS} from '../../../constants';
import * as AppActions from '../../../redux/actions';
import {horizontalScale, verticalScale} from '../../../utils/Metrics';
import Socket from '../../../utils/socket';

export default ChatScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  /* Details of the person we will be chatting with */
  const {firstName, lastName, _id} = route.params.payload.caregivers;

  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);

  /* Our id */
  const userId = useSelector(state => state.authReducer.userData._id);

  /* Auth token */
  const token = useSelector(state => state.authReducer.token);

  /* Chat received from api call */
  const chat = useSelector(state => state.dashReducer.chat);

  /* API call to get the chats */
  useEffect(() => {
    setMessages([]); // Clear previous chat messages

    let body = {
      page: page,
      limit: 50,
      sender: userId,
      receiver: _id,
    };
    dispatch(AppActions.getChatCall(route.params.payload._id, body, token));
  }, [userId, _id, dispatch, token]);

  /* API call to mark messages as read */
  useEffect(() => {
    dispatch(AppActions.markReadCall(userId, token));
  }, [chat]);

  /* Establish a connection with the chosen user */
  useEffect(() => {
    let data = {
      userId: _id,
    };
    Socket.connectUser(data);
  }, [_id]);

  /* Clear chat messages from Redux store when user moves out of chat screen */
  const clearChatMessages = () => {
    dispatch(AppActions.clearChat()); // Replace 'clearChat' with the actual action that clears the chat messages in your Redux code
  };

  /* Format the messages to react native gifted chat usable format and set them */
  useEffect(() => {
    let data = {
      userId: _id,
    };
    Socket.connectUser(data);
  }, [_id]);

  /* Check if user moves out from the screen to reset the chats */
  useEffect(() => {
    navigation.addListener('beforeRemove', clearChatMessages);

    return () => {
      navigation.removeListener('beforeRemove', clearChatMessages);
    };
  }, [navigation]);

  /* Format the messages to react native gifted chat usable format and set them */
  useEffect(() => {
    let giftedChatMessages = chat?.map(chatMessage => {
      const isCurrentUser = chatMessage.sender._id === userId;
      const senderName = isCurrentUser
        ? `${chatMessage.sender.firstName} ${chatMessage.sender.lastName}`
        : `${chatMessage.receiver.firstName} ${chatMessage.receiver.lastName}`;

      let gcm = {
        _id: chatMessage?._id,
        text: chatMessage?.text,
        createdAt: chatMessage?.createdAt,
        user: {
          _id: isCurrentUser ? 1 : 2,
          name: senderName,
          avatar: chatMessage?.sender?.avatar,
        },
      };
      return gcm;
    });

    setMessages(giftedChatMessages);
  }, [chat]);

  const onSend = useCallback((messages = []) => {
    let data = {
      message: messages[0].text,
      sender: userId,
      receiver: _id,
    };

    let message = data;
    Socket.onSend(message);
    this.socket.on('msgAcknowledgement', res => {
      console.log('msgAcknowledgement', res);

      if (res) {
        console.log('res.data[0]', res.data[0]);

        this.chatData.push(res.data[0]);

        setTimeout(() => {
          this.scrollToElement();

          this.pageChat = 1;

          this.limitChat = 50;
        }, 100);

        this.chatMessageFormGroup.reset();
      }
    });

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  // Function to load previous messages from the API
  const loadPreviousMessages = () => {
    // Make an API call to get previous messages
    let body = {
      page: page + 1,
      limit: 50,
      sender: userId,
      receiver: _id,
    };
    setPage(page + 1);
    dispatch(AppActions.getMoreChatCall(route.params.payload._id, body, token));
  };
  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToTop = 80;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  };

  return (
    <View style={styles.container}>
      <BackHeader title={firstName + ' ' + lastName} />
      <View style={styles.dividerCont}>
        <View style={styles.divider} />
        <View style={styles.divider} />
      </View>
      <GiftedChat
        messages={messages}
        renderAvatar={null}
        renderBubble={renderBubble}
        messagesContainerStyle={{paddingBottom: verticalScale(10)}}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        listViewProps={{
          scrollEventThrottle: 400,
          onScroll: ({nativeEvent}) => {
            if (isCloseToTop(nativeEvent)) {
              loadPreviousMessages();
            }
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  dividerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(15),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#00000033',
  },
});
