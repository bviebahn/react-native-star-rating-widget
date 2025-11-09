export function getStars(rating: number, maxStars: number, enableQuarterStar?: boolean) {
  return [...Array(maxStars)].map((_, i) => {
    const remainder = rating - i;
    
    if (remainder >= 1) {
      return 'full';
    }
    
    if (enableQuarterStar) {
      if (remainder >= 0.75) {
        return 'three-quarter';
      }
      if (remainder >= 0.5) {
        return 'half';
      }
      if (remainder >= 0.25) {
        return 'quarter';
      }
    } else {
      if (remainder >= 0.5) {
        return 'half';
      }
    }
    
    return 'empty';
  });
}
