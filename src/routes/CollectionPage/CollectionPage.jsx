import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Spinner } from 'react-native-elements';
import { useCollectionService } from '../../services/CollectionService';
import { useCollectionId } from '../../utils/paths';
import { Bubble } from './Bubble/Bubble';
import { Donation } from './Donation/Donation';
import { ImgCarousel } from './ImgCarousel/ImgCarousel';
import photo from './assets/img.png';

const CollectionPage = () => {
  const id = useCollectionId();
  const collectionService = useCollectionService();

  if (!id) {
    // You might want to handle this case differently in React Native
    // Maybe navigate to an error page or display an error message
    return null;
  }

  const { data, status } = useQuery(
    collectionService.collectionKey(`${id}`),
    collectionService.collection
  );

  if (status === 'loading') {
    return <Spinner size="large" />;
  }

  if (status === 'error' || !data) {
    // Handle error, navigate to an error page or display an error message
    return <Text>Error</Text>;
  }

  return (
    <ScrollView style={{ paddingHorizontal: 40, paddingVertical: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8, maxHeight: 'calc(100vh - 80px - 128px)', maxWidth: 'calc(100vw - 256px)' }}>
        <ImgCarousel imgArray={[photo, photo, photo]} />
        <View style={{ flexDirection: 'column', gap: 6, maxHeight: 560 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{data.title}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {`${data.collected_money}zł of ${data.goal}zł`}
          </Text>
          <View style={{ borderRadius: 10, height: 9, backgroundColor: 'red', width: '100%' }} />
          <Donation collectionId={data.id} name={data.title} />
        </View>
      </View>
      <View style={{ flexDirection: 'column', gap: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Description</Text>
        <View style={{ flexDirection: 'column', fontSize: 20, gap: 4 }}>
          <Text>{data.description}</Text>
        </View>
      </View>
      <View style={{ borderColor: 'dark.200', borderRadius: 'md', borderWidth: 1, justifyContent: 'center', overflow: 'hidden', padding: 6 }}>
        <Bubble data={data.transactions} />
      </View>
    </ScrollView>
  );
};

export default CollectionPage;
