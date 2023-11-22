import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Google = ({ onSuccess }) => {
  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     onSuccess(userInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // User canceled the login process
  //       console.log('SIGN_IN_CANCELLED');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // Login process is in progress
  //       console.log('IN_PROGRESS');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // Play services are not available
  //       console.log('PLAY_SERVICES_NOT_AVAILABLE');
  //     } else {
  //       console.log('Error:', error.message);
  //     }
  //   }
  // };

  return (
    <TouchableOpacity style={styles.button} onPress={signIn}>
      <Text style={styles.buttonText}>G</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DD5144',
    borderRadius: 100,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Google;
