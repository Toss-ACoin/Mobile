import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const Preview = ({ files, removeFile }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollArea}
      >
        {files?.map((file, key) => {
          return (
            <View key={key} style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => removeFile(file)}
                style={styles.removeButton}
              >
                <ClearRoundedIcon fill="red" />
              </TouchableOpacity>
              <Image source={{ uri: file.preview }} style={styles.image} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'darkgray',
    borderRadius: 8,
    borderWidth: 1,
    height: 64,
    paddingVertical: 2,
  },
  scrollArea: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 4,
  },
  removeButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
  image: {
    width: 96,
    height: 64,
    borderRadius: 8,
  },
});

export default Preview;
