import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AccordionList } from 'react-native-collapsible'; // You need to install this library
import { useUserService } from '../../../services/UserService';

const UserCollectionData = () => {
  const userService = useUserService();
  const { data, status } = useQuery(
    userService.userCollectionKey(),
    userService.getUserCollections
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your collections</Text>
      {status === 'loading' ? (
        <Text>Loading...</Text>
      ) : status === 'error' || !data ? (
        <Text>Error</Text>
      ) : data.length <= 0 ? (
        <View style={styles.noCollectionsContainer}>
          <Text>You do not have any collections</Text>
        </View>
      ) : (
        <AccordionList
          list={data}
          headerKey="title"
          contentKey="description"
          renderHeader={(item) => (
            <Text style={styles.collectionTitle}>{item.title}</Text>
          )}
          renderContent={(item) => (
            <View style={styles.collectionDetails}>
              <Text style={styles.detailLabel}>Description: </Text>
              <Text style={styles.detailValue}>{item.description}</Text>
              <Text style={styles.detailLabel}>Goal: </Text>
              <Text style={styles.detailValue}>{item.goal}</Text>
              <Text style={styles.detailLabel}>Collected money: </Text>
              <Text style={styles.detailValue}>{item.collected_money}</Text>
              <Text style={styles.detailLabel}>End date: </Text>
              <Text style={styles.detailValue}>{item.fundraising_end}</Text>
              <Text style={styles.detailLabel}>Availability: </Text>
              <Text style={styles.detailValue}>
                {item.available ? 'Available' : 'Unavailable'}
              </Text>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  noCollectionsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  collectionDetails: {
    marginVertical: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
  },
});

export default UserCollectionData;
