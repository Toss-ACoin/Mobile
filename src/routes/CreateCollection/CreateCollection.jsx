import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Formik } from 'formik';
import { useCollectionService } from '../../services/CollectionService';
import { useSessionStatus } from '../../services/SessionService';
import { paths } from '../../utils/paths';

const CreateCollection = ({navigation}) => {
  const status = useSessionStatus();
  if (status !== 'auth') {
    navigation.navigate(paths.signIn);
    return null;
  }
  const collectionService = useCollectionService();

  const [step, setStep] = useState(0);
  const [files, setFiles] = useState([]);
  const handleFileUpload = (value, isRemoving) => {
    if (isRemoving) {
      setFiles(value);
      return;
    }

    setFiles((prev) => (prev ? prev.concat(value) : value));
  };

  const { data } = useQuery(
    collectionService.categoryKey(),
    collectionService.getCategory
  );


  const { mutate } = useMutation(collectionService.addCollection);

  const collection = {
    title: '',
    category: '',
    goal: '2000',
    description: '',
    date: '',
  };

  const handleSubmit = () => {
    const values = { ...collection };

    mutate(
      values,
      {
        onError: () => {
          // Handle error
        },
        onSuccess: () => {
          // Handle success
          navigation.navigate(paths.collections);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.createCollectionContainer}>
        <Text style={styles.createCollectionText}>Create your collection</Text>
           <Formik initialValues={ {
    title: '',
    category: '',
    goal: '',
    description: '',
    date: '',
    }} onSubmit={handleSubmit}>
      {({ handleChange, handleSubmit, values }) => (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="gray"
                onChangeText={handleChange('title')}
                value={values.title}
              />
              <TextInput
                style={styles.input}
                placeholder="Category"
                placeholderTextColor="gray"
                onChangeText={handleChange('category')}
                value={values.category}
              />
              <TextInput
                style={styles.input}
                placeholder="Goal"
                placeholderTextColor="gray"
                onChangeText={handleChange('goal')}
                keyboardType='numeric'
                value={values.goal}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="gray"
                onChangeText={handleChange('description')}
                value={values.description}
              />
              <TextInput
                style={styles.input}
                placeholder="End Date"
                placeholderTextColor="gray"
                onChangeText={handleChange('date')}
                value={values.date}
              />
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.createCollectionButton}>
                  <Text style={styles.createCollectionButtonText}>Create</Text>
                </View>
              </TouchableOpacity>
            </View>
      )}
          </Formik>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  createCollectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  createCollectionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  input: {
    borderColor: '#1A6F00',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'black',
  },
  createCollectionButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createCollectionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default CreateCollection;
