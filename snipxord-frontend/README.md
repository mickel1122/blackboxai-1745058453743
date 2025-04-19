# Snipxord Mobile App Frontend

This is the React Native frontend for the Snipxord mobile app, a Discord clone.

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Run the app on iOS or Android:
   ```
   npx react-native run-ios
   npx react-native run-android
   ```

## Tech Stack

- React Native
- React Navigation
- tailwind-rn or nativewind for styling
- react-native-vector-icons for icons
- react-native-google-fonts for fonts
- socket.io-client for real-time chat

## Features

- User authentication (login/register)
- Profile management
- Real-time chat with channels and direct messages
- Typing indicators, message reactions, user presence
- Responsive and accessible UI

## Backend

The backend server is located in the `snipxord-backend` folder.

## Development

- Use React Context or Redux for state management
- Use socket.io-client to connect to backend WebSocket server

## Testing

- Jest and React Native Testing Library for unit tests

## Deployment

- Environment variables for API URLs and secrets
- Build instructions for iOS and Android
