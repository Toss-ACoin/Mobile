import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined'; // Assuming this icon is available for React Native
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const CollectionsList = () => {
  // Replace useQuery and other Chakra UI components with their React Native equivalents
  // You might use React Query or other state management libraries compatible with React Native
  const isLoading = false; // Set to true when loading
  const isError = false; // Set to true when there's an error
  const data = []; // Your collection data

  return (
    <View style={{ alignItems: 'center', flexDirection: 'column', paddingBottom: 16 }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : isError || !data ? (
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
