import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { paths } from '../utils/paths';
import { CollectionPage } from './CollectionPage/CollectionPage';
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
const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) =>
    getTabBarIcon(route, focused, color, size),

  tabBarActiveTintColor: 'red',
  tabBarInactiveTintColor: 'gray',
});

const Router = () => {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


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



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


export default Router;
