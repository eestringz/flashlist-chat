/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useRef, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import useChatMessages from './useChatMessages';

export function Chat() {
  const PAGE_SIZE = 100;
  const anchorIndex = 0;
  const startPage = Math.floor(anchorIndex / PAGE_SIZE); // 2
  const anchorId = `msg-${500 - anchorIndex}`;

  const {chatMessages, loadMoreTop, loadMoreBottom, isFetched} =
    useChatMessages({
      roomId: 'room-1',
      enableApiCall: true,
      startPage,
    });

  const listRef = useRef<any>(null);
  // ⚡ 최초 렌더링 flag
  const isInitialRender = useRef(true);
  // scroll 중 감지 flag
  const userScrolling = useRef(false);

  const messages = useMemo(() => {
    if (!chatMessages?.pages || chatMessages.pages.length === 0) return [];
    return chatMessages.pages.flatMap(page => page.list).reverse();
  }, [chatMessages?.pages]);

  // 첫 로딩 후 anchorId로 점프
  useEffect(() => {
    if (!isFetched || !messages.length || !isInitialRender.current) return;
    const idx = messages.findIndex(m => m.id === anchorId);
    if (idx >= 0) {
      console.log('🎯🎯🎯🎯 idx: ', idx);
      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({index: idx, animated: true});
        // ✅ scrollToIndex 끝난 프레임 이후에만 flag false로 변경
        isInitialRender.current = false;
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched, messages.length]);

  const [input, setInput] = useState('');

  // 새 메시지 전송 (임시로 로컬에만 추가)
  const sendMessage = () => {
    if (!input.trim()) return;
    messages.push({
      id: `msg-${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    } as any);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({animated: true}), 100);
  };

  // 중앙 인덱스로 이동
  const goToCenter = () => {
    if (!messages.length) return;
    const centerIndex = Math.floor(messages.length / 2);
    listRef.current?.scrollToIndex({index: centerIndex, animated: true});
  };

  return (
    <SafeAreaView style={styles.safeArea} testID="ChatScreen">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Chat</Text>
          <Pressable style={styles.centerButtonHeader} onPress={goToCenter}>
            <Text style={styles.centerButtonText}>Center</Text>
          </Pressable>
        </View>
        <FlashList
          ref={listRef}
          data={messages}
          renderItem={({item}) => <MessageBubble message={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingVertical: 8}}
          // estimatedItemSize={60}
          onMomentumScrollBegin={() => {
            userScrolling.current = true;
          }}
          onMomentumScrollEnd={() => {
            userScrolling.current = false;
          }}
          onStartReached={() => {
            if (isInitialRender.current || !userScrolling.current) return; // 🚫 첫 렌더링 시 무시
            console.log('⬆️ onStartReached 호출 → 과거 loadMore');
            loadMoreTop();
          }}
          onEndReached={() => {
            if (isInitialRender.current || !userScrolling.current) return; // 🚫 첫 렌더링 시 무시
            console.log('⬇️ onEndReached 호출 → 최신 loadMore');
            loadMoreBottom();
          }}
          onStartReachedThreshold={0.1}
          onEndReachedThreshold={0.1}
          maintainVisibleContentPosition={{
            autoscrollToTopThreshold: 50,
            autoscrollToBottomThreshold: 50,
            startRenderingFromBottom: true,
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="메시지를 입력하세요"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>전송</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const MessageBubble = ({message}: {message: any}) => {
  const isUser = message.sender === 'user';
  return (
    <View
      style={[
        styles.messageBubbleContainer,
        isUser ? styles.userMessageContainer : styles.otherMessageContainer,
      ]}>
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userMessage : styles.otherMessage,
        ]}>
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#f5f5f5'},
  container: {flex: 1},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  centerButtonHeader: {
    backgroundColor: '#ffb300',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginLeft: 12,
  },
  centerButtonText: {color: '#fff', fontWeight: '600', fontSize: 15},
  headerTitle: {fontSize: 18, fontWeight: '600'},
  messageBubbleContainer: {
    paddingHorizontal: 12,
    marginVertical: 4,
    flexDirection: 'row',
  },
  userMessageContainer: {justifyContent: 'flex-end'},
  otherMessageContainer: {justifyContent: 'flex-start'},
  messageBubble: {maxWidth: '80%', padding: 12, borderRadius: 16},
  userMessage: {backgroundColor: '#dcf8c6', borderBottomRightRadius: 1},
  otherMessage: {backgroundColor: '#ffffff', borderBottomLeftRadius: 1},
  messageText: {fontSize: 16, color: '#000000'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {color: '#fff', fontWeight: '600', fontSize: 16},
});
