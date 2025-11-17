import React from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
  I18nManager,
  AccessibilityInfo,
  AccessibilityActionEvent,
} from 'react-native';
import StarIcon, { StarIconProps } from './StarIcon';
import { getStars } from './utils';

type AnimationConfig = {
  easing?: (value: number) => number;
  duration?: number;
  delay?: number;
  scale?: number;
};

type StarRatingProps = {
  /**
   * Rating Value. Should be between 0 and `maxStars`.
   */
  rating: number;

  /**
   * Change listener that gets called when rating changes.
   */
  onChange: (rating: number) => void;

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
   * Step size for the rating.
   *
   * @default 'half'
   */
  step?: 'half' | 'quarter' | 'full';

  /**
   * Enable swiping to rate.
   *
   * @default true
   */
  enableSwiping?: boolean;

  /**
   * Callback that gets called when the interaction starts, before `onChange`.
   *
   * @param rating The rating value at the start of the interaction.
   */
  onRatingStart?: (rating: number) => void;

  /**
   * Callback that gets called when the interaction ends, after `onChange`.
   *
   * @param rating The rating value at the end of the interaction.
   */
  onRatingEnd?: (rating: number) => void;

  /**
   * Custom style for the component.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom style for the star component.
   */
  starStyle?: StyleProp<ViewStyle>;

  /**
   * Custom animation configuration.
   *
   * @default
   * {
   *  easing: Easing.elastic(2),
   *  duration: 300,
   *  scale: 1.2,
   *  delay: 300
   * }
   */
  animationConfig?: AnimationConfig;

  /**
   * Custom star icon component.
   *
   * @default StarIcon
   */
  StarIconComponent?: (props: StarIconProps) => JSX.Element;

  testID?: string;

  /**
   * The accessibility label used on the star component. If you want to include the staged star value, then
   * include the token, %value%, in your label.
   *
   * @default 'star rating. %value% stars. use custom actions to set rating.'
   */
  accessibilityLabel?: string;

  /**
   * The accessibility label for the increment action.
   *
   * @default 'increment'
   */
  accessabilityIncrementLabel?: string;

  /**
   * The accessibility label for the decrement action.
   *
   * @default 'decrement'
   */
  accessabilityDecrementLabel?: string;

  /**
   * The accessibility label for the activate action.
   *
   * @default 'activate (default)'
   */
  accessabilityActivateLabel?: string;

  /**
   * When the user is adjusting the amount of stars, the voiceover reads as "n stars". This property will override
   * that label. Use the token, %value%, in your label to specify where the staged value should go.
   *
   * @default '%value% stars'
   */
  accessibilityAdjustmentLabel?: string;
};

const defaultColor = '#fdd835';
const defaultAnimationConfig: Required<AnimationConfig> = {
  easing: Easing.elastic(2),
  duration: 300,
  scale: 1.2,
  delay: 300,
};

const StarRating = ({
  rating,
  maxStars = 5,
  starSize = 32,
  onChange,
  color = defaultColor,
  emptyColor = color,
  step = 'half',
  enableSwiping = true,
  onRatingStart,
  onRatingEnd,
  animationConfig = defaultAnimationConfig,
  style,
  starStyle,
  StarIconComponent = StarIcon,
  testID,
  accessibilityLabel = 'star rating. %value% stars. use custom actions to set rating.',
  accessabilityIncrementLabel = 'increment',
  accessabilityDecrementLabel = 'decrement',
  accessabilityActivateLabel = 'activate (default)',
  accessibilityAdjustmentLabel = '%value% stars',
}: StarRatingProps) => {
  const multiplier = step === 'quarter' ? 4 : step === 'half' ? 2 : 1;
  const width = React.useRef<number>();
  const [isInteracting, setInteracting] = React.useState(false);
  const [stagedRating, setStagedRating] = React.useState(rating);

  const panResponder = React.useMemo(() => {
    const calculateRating = (x: number, isRTL = I18nManager.isRTL) => {
      if (!width.current) return rating;

      if (isRTL) {
        return calculateRating(width.current - x, false);
      }

      const newRating =
        step !== 'full'
          ? Math.max(
              0,
              Math.min(
                Math.round((x / width.current) * maxStars * multiplier + 0.2) /
                  multiplier,
                maxStars
              )
            )
          : Math.ceil((x / width.current) * maxStars);

      return newRating;
    };

    const handleChange = (newRating: number) => {
      if (newRating !== rating) {
        onChange(newRating);
      }
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e) => {
        if (enableSwiping) {
          const newRating = calculateRating(e.nativeEvent.locationX);
          handleChange(newRating);
        }
      },
      onPanResponderStart: (e) => {
        const newRating = calculateRating(e.nativeEvent.locationX);
        onRatingStart?.(newRating);
        handleChange(newRating);
        setInteracting(true);
      },
      onPanResponderEnd: (e) => {
        const newRating = calculateRating(e.nativeEvent.locationX);
        handleChange(newRating);
        onRatingEnd?.(newRating);

        setTimeout(() => {
          setInteracting(false);
        }, animationConfig.delay || defaultAnimationConfig.delay);
      },
      onPanResponderTerminate: () => {
        // called when user drags outside of the component
        setTimeout(() => {
          setInteracting(false);
        }, animationConfig.delay || defaultAnimationConfig.delay);
      },
    });
  }, [
    rating,
    maxStars,
    onChange,
    enableSwiping,
    onRatingStart,
    onRatingEnd,
    animationConfig.delay,
    step,
    multiplier,
  ]);

  return (
    <View style={style}>
      <View
        style={styles.starRating}
        {...panResponder.panHandlers}
        onLayout={(e) => {
          width.current = e.nativeEvent.layout.width;
        }}
        testID={testID}
        accessible={true}
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel.replace(
          /%value%/g,
          stagedRating.toString()
        )}
        accessibilityValue={{
          min: 0,
          max: maxStars * multiplier,
          now: Math.round(rating * multiplier),
        }}
        accessibilityActions={[
          { name: 'increment', label: accessabilityIncrementLabel },
          { name: 'decrement', label: accessabilityDecrementLabel },
          { name: 'activate', label: accessabilityActivateLabel },
        ]}
        onAccessibilityAction={(event: AccessibilityActionEvent) => {
          const incrementor =
            step === 'half' ? 0.5 : step === 'quarter' ? 0.25 : 1;
          switch (event.nativeEvent.actionName) {
            case 'increment':
              if (stagedRating >= maxStars) {
                AccessibilityInfo.announceForAccessibility(
                  accessibilityAdjustmentLabel.replace(
                    /%value%/g,
                    `${maxStars}`
                  )
                );
              } else {
                AccessibilityInfo.announceForAccessibility(
                  accessibilityAdjustmentLabel.replace(
                    /%value%/g,
                    `${stagedRating + incrementor}`
                  )
                );
                setStagedRating(stagedRating + incrementor);
              }

              break;
            case 'decrement':
              if (stagedRating <= 0) {
                AccessibilityInfo.announceForAccessibility(
                  accessibilityAdjustmentLabel.replace(/%value%/g, `${0}`)
                );
              } else {
                AccessibilityInfo.announceForAccessibility(
                  accessibilityAdjustmentLabel.replace(
                    /%value%/g,
                    `${stagedRating - incrementor}`
                  )
                );
                setStagedRating(stagedRating - incrementor);
              }

              break;
            case 'activate':
              onChange(stagedRating);
              break;
          }
        }}
      >
        {getStars(rating, maxStars, step).map((starType, i) => {
          return (
            <AnimatedIcon
              key={i}
              active={isInteracting && rating - i >= 0.5}
              animationConfig={animationConfig}
              style={starStyle}
            >
              <StarIconComponent
                index={i}
                type={starType}
                size={starSize}
                color={starType === 'empty' ? emptyColor : color}
              />
            </AnimatedIcon>
          );
        })}
      </View>
    </View>
  );
};

type AnimatedIconProps = {
  active: boolean;
  children: React.ReactElement;
  animationConfig: AnimationConfig;
  style?: StyleProp<ViewStyle>;
};

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  active,
  animationConfig,
  children,
  style,
}) => {
  const {
    scale = defaultAnimationConfig.scale,
    easing = defaultAnimationConfig.easing,
    duration = defaultAnimationConfig.duration,
  } = animationConfig;

  const animatedSize = React.useRef(new Animated.Value(active ? scale : 1));

  React.useEffect(() => {
    const animation = Animated.timing(animatedSize.current, {
      toValue: active ? scale : 1,
      useNativeDriver: true,
      easing,
      duration,
    });

    animation.start();
    return animation.stop;
  }, [active, scale, easing, duration]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.star,
        style,
        {
          transform: [
            {
              scale: animatedSize.current,
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  starRating: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  star: {
    marginHorizontal: 5,
  },
});

export default StarRating;
