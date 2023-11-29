import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Replace Link with TouchableOpacity for navigation in React Native
const Link = ({ to, children }) => (
  <TouchableOpacity onPress={() => console.log(`Navigating to: ${to}`)}>
    {children}
  </TouchableOpacity>
);

// Define styles
const styles = {
  linkText: {
    hover: {
      color: '#FF6B80',
    },
    transitionDuration: '0.2s',
  },
  menuItem: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
  },
};

const AdminTopBar = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Link to={paths.usersList}>
        <Text style={{ ...styles.linkText, ...styles.menuItem }}>Users</Text>
      </Link>

      <Link to={paths.collectionsList}>
        <Text style={{ ...styles.linkText, ...styles.menuItem }}>
          Collections
        </Text>
      </Link>
    </View>
  );
};

export default AdminTopBar;
