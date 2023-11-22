import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { usePaymentService } from '../../services/PaymentService';

const Payments = () => {
  const paymentService = usePaymentService();
  const { mutate } = useMutation(paymentService.sendPayment);

  return (
    <TouchableOpacity onPress={() => mutate()}>
      <Text>Pay</Text>
    </TouchableOpacity>
  );
};

export default Payments;
