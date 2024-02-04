import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  VirtualizedList
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { } from 'react-native-web';
import { useDebounce } from '../../hooks/useDebounce';
import { useCollectionService } from '../../services/CollectionService';
import { paths } from '../../utils/paths';
import Constants from 'expo-constants';

const Collections = ({ navigation }) => {
  const collectionService = useCollectionService();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [filterDate, setFilterData] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [filters, setFilter] = useState([])
  const debouncedSetQueryFilter = useDebounce((query) => setQuery(query), 1000);
  const { data, status, isLoading } = useQuery(
    collectionService.collectionListKey({ query }),
    collectionService.collectionList
  );


  useEffect(() => {
    if (data && data.length > 0) {
      setFilterData(data);
      setAvailableFilters(data.flatMap((record) => record.categories.map(cat => cat)));
    }
  }, [data])

  useEffect(() => {
    debouncedSetQueryFilter(search);
  }, [search]);

  useEffect(() => {
    if (filters.length > 0) {
      setFilterData(data.filter((record) => record.categories.some((category) => filters.some((filter) => filter === category))))
    }
  }, [filters])

  const handleFilterSet = (isChecked, filter) => {
    if (isChecked) {
      setFilter(filters.concat([filter]))
    }
    else {
      setFilter(filters.filter((fil) => fil !== filter))
    }
  }

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const card = (cardData, navigation) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(paths.collection, { _id: cardData.id })}
      style={{
        backgroundColor: 'white',
        borderColor: '#A1A2A2',
        borderRadius: 8,
        borderWidth: 2,
        cursor: 'pointer',
        flexDirection: 'column',
        height: 324,
        overflow: 'hidden',
        marginHorizontal: 20,
        marginVertical: 10
      }}
    >
      <Image
        source={require('../CollectionPage/assets/img.png')}
        style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, height: '60%' }}
      />
      <View style={{ flexDirection: 'column', height: '40%', justifyContent: 'space-between', padding: 4 }}>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 28, fontWeight: 'bold' }}>
          {cardData.title}
        </Text>
        <View style={{ height: 8, borderRadius: 8, backgroundColor: 'red', width: '100%' }}>
          <View
            style={{
              height: 8,
              borderRadius: 8,
              backgroundColor: 'white',
              width: `${((cardData.collected_money / cardData.goal) * 100).toFixed(2)}%`,
            }}
          />
        </View>
        <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
          {cardData.collected_money}zł of {cardData.goal}zł
        </Text>
      </View>
    </TouchableOpacity>
  )


  return (
    <View style={{ alignItems: 'center', flexDirection: 'column', paddingBottom: 16, paddingTop: Constants.statusBarHeight }}>
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginVertical: 6,
          width: '30%',
        }}
      >
        <TouchableOpacity>
          {/* <SearchOutlinedIcon /> */}
        </TouchableOpacity>

        <TextInput
          style={{
            borderColor: '#1A6F00',
            borderRadius: 4,
            borderWidth: 2,
            fontSize: 18,
            fontWeight: 'semibold',
            marginTop: 5,
            width: '200%',
          }}
          placeholder="Search"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />

      </View>
      {status === 'loading' ? (
        <Text>Loading...</Text>
      ) : status === 'error' || !filterDate ? (
        <Text>Error</Text>
      ) : filterDate.length <= 0 ? (
        <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center', width: '100%' }}>
          <View
            style={{
              borderRadius: 6,
              padding: 4,
              textAlign: 'center',
            }}
          >
            <Text
              style={{
                color: 'gray',
                fontSize: 20,
                fontWeight: 'semibold',
                textAlign: 'center',
              }}
            >
              Sorry we couldn't find any matches for {query}
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate(paths.create)}>
            <View
              style={{
                backgroundColor: '#004D00',
                borderRadius: 6,
                color: 'white',
                fontSize: 24,
                fontWeight: 'semibold',
                marginTop: 20,
                padding: 6,
                textAlign: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Create your collection here</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <SafeAreaView style={{ justifyContent: 'center' }}>
          <FlatList
            data={availableFilters}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
               <BouncyCheckbox style={{marginTop: 10}} onPress={(isChecked) => handleFilterSet(isChecked, item)} text={item} />
            )
            }
          />
          <VirtualizedList
            style={{
              flex: 1,
              height: '20%'
            }}
            data={filterDate}
            renderItem={({ item }) => card(item, navigation)}
            keyExtractor={(item) => item.id}
            initialNumToRender={4}
            getItemCount={(_data) => filterDate.length}
            getItem={(_data, index) => filterDate[index]}
          />
        </SafeAreaView>
      )
      }
    </View >
  );
};

export default Collections;
