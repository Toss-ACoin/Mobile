import React from 'react';
import { StyleSheet, View } from 'react-native';
import Sidebar from '../../routes/UserPanel/Sidebar/Sidebar';
import UserCollectionData from './UserCollectionData/UserCollectionData';

const UserCollections = () => {
  return (
    <View style={styles.container}>
      <Sidebar />
      <UserCollectionData />
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

export default UserCollections;
