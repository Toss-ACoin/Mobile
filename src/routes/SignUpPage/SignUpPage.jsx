import { useNavigation } from '@react-navigation/native'; // Make sure to install @react-navigation/native
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAnonService, useSessionStatus } from '../../services/SessionService';
import { paths } from '../../utils/paths';

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
      {/* Replace with navigation.goBack() if you're using StackNavigator */}
      <TouchableOpacity onPress={() => navigation.navigate(paths.landingPage)}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: 'red' }]}>Toss</Text>
          <Text style={styles.logoText}>A</Text>
          <Text style={[styles.logoText, { color: 'green' }]}>Coin</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={[styles.background, styles.bgImage]}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subText}>To check out your collections</Text>
          <TouchableOpacity onPress={() => navigation.navigate(paths.signIn)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Login to Your Account</Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: '#1A202C',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  bgImage: {
    // Handle background image here
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    fontWeight: 'normal',
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
  logoContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 7,
    left: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
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
