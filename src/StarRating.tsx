import React, { useRef, useEffect, useState } from "react";
import {
    PanResponder,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
    Animated,
    Easing,
} from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg";

type AnimationConfig = {
    easing?: (value: number) => number;
    duration?: number;
    delay?: number;
    scale?: number;
};

type StarRatingProps = {
    rating: number;
    onChange: (rating: number) => void;
    minRating?: number;
    color?: string;
    emptyColor?: string;
    maxStars?: number;
    starSize?: number;
    enableHalfStar?: boolean;
    enableSwiping?: boolean;
    style?: StyleProp<ViewStyle>;
    starStyle?: StyleProp<ViewStyle>;
    animationConfig?: AnimationConfig;
    testID?: string;
};

const defaultColor = "#fdd835";
const defaultAnimationConfig: Required<AnimationConfig> = {
    easing: Easing.elastic(2),
    duration: 300,
    scale: 1.2,
    delay: 300,
};

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxStars = 5,
    minRating = 0.5,
    starSize = 32,
    onChange,
    color = defaultColor,
    emptyColor = color,
    enableHalfStar = true,
    enableSwiping = true,
    animationConfig = defaultAnimationConfig,
    style,
    starStyle,
    testID,
}) => {
    const width = useRef<number>();
    const ref = useRef<View>(null);
    const [isInteracting, setInteracting] = useState(false);

    const handleInteraction = (x: number) => {
        if (width.current) {
            const newRating = Math.max(
                minRating,
                Math.ceil((x / width.current) * maxStars * 2) / 2
            );
            onChange(enableHalfStar ? newRating : Math.ceil(newRating));
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: e => {
                if (enableSwiping) {
                    handleInteraction(e.nativeEvent.locationX);
                }
            },
            onPanResponderStart: e => {
                handleInteraction(e.nativeEvent.locationX);
                setInteracting(true);
            },
            onPanResponderEnd: () => {
                setTimeout(() => {
                    setInteracting(false);
                }, animationConfig.delay || defaultAnimationConfig.delay);
            },
        })
    );

    return (
        <View
            ref={ref}
            style={[styles.starRating, style]}
            {...panResponder.current.panHandlers}
            onLayout={() => {
                if (ref.current) {
                    ref.current.measure((_x, _y, w, _h) => (width.current = w));
                }
            }}
            testID={testID}>
            {[...Array(maxStars)].map((_, i) => {
                const icon = (() => {
                    if (rating - i >= 1) {
                        return <StarFull size={starSize} color={color} />;
                    }

                    return rating - i >= 0.5 ? (
                        <StarHalf size={starSize} color={color} />
                    ) : (
                        <StarBorder size={starSize} color={emptyColor} />
                    );
                })();
                return (
                    <AnimatedIcon
                        key={i}
                        active={isInteracting && rating - i >= 0.5}
                        animationConfig={animationConfig}
                        style={starStyle}>
                        {icon}
                    </AnimatedIcon>
                );
            })}
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

    const animatedSize = useRef(new Animated.Value(active ? scale : 1));

    useEffect(() => {
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
            ]}>
            {children}
        </Animated.View>
    );
};

type IconProps = {
    size: number;
    color: string;
};

const StarBorder: React.FC<IconProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
        <Path
            fill={color}
            d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
        />
    </Svg>
);

const StarFull: React.FC<IconProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path
            fill={color}
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
    </Svg>
);

const StarHalf: React.FC<IconProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
        <G>
            <Rect fill="none" height="24" width="24" x="0" />
        </G>
        <G>
            <G>
                <G>
                    <Path
                        fill={color}
                        d="M22,9.24l-7.19-0.62L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27L18.18,21l-1.63-7.03L22,9.24z M12,15.4V6.1 l1.71,4.04l4.38,0.38l-3.32,2.88l1,4.28L12,15.4z"
                    />
                </G>
            </G>
        </G>
    </Svg>
);

const styles = StyleSheet.create({
    starRating: {
        flexDirection: "row",
        alignSelf: "flex-start",
    },
    star: {
        marginHorizontal: 5,
    },
});

export default StarRating;
