import React from 'react';
import { Image, Linking, ScrollView, Text, View } from 'react-native';
import lp from './assets/lp.png';

const AboutUs = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Image
        source={lp}
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,.6)',
          borderRadius: 20,
          margin: 10,
          padding: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          About Us
        </Text>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'justify' }}>
          {`At TossACoin, we are passionate about making a positive difference in the lives of animals.
          We believe that every animal deserves love, care, and a chance at a happy and healthy life.
          Our mission is to support animal welfare causes through fundraising initiatives and community engagement.`}
        </Text>
        {/* ... Other text components ... */}
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            padding: 10,
            textAlign: 'justify',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Our Regulations: </Text>
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => openLink('path to Regulations.pdf')}
          >
            Open Regulations
          </Text>
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            padding: 10,
            textAlign: 'justify',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Our Policy: </Text>
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => openLink('path to Policy.pdf')}
          >
            Open Policy
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
