import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { paths } from '../utils/paths';
import CollectionPage from './CollectionPage/CollectionPage';
import Collections from './Collections/Collections';
import CreateCollection from './CreateCollection/CreateCollection';
import SignIn from './SignIn/SignIn';
import SignUpPage from './SignUpPage/SignUpPage';
import UserCollections from './UserCollections/UserCollections';
import UserPanel from './UserPanel/UserPanel';


const CollectionsListStack = createNativeStackNavigator()

function CollectionsListScreen() {
  return (
    <CollectionsListStack.Navigator screenOptions={{ headerShown: false }}>
      <CollectionsListStack.Screen name={paths.collections} component={Collections} />
      <CollectionsListStack.Screen name={paths.create} component={CreateCollection} />
      <CollectionsListStack.Screen name={'collectionPage'} component={CollectionPage} />
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

const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name={paths.collections} component={CollectionsListScreen} />
        <Tab.Screen name={paths.create} component={CreateCollectionScreen} />
        <Tab.Screen name={paths.profile} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
