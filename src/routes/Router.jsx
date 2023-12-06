import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { paths } from '../utils/paths';
import { CollectionPage } from './CollectionPage/CollectionPage';
import Collections from './Collections/Collections';
import CreateCollection from './CreateCollection/CreateCollection';
import SignIn from './SignIn/SignIn';
import SignUpPage from './SignUpPage/SignUpPage';
import UserCollections from './UserCollections/UserCollections';
import UserPanel from './UserPanel/UserPanel';
import { Ionicons } from '@expo/vector-icons';

const CollectionsListStack = createNativeStackNavigator()

function CollectionsListScreen() {
  return (
    <CollectionsListStack.Navigator screenOptions={{ headerShown: false }}>
      <CollectionsListStack.Screen name={paths.collections} component={Collections} />
      <CollectionsListStack.Screen name={paths.create} component={CreateCollection} />
      <CollectionsListStack.Screen name={paths.collection} component={CollectionPage} />
    </CollectionsListStack.Navigator>
  );
}

const CreateCollectionStack = createNativeStackNavigator()

function CreateCollectionScreen() {
  return (
    <CreateCollectionStack.Navigator screenOptions={{ headerShown: false }}>
      <CreateCollectionStack.Screen name={paths.create} component={CreateCollection} />
      <CreateCollectionStack.Screen name={paths.signIn} component={SignIn} />
      <CreateCollectionStack.Screen name={paths.signUp} component={SignUpPage} />
    </CreateCollectionStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator()

function ProfileScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name={paths.profile} component={UserPanel} />
      <ProfileStack.Screen name={paths.myCollections} component={UserCollections} />
      <ProfileStack.Screen name={paths.signIn} component={SignIn} />
      <ProfileStack.Screen name={paths.signUp} component={SignUpPage} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const getTabBarIcon = (route, focused, color, size) => {
  let iconName;
  if (route.name === 'Collections List') {
    iconName = focused ? 'albums' : 'albums-outline';
  } else if (route.name === 'Create Collection') {
    iconName = focused ? 'add-circle' : 'add-circle-outline';
  } else if (route.name === 'User Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};
const screenOptions= ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) =>
    getTabBarIcon(route, focused, color, size),

  tabBarActiveTintColor: 'red',
  tabBarInactiveTintColor: 'gray',
});

const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name={'Collections List'} component={CollectionsListScreen} />
        <Tab.Screen name={'Create Collection'} component={CreateCollectionScreen} />
        <Tab.Screen name={'User Profile'} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
