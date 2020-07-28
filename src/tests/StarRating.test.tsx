import React from "react";
import StarRating from "../StarRating";
import { render } from "react-native-testing-library";

describe("StarRating", () => {
    it("renders StarRating", () => {
        function Component() {
            return <StarRating rating={3} onChange={() => undefined} />;
        }

        const { toJSON } = render(<Component />);
        expect(toJSON()).toMatchSnapshot();
    });
});
