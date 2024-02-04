import { useQuery } from '@tanstack/react-query';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { Spinner } from 'react-native-elements';
import { useCollectionService } from '../../services/CollectionService';
import { Bubble } from './Bubble/Bubble';
import { Donation } from './Donation/Donation';
import { ImgCarousel } from './ImgCarousel/ImgCarousel';
import Constants from 'expo-constants';

export const CollectionPage = ({ navigation, route }) => {
  const { _id } = route.params;
  const collectionService = useCollectionService();

  if (!_id) {
    navigation.navigate(paths.notFound);
    return null
  }

  const { data, status } = useQuery(
    collectionService.collectionKey(`${_id}`),
    collectionService.collection
  );

  if (status === 'error' || !data) {
    // Handle error, navigate to an error page or display an error message
    return <Text>Error</Text>;
  }

  if (status === 'loading') {
    return <Spinner size="large" />;
  }

  const photoSrc = 'https://i.imgur.com/UYiroysl.jpg';

  return (
    <SafeAreaView style={{ paddingHorizontal: 40, paddingBottom: 16, paddingTop: Constants.statusBarHeight, flex: 1 }}>
      <ScrollView >
        <View style={{ flexDirection: 'column', gap: 6, height: "100%" }}>
          <ImgCarousel imgArray={[photoSrc, photoSrc, photoSrc]} height={200} />
          <View style={{ flexDirection: 'column', gap: 6, }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{data.title}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {`${data.collected_money}zł of ${data.goal}zł`}
            </Text>
            <View style={{ borderRadius: 10, height: 9, backgroundColor: 'red', width: '100%' }} />
            <Donation collectionId={data.id} name={data.title} _id={_id} />
          </View>
        </View>
        <View style={{ flexDirection: 'column', gap: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Description</Text>
          <View style={{ flexDirection: 'column', fontSize: 20, gap: 4 }}>
            <Text>{data.description}</Text>
          </View>
        </View>
        <View style={{ borderColor: '#767777', borderRadius: 6, borderWidth: 1, justifyContent: 'center', overflow: 'hidden', padding: 6 }}>
          <Bubble data={data.transactions} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
