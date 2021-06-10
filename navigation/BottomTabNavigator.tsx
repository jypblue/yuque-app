/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from '@ant-design/react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import MessageScreen from '../screens/MessageScreen';
import FollowScreen from '../screens/FollowScreen';
import MeScreen from '../screens/MeScreen';

import { BottomTabParamList, HomeParamList, MessageParamList, FollowParamList, MeParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({setPublishModalVisible}: { setPublishModalVisible: (visible: boolean) => void}) {
  const colorScheme = useColorScheme();
  const onPress = () => {
    console.log('publish click')
    // 暴露点击事件
    setPublishModalVisible(true)
  };

  const onLongPress = () => {
    console.log('2222')
  };

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        adaptive: false
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <Icon name="yuque" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Message"
        component={MessageNavigator}
        options={{
          title: '消息',
          tabBarIcon: ({ color }) => <Icon name="notification" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Publish"
        options={{
          tabBarButton: (props) => <TouchableWithoutFeedback
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="plus-circle" color={Colors[colorScheme].tint}  size="lg" />
          </View>
        </TouchableWithoutFeedback>,
        }}
      >
        {(props) => <View></View>}
      </BottomTab.Screen>
       <BottomTab.Screen
        name="Follow"
        component={FollowNavigator}
        options={{
          title: '关注',
          tabBarIcon: ({ color }) => <Icon name="compass" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Me"
        component={MeNavigator}
        options={{
          title: '我',
          tabBarIcon: ({ color }) => <Icon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: '语雀', headerTitleAlign: 'left' }}
      />
    </HomeStack.Navigator>
  );
}

const MessageStack = createStackNavigator<MessageParamList>();

function MessageNavigator() {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{ headerTitle: '消息', headerTitleAlign: 'left' }}
      />
    </MessageStack.Navigator>
  );
}

const FollowStack = createStackNavigator<FollowParamList>();

function FollowNavigator() {
  return (
    <FollowStack.Navigator>
      <FollowStack.Screen
        name="FollowScreen"
        component={FollowScreen}
        options={{ headerTitle: '关注', headerTitleAlign: 'left' }}
      />
    </FollowStack.Navigator>
  );
}

const MeStack = createStackNavigator<MeParamList>();

function MeNavigator() {
  return (
    <MeStack.Navigator>
      <MeStack.Screen
        name="MeScreen"
        component={MeScreen}
        options={{ headerTitle: '我', headerTitleAlign: 'left' }}
      />
    </MeStack.Navigator>
  );
}
