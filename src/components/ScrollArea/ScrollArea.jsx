import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const ScrollArea = ({ children, thumbColor, isHorizontal }) => {
  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.viewport}
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {isHorizontal ? (
        <View style={styles.horizontalScrollbar}>
          <View style={[styles.thumb, { backgroundColor: thumbColor }]} />
        </View>
      ) : (
        <View style={styles.verticalScrollbar}>
          <View style={[styles.thumb, { backgroundColor: thumbColor }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  viewport: {
    flex: 1,
  },
  horizontalScrollbar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: '#1A6F00',
    borderRadius: 3,
    borderWidth: 2,
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  verticalScrollbar: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    borderColor: '#1A6F00',
    borderRadius: 3,
    borderWidth: 2,
    position: 'absolute',
    right: 4,
    top: 0,
    bottom: 4,
  },
  thumb: {
    flex: 1,
    borderRadius: 3,
  },
});

export default ScrollArea;
