import React from 'react';
import { I18nManager, ViewStyle } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export type StarIconProps = {
  index: number;
  size: number;
  color: string;
  type: 'full' | 'half' | 'quarter' | 'three-quarter' | 'empty';
};

const RTL_TRANSFORM: ViewStyle = {
  transform: [{ rotateY: '180deg' }],
};

const StarBorder = ({ size, color }: Omit<StarIconProps, 'type'>) => (
  <Svg height={size} viewBox="0 0 24 24" width={size}>
    <Path
      fill={color}
      d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
    />
  </Svg>
);

const StarFull = ({ size, color, index }: Omit<StarIconProps, 'type'>) => {
  const gradientId = `full-gradient-${index}`;
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="100%" stopColor={color} stopOpacity="1" />
          <Stop offset="100%" stopColor={color} stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={`url(#${gradientId})`}
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
};

const StarQuarter = ({ size, color, index }: Omit<StarIconProps, 'type'>) => {
  const gradientId = `quarter-gradient-${index}`;
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="33%" stopColor={color} stopOpacity="1" />
          <Stop offset="33%" stopColor={color} stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={`url(#${gradientId})`}
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
};

const StarThreeQuarter = ({ size, color, index }: Omit<StarIconProps, 'type'>) => {
  const gradientId = `three-quarter-gradient-${index}`;
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="66%" stopColor={color} stopOpacity="1" />
          <Stop offset="66%" stopColor={color} stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={`url(#${gradientId})`}
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
};

const StarHalf = ({ size, color, index }: Omit<StarIconProps, 'type'>) => {
  const gradientId = `half-gradient-${index}`;
  return (
    <Svg
      height={size}
      viewBox="0 0 24 24"
      width={size}
      style={I18nManager.isRTL ? RTL_TRANSFORM : undefined}
    >
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="50%" stopColor={color} stopOpacity="1" />
          <Stop offset="50%" stopColor={color} stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={`url(#${gradientId})`}
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
};

const getStarComponent = (type: StarIconProps['type']) => {
  switch (type) {
    case 'full':
      return StarFull;
    case 'half':
      return StarHalf;
    case 'quarter':
      return StarQuarter;
    case 'three-quarter':
      return StarThreeQuarter;
    default:
      return StarBorder;
  }
};

const StarIcon = ({ index, type, size, color }: StarIconProps) => {
  const Component = getStarComponent(type);
  return <Component index={index} size={size} color={color} />;
};

export default StarIcon;
