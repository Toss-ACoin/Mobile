import { useNavigation } from '@react-navigation/native'; // Make sure to install @react-navigation/native
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAnonService, useSessionStatus } from '../../services/SessionService';
import { paths } from '../../utils/paths';
import Constants from 'expo-constants';

const SignUpPage = () => {
  const navigation = useNavigation();
  const status = useSessionStatus();

  if (status === 'auth') {
    navigation.replace(paths.profile);
    return null;
  }

  const anonService = useAnonService();
  const { mutate } = useMutation(anonService.signUp);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
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
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.subText}>To check out your collections</Text>
            <TouchableOpacity onPress={() => navigation.navigate(paths.signIn)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Create Your Account</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="white"
                onChangeText={formik.handleChange('name')}
                value={formik.values.name}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="white"
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                onChangeText={formik.handleChange('password')}
                secureTextEntry
                value={formik.values.password}
              />
              {/* Add social login buttons here */}
              <TouchableOpacity onPress={formik.handleSubmit}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
    paddingTop: Constants.statusBarHeight
  },
  logoContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 5,
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
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#68D391',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  formTitle: {
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
});

export default SignUpPage;
