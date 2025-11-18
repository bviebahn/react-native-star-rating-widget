import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import StarIcon, { StarIconProps } from './StarIcon';
import { getStars } from './utils';

type Props = {
  /**
   * Rating Value. Should be between 0 and `maxStars`.
   */
  rating: number;

  /**
   * Custom color for the filled stars.
   *
   * @default '#fdd835'
   */
  color?: string;

  /**
   * Custom color for the empty stars.
   *
   * @default color
   */
  emptyColor?: string;

  /**
   * Total amount of stars to display.
   *
   * @default 5
   */
  maxStars?: number;

  /**
   * Size of the stars.
   *
   * @default 32
   */
  starSize?: number;

  /**
   * Custom style for the component.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom style for the star component.
   */
  starStyle?: StyleProp<ViewStyle>;

  /**
   * Custom star icon component.
   *
   * @default StarIcon
   */
  StarIconComponent?: (props: StarIconProps) => JSX.Element;

  /**
   * Step size for the rating.
   *
   * @default 'half'
   */
  step?: 'half' | 'quarter' | 'full';

  /**
   * The accessibility label used on the star component.
   *
   * @default `star rating. ${rating} stars.`
   */
  accessibilityLabel?: string;
  testID?: string;
};

const defaultColor = '#fdd835';

const StarRatingDisplay = ({
  rating,
  maxStars = 5,
  starSize = 32,
  color = defaultColor,
  emptyColor = color,
  step = 'half',
  style,
  starStyle,
  StarIconComponent = StarIcon,
  testID,
  accessibilityLabel = `star rating. ${rating} stars.`,
}: Props) => {
  return (
    <View
      style={[styles.starRating, style]}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {getStars(rating, maxStars, step).map((starType, i) => {
        return (
          <View key={i} style={[styles.star, starStyle]}>
            <StarIconComponent
              index={i}
              type={starType}
              size={starSize}
              color={starType === 'empty' ? emptyColor : color}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starRating: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 5,
  },
});

export default StarRatingDisplay;
