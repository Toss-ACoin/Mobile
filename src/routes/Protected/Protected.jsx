import { useIsFocused, useNavigation } from '@react-navigation/native'; // Make sure to install @react-navigation/native
import { createStackNavigator } from '@react-navigation/stack'; // Import the necessary navigator
import React from 'react';
import { View } from 'react-native';
import { useSessionStatus } from '../../services/SessionService';

import { paths } from '../../utils/paths';
import SignIn from '../SignIn/SignIn'; // Import your SignIn component

const Stack = createStackNavigator(); // Create a stack navigator

const Protected = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const status = useSessionStatus();

  if (status !== 'auth') {
    // Redirect to SignIn screen if not authenticated
    return <SignIn />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Wrap your content with NavigationContainer */}
      <NavigationContainer>
        {/* Use Stack.Navigator for nested navigation */}
        <Stack.Navigator>
          {/* Use Stack.Screen for each screen */}
          <Stack.Screen name={paths.protected} component={ProtectedContent} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const ProtectedContent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Your protected content goes here */}
    </View>
  );
};

export default Protected;
