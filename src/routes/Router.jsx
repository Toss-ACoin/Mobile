import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';
import { paths } from '../utils/paths';

import AboutUs from './AboutUs/AboutUs';
import Collections from './Collections/Collections';
import CollectionsList from './CollectionsList/CollectionsList';
import ContentWrapper from './ContentWrapper/ContentWrapper';
import CreateCollection from './CreateCollection/CreateCollection';
import LandingPage from './LandingPage/LandingPage';
import Payments from './Payments/Payments';
import SignIn from './SignIn/SignIn';
import SignUpPage from './SignUpPage/SignUpPage';
import UserCollections from './UserCollections/UserCollections';
import UserPanel from './UserPanel/UserPanel';
import UsersList from './UsersList/UsersList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ContentWrapper} />
      <Tab.Screen name="Collections" component={Collections} />
      <Tab.Screen name="Profile" component={UserPanel} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Suspense fallback={null}>
        <Stack.Navigator initialRouteName={paths.signIn}>
          <Stack.Screen name={paths.signIn} component={SignIn} />
          <Stack.Screen name={paths.signUp} component={SignUpPage} />
          {/* <Stack.Screen name={paths.contentWrapper} component={MainNavigator} /> */}
          <Stack.Screen name={paths.landingPage} component={LandingPage} />
          {/* <Stack.Screen name={paths.collection} component={CollectionPage} /> */}
          <Stack.Screen name={paths.about} component={AboutUs} />
          <Stack.Screen name={paths.payment} component={Payments} />
          {/* <Stack.Screen name={paths.protected} component={Protected} /> */}
          {/* <Stack.Screen name={paths.adminContentWrapper} component={AdminContentWrapper} /> */}
          <Stack.Screen name={paths.usersList} component={UsersList} />
          <Stack.Screen name={paths.collectionsList} component={CollectionsList} />
          <Stack.Screen name={paths.profile} component={UserPanel} />
          <Stack.Screen name={paths.myCollections} component={UserCollections} />
          <Stack.Screen name={paths.create} component={CreateCollection} />
        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  );
};

export default Router;
