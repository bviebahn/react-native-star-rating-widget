import * as React from 'react';

import { ScrollView, StyleSheet } from 'react-native';
import BasicExample from './BasicExample';
import CustomIconExample from './CustomIconExample';
import StarRatingDisplayExample from './StarRatingDisplayExample';

export default function App() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <BasicExample />
      <CustomIconExample />
      <StarRatingDisplayExample />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
  },
  content: {
    padding: 32,
    alignItems: 'center',
  },
});
