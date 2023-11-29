import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDebounce } from '../../hooks/useDebounce';
import { useCollectionService } from '../../services/CollectionService';
import { paths } from '../../utils/paths';

const Collections = () => {
  const navigation = useNavigation();
  const collectionService = useCollectionService();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const debouncedSetQueryFilter = useDebounce((query) => setQuery(query), 1000);
  const { data, status, isLoading } = useQuery(
    collectionService.collectionListKey({ query }),
    collectionService.collectionList
  );

  useEffect(() => {
    debouncedSetQueryFilter(search);
  }, [search]);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <View style={{ alignItems: 'center', flexDirection: 'column', paddingBottom: 16 }}>
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
            fontSize: 20,
            fontWeight: 'semibold',
            marginTop: 6,
            width: '100%',
          }}
          placeholder="Search"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
      </View>

      {status === 'loading' ? (
        <Text>Loading...</Text>
      ) : status === 'error' || !data ? (
        <Text>Error</Text>
      ) : data.length <= 0 ? (
        <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center', width: '100%' }}>
          <View
            style={{
              backgroundColor: '#004D00',
              borderRadius: 'md',
              padding: 4,
              textAlign: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 24,
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
                borderRadius: 'md',
                color: 'white',
                fontSize: 24,
                fontWeight: 'semibold',
                marginTop: 4,
                padding: 4,
                textAlign: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Create your collections</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={{
            columnGap: 8,
            gap: 8,
            height: '100%',
            justifyContent: 'center',
            minChildWidth: 72,
            paddingHorizontal: '24%',
            paddingVertical: 8,
            width: '100%',
          }}
        >
          {data.map((item, key) => {
            const endsIn = new Date(item.fundraising_end).getTime() - new Date().getTime();

            return (
              <TouchableOpacity
                key={key}
                onPress={() => navigation.navigate(paths.collection(item.id))}
                style={{
                  backgroundColor: 'white',
                  borderColor: '#A1A2A2',
                  borderRadius: 'lg',
                  borderWidth: 2,
                  cursor: 'pointer',
                  flexDirection: 'column',
                  height: 96,
                  overflow: 'hidden',
                  width: 72,
                }}
              >
                <Image
                  source={require('../CollectionPage/assets/img.png')}
                  style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 48 }}
                />
                <View style={{ flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: 4 }}>
                  <Text numberOfLines={1} style={{ color: 'black', fontSize: 28, fontWeight: 'bold' }}>
                    {item.title}
                  </Text>
                  <View style={{ height: 3, borderRadius: 'lg', backgroundColor: 'red', width: '100%' }}>
                    <View
                      style={{
                        height: '100%',
                        width: `${((item.collected_money / item.goal) * 100).toFixed(2)}%`,
                      }}
                    />
                  </View>
                  <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
                    {item.collected_money}zł of {item.goal}zł
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      {!isLoading && data && (
        <ScrollView horizontal style={{ flexDirection: 'row', marginTop: 3 }}>
          {data.map((value, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => setPage(key)}
              style={{
                backgroundColor: 'green.500',
                borderRadius: 'md',
                marginLeft: 3,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Text style={{ color: 'white' }}>{value}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Collections;
