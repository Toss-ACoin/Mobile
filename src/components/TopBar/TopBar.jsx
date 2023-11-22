import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Replace Link with TouchableOpacity for navigation in React Native
const Link = ({ to, children }) => (
  <TouchableOpacity onPress={() => console.log(`Navigating to: ${to}`)}>
    {children}
  </TouchableOpacity>
);

// Define styles
const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    height: 80,
    justifyContent: 'space-between',
    padding: 16,
  },
  tossText: {
    fontSize: 24,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'red',
  },
  coinText: {
    color: 'green',
  },
  authButton: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});

const TopBar = () => {
  return (
    <View style={styles.flexContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Link to={paths.landingPage}>
          <View style={styles.tossText}>
            <Text>Toss</Text>
            <Text style={styles.coinText}>A</Text>
            <Text style={styles.tossText}>Coin</Text>
          </View>
        </Link>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {/* Render UserTopBar or AdminTopBar based on authentication status */}
          <Text>UserTopBar or AdminTopBar</Text>
        </View>
      </View>
      {/* Render AuthMenu or Sign In/Up buttons based on session status */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Link to={paths.signIn}>
          <Text style={[styles.authButton, { backgroundColor: 'green', color: 'white' }]}>
            Sign In
          </Text>
        </Link>
        <Link to={paths.signUp}>
          <Text style={[styles.authButton, { backgroundColor: 'red', color: 'white' }]}>
            Sign Up
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default TopBar;
