import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { paths } from '../../../utils/paths';
import Constants from 'expo-constants';

const Sidebar = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate(paths.profile);
  };

  const navigateToMyCollections = () => {
    navigation.navigate(paths.myCollections);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Text style={styles.heading}>Menu</Text>
        <TouchableOpacity onPress={navigateToProfile}>
          <Text style={styles.menuItem}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToMyCollections}>
          <Text style={styles.menuItem}>My Collections</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white', // Set your desired background color
    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 2.5,
    paddingVertical: 8,
    textAlign: 'center',
    width: '30%',
    paddingTop: Constants.statusBarHeight
  },
  menuContainer: {
    flexDirection: 'column',
    padding: 15,
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuItem: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default Sidebar;
