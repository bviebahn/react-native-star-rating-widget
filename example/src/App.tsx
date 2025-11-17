import * as React from 'react';

import { ScrollView, StyleSheet } from 'react-native';
import BasicExample from './BasicExample';
import CustomIconExample from './CustomIconExample';
import StarRatingDisplayExample from './StarRatingDisplayExample';
import ClearOnCurrentRatingTapExample from './ClearOnCurrentRatingTapExample';
import StepPropExample from './StepPropExample';

export default function App() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StepPropExample />
      <BasicExample />
      <CustomIconExample />
      <StarRatingDisplayExample />
      <ClearOnCurrentRatingTapExample />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
  },
  content: {
    padding: 32,
    paddingTop: 64,
    alignItems: 'center',
  },
});
