import React from 'react';
import { Text, View } from 'react-native';

export const Bubble = ({ data }) => {
  return (
    <>
      {!data ? (
        <Text>You can be the first to donate</Text>
      ) : (
        data.map((value, key) => {
          const numberOfPayments = Number(value.numberOfPayments);

          return (
            <View
              key={key}
              style={{
                alignItems: 'center',
                backgroundColor: 'green',
                borderRadius: 999, // Use a large value to make it a circle
                height: numberOfPayments * 3,
                justifyContent: 'center',
                minHeight: 16,
                minWidth: 16,
                padding: 4,
                width: numberOfPayments * 3,
              }}
            >
              <Text
                style={{
                  fontSize:
                    numberOfPayments > 99
                      ? 24
                      : numberOfPayments > 50
                        ? 18
                        : 14,
                  fontWeight:
                    numberOfPayments > 99
                      ? 'bold'
                      : numberOfPayments > 50
                        ? '600'
                        : 'normal',
                  color: 'white',
                }}
              >
                {value.name}
              </Text>
            </View>
          );
        })
      )}
    </>
  );
};

