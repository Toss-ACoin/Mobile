import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Assuming that `Action` is a React component you've defined for React Native

const userHeaders = [
  'Id',
  'Title',
  'Goal',
  'Collected money',
  'Owner',
  'Start date',
  'End date',
  'Action',
];

const CollectionTable = ({ collectionData }) => {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.title}</Text>
      <Text style={styles.cell}>{item.goal}</Text>
      <Text style={styles.cell}>{item.collected_money}</Text>
      <Text style={styles.cell}>
        {item.owner_surname
          ? `${item.owner_name} ${item.owner_surname}`
          : item.owner_name}
      </Text>
      <Text style={styles.cell}>{item.fundraising_start}</Text>
      <Text style={styles.cell}>{item.fundraising_end}</Text>
      <View style={styles.cell}>
        <Action id={item.id} isActive={item.available} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {userHeaders.map((header, index) => (
          <Text key={index} style={styles.headerCell}>
            {header}
          </Text>
        ))}
      </View>
      <FlatList
        data={collectionData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerCell: {
    flex: 1,
    paddingVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    paddingVertical: 12,
    textAlign: 'center',
  },
});

export default CollectionTable;
