import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const FileGetter = ({ files, onFileUpload }) => {
  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        const newFiles = [
          ...files,
          {
            file: response,
            preview: response.uri || '',
          },
        ];
        onFileUpload(newFiles, false);
      }
    });
  };

  const removeFile = (file) => {
    const newFiles = files?.filter((currFile) => currFile !== file);
    if (newFiles) {
      onFileUpload(newFiles, true);
    }
  };

  useEffect(() => {
    // Make sure to handle any cleanup here, e.g., revokeObjectURL for previews
    return () => {
      files?.forEach((file) => {
        // Perform cleanup as needed, e.g., URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleImagePicker}
        style={styles.uploadContainer}
      >
        <ArrowUpwardRoundedIcon fill="#5A5A5A" />
        <Text style={styles.uploadText}>
          Upload pictures, drag some files, or click to select
        </Text>
      </TouchableOpacity>
      {files && files.length > 0 && (
        <View style={styles.previewContainer}>
          {files.map((file, key) => (
            <View key={key} style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => removeFile(file)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
              <Image source={{ uri: file.preview }} style={styles.image} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  uploadContainer: {
    borderColor: '#5A5A5A',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    marginVertical: 10,
  },
  uploadText: {
    color: '#5A5A5A',
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 50,
    padding: 4,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

export default FileGetter;
