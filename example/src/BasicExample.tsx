import React from "react";
import StarRating from "react-native-star-rating-widget";

export default function BasicExample() {
    const [rating, setRating] = React.useState(3);
    return <StarRating rating={rating} onChange={setRating} />;
}
