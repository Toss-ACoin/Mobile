import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCollectionService } from '../../services/CollectionService';
import { useSessionStatus } from '../../services/SessionService';
import { paths } from '../../utils/paths';

const CreateCollection = ({ navigation }) => {
  const status = useSessionStatus();
  if (status !== 'auth') {
    navigation.navigate(paths.signIn);
    return null;
  }
  const collectionService = useCollectionService();

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
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

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      goal: '2000',
      description: '',
      date: new Date(),
    },
    onSubmit: (values) => {
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
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.createCollectionContainer}>
        <Text style={styles.createCollectionText}>Create your collection</Text>
        <View style={styles.form}>
          <Text style={styles.labelText}>Enter title:</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="gray"
            onChangeText={formik.handleChange('title')}
            value={formik.values.title}
          />
          <Text style={styles.labelText}>Choose category:</Text>
          <TextInput
            style={styles.input}
            placeholder="Category"
            placeholderTextColor="gray"
            onChangeText={formik.handleChange('category')}
            value={formik.values.category}
          />
          <Text style={styles.labelText}>Enter your goal:</Text>
          <TextInput
            style={styles.input}
            placeholder="Goal"
            placeholderTextColor="gray"
            onChangeText={formik.handleChange('goal')}
            keyboardType='numeric'
            value={formik.values.goal}
          />
          <Text style={styles.labelText}>Add description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="gray"
            onChangeText={formik.handleChange('description')}
            value={formik.values.description}
          />
          <Text style={styles.labelText}>Choose end date:</Text>
          <Text
            style={styles.input}
            onPress={() => setShow(true)}
          >{formik.values.date.toLocaleDateString()}</Text>
          {show && (
            <DateTimePicker
              mode='date'
              value={date}
              minimumDate={new Date()}
              onChange={
                (event, selectedDate) => {
                  setDate(selectedDate)
                  formik.setFieldValue('date', selectedDate)
                  setShow(false)
                }
              }
            />
          )}
          <TouchableOpacity onPress={formik.handleSubmit}>
            <View style={styles.createCollectionButton}>
              <Text style={styles.createCollectionButtonText}>Create</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  labelText: {
    color: 'black',
    fontSize: 15,
    marginLeft: 5
  },
});
export default CreateCollection;
