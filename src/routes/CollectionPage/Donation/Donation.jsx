import React, { useState } from 'react';
import { Button, CheckBox, View } from 'react-native';
import Modal from 'react-native-modal';
import PayPal from './PayPal/PayPal'; // Make sure to import your PayPal component

const Donation = ({ name, collectionId }) => {
  const [amount, setAmount] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const amountArray = [5, 10, 20, 50, 100, 200];
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Button title="DONATE" onPress={toggleModal} />

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            {amountArray.map((value, key) => (
              <Button
                title={`${value}zł`}
                key={key}
                onPress={() => setAmount(value)}
              />
            ))}
          </View>

          <CheckBox
            value={!isDisable}
            onValueChange={() => setIsDisable((prev) => !prev)}
          />

          <PayPal
            collectionId={collectionId}
            isDisable={isDisable}
            name={name}
            value={amount}
          />

          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </>
  );
};

export default Donation;
