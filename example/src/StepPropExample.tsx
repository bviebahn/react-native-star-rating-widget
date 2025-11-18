import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import ExampleContainer from './ExampleContainer';

export default function StepPropExample() {
  const [fullRating, setFullRating] = React.useState(3);
  const [halfRating, setHalfRating] = React.useState(2.5);
  const [quarterRating, setQuarterRating] = React.useState(3.75);

  return (
    <ExampleContainer title="Step Prop Examples">
      <View style={styles.section}>
        <Text style={styles.label}>Full Stars (step="full")</Text>
        <StarRating rating={fullRating} onChange={setFullRating} step="full" />
        <Text style={styles.rating}>Rating: {fullRating}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Half Stars (step="half" - default)</Text>
        <StarRating rating={halfRating} onChange={setHalfRating} step="half" />
        <Text style={styles.rating}>Rating: {halfRating}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Quarter Stars (step="quarter")</Text>
        <StarRating
          rating={quarterRating}
          onChange={setQuarterRating}
          step="quarter"
        />
        <Text style={styles.rating}>Rating: {quarterRating}</Text>
      </View>
    </ExampleContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
