import React from 'react';
import { StyleSheet, View } from 'react-native';
import Sidebar from './Sidebar/Sidebar';
import UserData from './UserData/UserData';

const UserPanel = () => {
  return (
    <View style={styles.container}>
      <UserData />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent', // Set background color if needed
  },
});

export default UserPanel;
