import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useUserService } from '../../../services/UserService';
import Constants from 'expo-constants';

const UserCollectionData = () => {
  const userService = useUserService();
  const [activeSections, setActiveSections] = useState([]);
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
        <Accordion
            activeSections={activeSections}
            onChange={setActiveSections}
            sections={data}
          renderHeader={(section) => ((
            <View>
              <Text style={styles.collectionTitle}>{section.title}</Text>
            </View>
          ))}
          renderContent={(section) => ((
            <View>
              <Text style={styles.detailLabel}>Description: </Text>
              <Text style={styles.detailValue}>{section.description}</Text>
              <Text style={styles.detailLabel}>Goal: </Text>
              <Text style={styles.detailValue}>{section.goal}</Text>
              <Text style={styles.detailLabel}>Collected money: </Text>
              <Text style={styles.detailValue}>{section.collected_money}</Text>
              <Text style={styles.detailLabel}>End date: </Text>
              <Text style={styles.detailValue}>{section.fundraising_end}</Text>
              <Text style={styles.detailLabel}>Availability: </Text>
              <Text style={styles.detailValue}>
                {section.available ? 'Available' : 'Unavailable'}
              </Text>
            </View>
          ))}
          />
        )
        }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Constants.statusBarHeight
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
