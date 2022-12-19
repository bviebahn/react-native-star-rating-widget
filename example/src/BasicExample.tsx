import React from 'react';
import StarRating from 'react-native-star-rating-widget';
import ExampleContainer from './ExampleContainer';

export default function BasicExample() {
  const [rating, setRating] = React.useState(3);
  return (
    <ExampleContainer title="Basic Example">
      <StarRating rating={rating} onChange={setRating} />
    </ExampleContainer>
  );
}
