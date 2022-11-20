import React from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import ExampleContainer from "./ExampleContainer";

export default function StarRatingDisplayExample() {
    return (
        <ExampleContainer title="StarRatingDisplay Example">
            <StarRatingDisplay rating={3.5} />
        </ExampleContainer>
    );
}
