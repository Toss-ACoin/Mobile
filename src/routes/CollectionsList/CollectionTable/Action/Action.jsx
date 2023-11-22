import { useCollectionService } from '@services/CollectionService';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Text, ToastAndroid, TouchableOpacity } from 'react-native';

export const Action = ({ isActive, id }) => {
  const collectionService = useCollectionService();
  const { mutate } = useMutation(collectionService.toggleCollectionAvailable);

  const handleToggleBan = async () => {
    try {
      await mutate(id);
      ToastAndroid.show('Collection status changed', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(`Error: ${error}`, ToastAndroid.LONG);
    }
  };

  return (
    <TouchableOpacity onPress={handleToggleBan}>
      <Text>{isActive ? 'Deactivate' : 'Activate'}</Text>
    </TouchableOpacity>
  );
};
