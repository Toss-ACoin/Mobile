import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TopBar } from '../../components/TopBar/TopBar';

const ContentWrapper = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.outletContainer}>
        {/* Use React Navigation to navigate between screens */}
        {navigation && navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        )}
        <Outlet />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outletContainer: {
    flex: 1,
    padding: 16,
  },
});

export default ContentWrapper;
