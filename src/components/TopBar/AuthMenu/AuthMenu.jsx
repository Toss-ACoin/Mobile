import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Replace IconButton with TouchableOpacity
const IconButton = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
);

// Replace Icon with custom icon component or Text for simplicity
const Icon = ({ children }) => <Text>{children}</Text>;

// Replace Link with TouchableOpacity for navigation in React Native
const Link = ({ to, children }) => (
  <TouchableOpacity onPress={() => console.log(`Navigating to: ${to}`)}>
    {children}
  </TouchableOpacity>
);

// Define styles
const styles = {
  menuButton: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  menuItem: {
    borderRadius: 8,
    fontWeight: 'bold',
    padding: 12,
  },
  menuItemText: {
    color: 'black',
  },
};

const AuthMenu = () => {
  const handleSignOut = () => {
    // Implement sign-out logic
  };

  return (
    <View>
      <TouchableOpacity onPress={() => console.log('Options button pressed')}>
        <Icon
          style={{
            ...styles.menuButton,
            hover: {
              backgroundColor: 'transparent',
              color: 'red.500',
            },
          }}
        >
          PersonOutlinedIcon
        </Icon>
      </TouchableOpacity>

      {/* MenuList */}
      <View style={{ minWidth: 'fit-content' }}>
        <Link to={paths.profile}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
        </Link>

        <Link to={paths.create}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>Create collection</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
          onPress={handleSignOut}
        >
          <Text style={styles.menuItemText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthMenu;
