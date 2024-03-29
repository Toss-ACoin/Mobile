import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import LogOutIcon from 'react-native-vector-icons/MaterialIcons'
import { useSessionStatus, useAuthService } from '../../../services/SessionService';
import { useUserService } from '../../../services/UserService';
import { paths } from '../../../utils/paths';
import Constants from 'expo-constants';

const UserData = () => {
  const sessionStatus = useSessionStatus();
  const navigation = useNavigation()
  if (sessionStatus !== 'auth') {
    navigation.navigate(paths.signIn);
    return null;
  }
  const userService = useUserService();
  const sessionService = useAuthService();
  const { data, status } = useQuery(userService.userListKey(), userService.getUserDate);

  const { mutate } = useMutation(sessionService.signOut)
  const handleLogOut = () => {
    mutate();
    navigation.navigate(paths.signIn);
  }

  return (
    <ScrollView style={styles.container}>
      {status === 'loading' ? (
        <Text>Loading...</Text>
      ) : status === 'error' || !data ? (
        <Text>Error</Text>
      ) : (
        <>
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{data.name}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.sectionTitle}>User Information</Text>
          <View style={styles.userDetailsContainer}>
            <View style={styles.userDetailRow}>
              <Text style={styles.userDetailLabel}>Name</Text>
              <Text style={styles.userDetailValue}>{data.name}</Text>
            </View>
            <View style={styles.userDetailRow}>
              <Text style={styles.userDetailLabel}>Surname</Text>
              <Text style={styles.userDetailValue}>{data.surname}</Text>
            </View>
            <View style={styles.userDetailRow}>
              <Text style={styles.userDetailLabel}>Email</Text>
              <Text style={styles.userDetailValue}>{data.email}</Text>
            </View>
            <View style={styles.userDetailRow}>
              <Text style={styles.userDetailLabel}>Phone number</Text>
              <Text style={styles.userDetailValue}>{data.phone_number}</Text>
            </View>
            <View style={styles.userDetailRow}>
              <Text style={styles.userDetailLabel}>Date of birth</Text>
              <Text style={styles.userDetailValue}>{data.birth_date}</Text>
            </View>
            <View style={styles.userDetailRow}>
              <Text style={styles.userDetailLabel}>Bank account number</Text>
              <Text style={styles.userDetailValue}>{data.bank_number}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.logOutButton}>
              <Button
                title="Log Out"
                icon={<LogOutIcon name="logout" size={20} color="white" />}
                buttonStyle={{ backgroundColor: 'red' }}
                onPress={handleLogOut}
              />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  userInfoText: {
    marginLeft: 2,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 18,
  },
  divider: {
    marginVertical: 10,
  },
  logOutButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  userDetailsContainer: {
    marginHorizontal: 15,
  },
  userDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userDetailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetailValue: {
    fontSize: 16,
  },
});

export default UserData;
