import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';

export default function ProfileScreen() {
  const tailwind = useTailwind();
  const [username, setUsername] = useState('User123');
  const [status, setStatus] = useState('Available');
  const [avatarUri, setAvatarUri] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', maxWidth: 300, maxHeight: 300, quality: 0.7 },
      (response) => {
        if (response.didCancel) {
          // User cancelled
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          const uri = response.assets && response.assets[0] && response.assets[0].uri;
          if (uri) {
            setAvatarUri(uri);
          }
        }
      }
    );
  };

  const handleSave = () => {
    // TODO: Save profile info to backend
    Alert.alert('Success', 'Profile updated');
  };

  return (
    <View style={tailwind('flex-1 bg-gray-900 p-6')}>
      <Text style={tailwind('text-3xl font-bold text-white mb-6')}>Profile</Text>
      <TouchableOpacity onPress={pickImage} style={tailwind('mb-6 items-center')}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={tailwind('w-24 h-24 rounded-full')} />
        ) : (
          <View style={tailwind('w-24 h-24 rounded-full bg-gray-700 justify-center items-center')}>
            <Icon name="user" size={48} color="#9CA3AF" />
          </View>
        )}
        <Text style={tailwind('text-indigo-400 mt-2')}>Change Avatar</Text>
      </TouchableOpacity>
      <View style={tailwind('mb-4')}>
        <Text style={tailwind('text-white mb-2')}>Username</Text>
        <TextInput
          style={tailwind('bg-gray-800 rounded-md px-3 py-2 text-white')}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={tailwind('mb-6')}>
        <Text style={tailwind('text-white mb-2')}>Status</Text>
        <TextInput
          style={tailwind('bg-gray-800 rounded-md px-3 py-2 text-white')}
          value={status}
          onChangeText={setStatus}
        />
      </View>
      <TouchableOpacity
        style={tailwind('bg-indigo-600 rounded-md py-3')}
        onPress={handleSave}
      >
        <Text style={tailwind('text-white text-center text-lg font-semibold')}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
