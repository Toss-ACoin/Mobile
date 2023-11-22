import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { paths } from "../../../utils/paths";

// Replace Link with TouchableOpacity for navigation in React Native
const Link = ({ to, children }) => (
  <TouchableOpacity onPress={() => console.log(`Navigating to: ${to}`)}>
    {children}
  </TouchableOpacity>
);

// Define styles
const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    gap: 8,
  },
  linkText: {
    color: "black",
  },
});

const UserTopBar = () => {
  return (
    <View style={styles.flexContainer}>
      <Link to={paths.collections}>
        <Text style={styles.linkText}>Collections</Text>
      </Link>
      <Link to={paths.about}>
        <Text style={styles.linkText}>About us</Text>
      </Link>
    </View>
  );
};

export default UserTopBar;
