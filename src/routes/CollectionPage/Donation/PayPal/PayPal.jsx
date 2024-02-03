import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Button, Linking } from 'react-native';
import { useCollectionService } from '../../../../services/CollectionService';

export const PayPal = ({ value, name, isDisable }) => {
  const collectionService = useCollectionService();
  const { mutate } = useMutation(collectionService.donate);

  const currency = 'PLN';
  const amount = value ? (Number(value) * 100).toString() : '0';


  const handlePayment = () => {
    const value = { amount, name };
    mutate(
      value,
      {
        onError: () => {
          // Handle error
        },
        onSuccess: (url) => {
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          })

          // ToastAndroid.show(
          //   `Whooo u donate ${value}zł to ${name}`,
          //   ToastAndroid.SHORT
          // );
        },
      }
    );
  }


  return (
    <Button
      style={{ height: 40, color: 'white', layout: 'horizontal' }}
      disabled={isDisable}
      onPress={handlePayment}
      title='Donate'
    />
  );
};
