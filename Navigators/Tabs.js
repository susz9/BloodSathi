import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

//colors
import { Colors } from '../Components/Styles';

//screens
import Home from './../Screens/App/Home';
import Search from '../Screens/App/Search';
import Maps from './../Screens/App/Maps';
import Chats from './../Screens/App/Chats';

const Tab = createBottomTabNavigator();

//colors
const { primary, secondary, tertiary, brand, darkLight } = Colors;

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: brand,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 30,
          right: 30,
          elevation: 2,
          backgroundColor: '#ffffff',
          borderRadius: 20,
          height: 60,
          borderTopColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={32} />
          ),
        }}
      />

      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
