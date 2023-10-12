# react-native-star-rating-widget

[![npm version](https://badge.fury.io/js/react-native-star-rating-widget.svg)](https://badge.fury.io/js/react-native-star-rating-widget)

A customizable, animated star rating component for React Native. Compatible with iOS, Android and Web. Written in Typescript.

![Demo](https://github.com/benediktviebahn/react-native-star-rating-widget/raw/master/media/demo.gif)

## Installation
1. install react-native-star-rating-widget
`npm install react-native-star-rating-widget --save` or `yarn add react-native-star-rating-widget`
2. if not already installed, add [react-native-svg](https://github.com/react-native-community/react-native-svg)

## Usage
This package exports an 

### Interactive `StarRating` component
```js
import StarRating from 'react-native-star-rating-widget';

const Example = () => {
  const [rating, setRating] = useState(0);
  return (
      <StarRating
        rating={rating}
        onChange={setRating}
      />
  );
};
```

### Non-Interactive `StarRatingDisplay` component
```js
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const Example = () => {
  return (
      <StarRatingDisplay
        rating={4.5}
      />
  );
};
```

## Props
### `StarRating` Props
| Name              | Type                                    | Default          | Description                                           |
| ----------------- | --------------------------------------- | ---------------- | ----------------------------------------------------- |
| rating            | number                                  | **REQUIRED**     | Rating Value. Should be between 0 and `maxStars`      |
| onChange          | (number) => void                        | **REQUIRED**     | called when rating changes                            |
| maxStars          | number                                  | 5                | number of stars                                       |
| starSize          | number                                  | 32               | star size                                             |
| color             | string                                  | "#fdd835"        | star color                                            |
| emptyColor        | string                                  | same as `color`  | empty star color                                      |
| style             | object                                  | undefined        | optional style                                        |
| starStyle         | object                                  | undefined        | optional star style                                   |
| enableHalfStar    | boolean                                 | true             | enable or disable display of half stars               |
| enableSwiping     | boolean                                 | true             | enable or disable swiping                             |
| onRatingStart     | () => void                              | undefined        | called when user starts interaction                   |
| onRatingEnd       | () => void                              | undefined        | called when user ends interaction                     |
| animationConfig   | see [AnimationConfig](#animationConfig) | see [AnimationConfig](#animationConfig) | animation configuration object |
| StarIconComponent | (props: { size: number; color: string; type: "full" \| "half" \| "empty"; }) => JSX.Element | [StarIcon](https://github.com/bviebahn/react-native-star-rating-widget/blob/master/src/StarIcon.tsx)                    | Icon component                                        |

### `StarRatingDisplay` Props
The `StarRatingDisplay` component accepts the same props as `StarRating` except `onChange`, `enableSwiping`, `onRatingStart`, `onRatingEnd` and `animationConfig`.

### AnimationConfig
| Name     | Type               | Default           | Description                                |
| -------- | ------------------ | ----------------- | ------------------------------------------ |
| scale    | number             | 1.2               | star animation scale value                 |
| duration | number             | 300               | animation duration                         |
| delay    | number             | 300               | animation delay when interaction has ended |
| easing   | (number) => number | Easing.elastic(2) | animation easing function                  |
