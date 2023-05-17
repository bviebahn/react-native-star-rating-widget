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
  rating: number;
  onChange: (rating: number) => void;
  color?: string;
  emptyColor?: string;
  maxStars?: number;
  starSize?: number;
  enableHalfStar?: boolean;
  enableSwiping?: boolean;
  onRatingStart?: () => void;
  onRatingEnd?: () => void;
  style?: StyleProp<ViewStyle>;
  starStyle?: StyleProp<ViewStyle>;
  animationConfig?: AnimationConfig;
  StarIconComponent?: (props: StarIconProps) => JSX.Element;
  testID?: string;
};

const defaultColor = '#fdd835';
const defaultAnimationConfig: Required<AnimationConfig> = {
  easing: Easing.elastic(2),
  duration: 300,
  scale: 1.2,
  delay: 300,
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  starSize = 32,
  onChange,
  color = defaultColor,
  emptyColor = color,
  enableHalfStar = true,
  enableSwiping = true,
  onRatingStart,
  onRatingEnd,
  animationConfig = defaultAnimationConfig,
  style,
  starStyle,
  StarIconComponent = StarIcon,
  testID,
}) => {
  const width = React.useRef<number>();
  const [isInteracting, setInteracting] = React.useState(false);

  const handleInteraction = React.useCallback(
    (x: number, isRTL = I18nManager.isRTL) => {
      if (width.current) {
        if (isRTL) {
          handleInteraction(width.current - x, false);
          return;
        }
        const newRating = Math.max(
          0,
          Math.min(
            Math.round((x / width.current) * maxStars * 2 + 0.2) / 2,
            maxStars
          )
        );
        const finalRating = enableHalfStar ? newRating : Math.ceil(newRating);
        if (finalRating !== rating) {
          onChange(finalRating);
        }
      }
    },
    [enableHalfStar, maxStars, onChange, rating]
  );

  const panResponder = React.useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e) => {
        if (enableSwiping) {
          handleInteraction(e.nativeEvent.locationX);
        }
      },
      onPanResponderStart: (e) => {
        onRatingStart?.();
        handleInteraction(e.nativeEvent.locationX);
        setInteracting(true);
      },
      onPanResponderEnd: () => {
        onRatingEnd?.();
        setTimeout(() => {
          setInteracting(false);
        }, animationConfig.delay || defaultAnimationConfig.delay);
      },
    });
  }, [
    animationConfig.delay,
    enableSwiping,
    handleInteraction,
    onRatingStart,
    onRatingEnd,
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
      >
        {getStars(rating, maxStars).map((starType, i) => {
          return (
            <AnimatedIcon
              key={i}
              active={isInteracting && rating - i >= 0.5}
              animationConfig={animationConfig}
              style={starStyle}
            >
              <StarIconComponent
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
