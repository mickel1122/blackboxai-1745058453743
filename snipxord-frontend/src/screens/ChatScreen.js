import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5000'; // Change to your backend URL

export default function ChatScreen() {
  const tailwind = useTailwind();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on('connect', () => {
      console.log('Connected to chat server');
    });

    socketRef.current.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    const message = {
      id: Date.now().toString(),
      text: input,
      sender: 'You',
      timestamp: new Date().toISOString(),
    };
    socketRef.current.emit('chat message', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View style={tailwind('mb-2')}>
      <Text style={tailwind('text-indigo-400 font-semibold')}>{item.sender}</Text>
      <Text style={tailwind('text-white')}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={tailwind('flex-1 bg-gray-900 p-4')}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tailwind('flex-grow justify-end')}
      />
      <View style={tailwind('flex-row items-center mt-2')}>
        <TextInput
          style={tailwind('flex-1 bg-gray-800 rounded-full px-4 py-2 text-white')}
          placeholder="Type a message"
          placeholderTextColor="#9CA3AF"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={tailwind('ml-2 bg-indigo-600 rounded-full p-3')}
          onPress={sendMessage}
        >
          <Icon name="paper-plane" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
