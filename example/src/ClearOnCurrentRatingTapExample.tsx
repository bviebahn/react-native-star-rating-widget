import React from 'react';
import StarRating from 'react-native-star-rating-widget';
import ExampleContainer from './ExampleContainer';

export default function ClearOnCurrentRatingTapExample() {
  const [rating, setRating] = React.useState(3);

  const beforeStartRating = React.useRef(rating);
  const preventClear = React.useRef(false);

  const handleChange = (newRating: number) => {
    setRating(newRating);

    // You likely only want to clear the rating if the user taps on the current rating,
    // and prevent clearing the rating when the user swipes to the current rating.
    // If onChange is called it means the user did not tap on the current rating,
    // so we don't want to clear it when the interaction ends.
    preventClear.current = true;
  };

  const handleRatingStart = () => {
    beforeStartRating.current = rating;
    preventClear.current = false;
  };

  const handleRatingEnd = (endRating: number) => {
    if (!preventClear.current && endRating === beforeStartRating.current) {
      setRating(0);
    }
  };

  return (
    <ExampleContainer title="Clear rating when tapping on current rating Example">
      <StarRating
        rating={rating}
        onChange={handleChange}
        onRatingStart={handleRatingStart}
        onRatingEnd={handleRatingEnd}
      />
    </ExampleContainer>
  );
}
