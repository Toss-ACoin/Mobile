import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSessionStatus } from '../../services/SessionService';
import { paths } from '../../utils/paths';
const SignIn = ({navigation}) => {
  const status = useSessionStatus();

  if (status === 'auth') {
    // Use navigation.replace() if you're using StackNavigator
    navigation.navigate(paths.profile);
    return null;
  }

  // const anonService = useAnonService();
  const { mutate } = useMutation(() => console.log('anonService.signIn'));

  const handleSubmit = (values) => {
      mutate(values, {
        onError: (error) => {
          // Handle errors, e.g., display a toast
          console.error(error);
        },
      });

  };

  const handleFacebookLogin = (tokenResponse) => {
    // Handle successful login, e.g., send the token to your backend
    console.log('Facebook login success:', tokenResponse);
  };

  const handleGoogleLogin = (tokenResponse) => {
    // Handle successful login, e.g., send the token to your backend
    console.log('Google login success:', tokenResponse);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(paths.landingPage)}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: 'red' }]}>Toss</Text>
          <Text style={styles.logoText}>A</Text>
          <Text style={[styles.logoText, { color: 'green' }]}>Coin</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Login to Your Account</Text>
          <Formik initialValues={ {
      email: '',
      password: '',
    }} onSubmit={handleSubmit}>
      {({ handleChange, handleSubmit, values }) => (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="white"
                onChangeText={handleChange('email')}
                value={values.email}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                onChangeText={handleChange('password')}
                secureTextEntry
                value={values.password}
              />
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
              </View>
              {/* <View style={styles.socialButtonsContainer}>
                <Facebook onLoginSuccess={handleFacebookLogin} />
                <Google onSuccess={handleGoogleLogin} />

              </View> */}
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.signInButton}>
                  <Text style={styles.signInButtonText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
      )}
          </Formik>
        </View>
        <ImageBackground source={require('./assets/bg.svg')} style={styles.imageBackground}>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Do you have to create a collection?</Text>
            <Text style={styles.subText}>Create an account to start collecting money from around the world</Text>
            <TouchableOpacity onPress={() => navigation.navigate(paths.signUp)}>
              <View style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
  },
  logoContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 7,
    left: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  signInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'white',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  dividerText: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 8,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: '#68D391',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  signUpContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#68D391',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignIn;
