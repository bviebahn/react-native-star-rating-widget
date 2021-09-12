import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import StarIcon from "./StarIcon";
import { getStars } from "./utils";

type Props = {
    rating: number;
    color?: string;
    emptyColor?: string;
    maxStars?: number;
    starSize?: number;
    enableHalfStar?: boolean;
    style?: StyleProp<ViewStyle>;
    starStyle?: StyleProp<ViewStyle>;
    testID?: string;
};

const defaultColor = "#fdd835";

const StarRatingDisplay = ({
    rating,
    maxStars = 5,
    starSize = 32,
    color = defaultColor,
    emptyColor = color,
    style,
    starStyle,
    testID,
}: Props) => {
    return (
        <View style={[styles.starRating, style]} testID={testID}>
            {getStars(rating, maxStars).map((starType, i) => {
                return (
                    <View key={i} style={starStyle}>
                        <StarIcon
                            type={starType}
                            size={starSize}
                            color={starType === "empty" ? emptyColor : color}
                        />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    starRating: {
        flexDirection: "row",
        alignSelf: "flex-start",
    },
    star: {
        marginHorizontal: 5,
    },
});

export default StarRatingDisplay;
