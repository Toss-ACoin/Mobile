import { useNavigation } from '@react-navigation/native'; // Make sure to use navigation from @react-navigation/native
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { paths } from '../../utils/paths';
import lp from './assets/lp.png';

const LandingPage = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={lp}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
      }}
    >
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, marginBottom: 16 }}>
          Create your collection now
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(paths.create)}
          style={{
            backgroundColor: 'red',
            borderWidth: 1,
            borderColor: 'dark.400',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>
            Set up a collection
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LandingPage;
