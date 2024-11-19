// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens dengan path yang sesuai struktur
import HomeScreen from './screens/HomeScreen.js';
import WarshipsListScreen from './screens/WarshipsListScreen.js';
import WarshipDetailScreen from './screens/WarshipDetailScreen.js';
import PlayerProfileScreen from './screens/PlayerProfileScreen.js';
import BattleTypeScreen from './screens/BattleTypeScreen.js';
import BattleTypeDetailScreen from './screens/BattleTypeDetailScreen.js';
import AboutScreen from './screens/AboutScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#11120D',
          },
          headerTintColor: '#FFFBF4',
          title: 'World of Warships'
        }}
      />
    </Stack.Navigator>
  );
};

const WarshipsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="WarshipsList" 
        component={WarshipsListScreen}
        options={{
          headerStyle: {
            backgroundColor: '#11120D',
          },
          headerTintColor: '#FFFBF4',
          title: 'Warships'
        }}
      />
      <Stack.Screen 
        name="WarshipDetail" 
        component={WarshipDetailScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: '#11120D',
          },
          headerTintColor: '#FFFBF4',
          title: route.params?.ship?.name || 'Warship Details'
        })}
      />
    </Stack.Navigator>
  );
};

const PlayerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PlayerProfile" 
        component={PlayerProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: '#11120D',
          },
          headerTintColor: '#FFFBF4',
          title: 'Player Profile'
        }}
      />
    </Stack.Navigator>
  );
};

const BattleTypeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="BattleTypeList" 
        component={BattleTypeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#11120D',
          },
          headerTintColor: '#FFFBF4',
          title: 'Battle Types'
        }}
      />
      <Stack.Screen 
        name="BattleTypeDetail" 
        component={BattleTypeDetailScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: '#11120D',
          },
          headerTintColor: '#FFFBF4',
          title: route.params?.battle?.name || 'Battle Type'
        })}
      />
    </Stack.Navigator>
  );
};

const AboutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AboutScreen" 
        component={AboutScreen}
        options={{
          headerStyle: {
            backgroundColor: '#11120D',
          },
          headerTintColor: '#FFFBF4',
          title: 'About'
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Warships') {
              iconName = focused ? 'boat' : 'boat-outline';
            } else if (route.name === 'Players') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Battles') {
              iconName = focused ? 'flash' : 'flash-outline';
            } else if (route.name === 'About') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F5CB5C',
          tabBarInactiveTintColor: '#D8CFBC',
          tabBarStyle: {
            backgroundColor: '#11120D',
            borderTopColor: '#565449',
            paddingBottom: 5,
            height: 60,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Warships" component={WarshipsStack} />
        <Tab.Screen name="Players" component={PlayerStack} />
        <Tab.Screen name="Battles" component={BattleTypeStack} />
        <Tab.Screen name="About" component={AboutStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;