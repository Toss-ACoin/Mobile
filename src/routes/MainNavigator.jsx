import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import CreateCollection from './CreateCollection/CreateCollection';
import LandingPage from './LandingPage/LandingPage';
import UserPanel from './UserPanel/UserPanel';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={LandingPage} />
        <Tab.Screen name="CreateCollection" component={CreateCollection} />
        <Tab.Screen name="Profile" component={UserPanel} />
      </Tab.Navigator>
  );
};

export default MainNavigator