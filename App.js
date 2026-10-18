import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { HomeScreen } from './src/HomeScreen';
import { UserFormScreen } from './src/UserFormScreen';
import { PostsScreen } from './src/PostsScreen';
import { CountriesScreen } from './src/CountriesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function UsersStack({ isDarkMode, setIsDarkMode }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' },
        headerTintColor: isDarkMode ? '#ffffff' : '#000000',
      }}
    >
      <Stack.Screen name="HomeList" options={{ title: 'Користувачі' }}>
        {(props) => (
          <HomeScreen
            {...props}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="UserForm" options={{ title: 'Новий користувач' }}>
        {(props) => <UserFormScreen {...props} isDarkMode={isDarkMode} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' },
          headerTintColor: isDarkMode ? '#ffffff' : '#000000',
          tabBarStyle: { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: isDarkMode ? '#888' : '#666',
          tabBarIcon: () => {
            let icon = '👤';
            if (route.name === 'Posts') icon = '📸';
            if (route.name === 'Countries') icon = '🗺️';
            return <Text style={{ fontSize: 18 }}>{icon}</Text>;
          },
        })}
      >
        <Tab.Screen
          name="Users"
          options={{ title: 'Користувачі', headerShown: false }}
        >
          {(props) => (
            <UsersStack
              {...props}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Posts" options={{ title: 'Інстаграм' }}>
          {(props) => <PostsScreen {...props} isDarkMode={isDarkMode} />}
        </Tab.Screen>

        <Tab.Screen name="Countries" options={{ title: 'Країни' }}>
          {(props) => <CountriesScreen {...props} isDarkMode={isDarkMode} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}