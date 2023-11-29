import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Text,
  View
} from 'react-native';
import { FileGetter } from '../../components/FileGetter/FileGetter';
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

  const handleImageArray = (files) => {
    const filesArray = files.map((file) => {
      return file.file;
    });

    return filesArray;
  };

  const { mutate } = useMutation(collectionService.addCollection);

  const collection = {
    title: '',
    category: '',
    goal: '2000',
    description: '',
    date: '',
  };

  const handleSubmit = () => {
    const values = { ...collection, image: handleImageArray(files) };

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
    <View>
      <View>
        <Text>Create your Collection</Text>
        <View>
          {step === 0 ? (
            <View>
              {/* Other input fields */}
              <Button
                title="Next"
                onPress={() => setStep(1)}
              />
            </View>
          ) : (
            <View>
              <FileGetter files={files} onFileUpload={handleFileUpload} />
              <View>
                <Button
                  title="Back"
                  onPress={() => setStep(0)}
                />
                <Button
                  title="Submit"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CreateCollection;
