import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { useUserService } from '../../../../services/UserService';

const Action = ({ isBaned, id }) => {
  const userService = useUserService();
  const { mutate } = useMutation(userService.toggleUserBlock);

  const handleToggleBan = async () => {
    try {
      await mutate(id);
      ToastAndroid.show('User status changed', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error toggling user block:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleToggleBan} style={{ padding: 8, backgroundColor: '#4CAF50', borderRadius: 4 }}>
      <Text style={{ color: 'white' }}>{isBaned ? 'Unban' : 'Ban'}</Text>
    </TouchableOpacity>
  );
};

export default Action;
