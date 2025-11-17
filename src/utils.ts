export function getStars(
  rating: number,
  maxStars: number,
  step?: 'half' | 'quarter' | 'full'
) {
  return [...Array(maxStars)].map((_, i) => {
    const remainder = rating - i;

    if (remainder >= 1) return 'full';

    if (step === 'quarter') {
      if (remainder >= 0.75) return 'three-quarter';
      if (remainder >= 0.5) return 'half';
      if (remainder >= 0.25) return 'quarter';
    } else if (step === 'half') {
      if (remainder >= 0.5) return 'half';
    }

    return 'empty';
  });
}
