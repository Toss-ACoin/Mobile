import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined'; // Assuming this icon is available for React Native
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import CollectionTable from './CollectionTable/CollectionTable';
import { useCollectionService } from '../../services/CollectionService';
import { useQuery } from '@tanstack/react-query';

const CollectionsList = () => {
  const collectionService = useCollectionService();
  const { data, status } = useQuery(
    collectionService.collectionKey(),
    collectionService.collectionAdminList,
    {
      refetchInterval: 10000,
    }
  );

  return (
    <View style={{ alignItems: 'center', flexDirection: 'column', paddingBottom: 16 }}>
      {status === "loading" ? (
        <ActivityIndicator size="large" />
      ) : status === "error" || !data ? (
        <View>
          <SearchOffOutlinedIcon color="red" height={20} width={20} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Sorry, there are no collections
          </Text>
        </View>
      ) : (
        <CollectionTable collectionData={data} />
      )}
    </View>
  );
};

export default CollectionsList;
