import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

const Facebook = ({ onLoginSuccess }) => {
  const signIn = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        // User canceled the login process
        console.log('Login canceled');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          onLoginSuccess(data);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={signIn}>
      <Text style={styles.buttonText}>f</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#4267b2',
    borderRadius: 100,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Facebook;
