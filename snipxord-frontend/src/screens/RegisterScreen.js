import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RegisterScreen({ navigation }) {
  const tailwind = useTailwind();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // TODO: Implement register API call and validation
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    // For now, navigate to Login screen directly
    Alert.alert('Success', 'Account created. Please login.');
    navigation.replace('Login');
  };

  return (
    <View style={tailwind('flex-1 justify-center px-6 bg-gray-900')}>
      <Text style={tailwind('text-4xl font-bold text-white mb-8 text-center')}>Snipxord</Text>
      <View style={tailwind('mb-4')}>
        <Text style={tailwind('text-white mb-2')}>Username</Text>
        <View style={tailwind('flex-row items-center bg-gray-800 rounded-md px-3')}>
          <Icon name="user" size={20} color="#9CA3AF" />
          <TextInput
            style={tailwind('flex-1 text-white px-2 py-2')}
            placeholder="Enter your username"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>
      <View style={tailwind('mb-4')}>
        <Text style={tailwind('text-white mb-2')}>Email</Text>
        <View style={tailwind('flex-row items-center bg-gray-800 rounded-md px-3')}>
          <Icon name="envelope" size={20} color="#9CA3AF" />
          <TextInput
            style={tailwind('flex-1 text-white px-2 py-2')}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={tailwind('mb-6')}>
        <Text style={tailwind('text-white mb-2')}>Password</Text>
        <View style={tailwind('flex-row items-center bg-gray-800 rounded-md px-3')}>
          <Icon name="lock" size={20} color="#9CA3AF" />
          <TextInput
            style={tailwind('flex-1 text-white px-2 py-2')}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <TouchableOpacity
        style={tailwind('bg-indigo-600 rounded-md py-3')}
        onPress={handleRegister}
      >
        <Text style={tailwind('text-white text-center text-lg font-semibold')}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tailwind('mt-4')}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={tailwind('text-indigo-400 text-center')}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
