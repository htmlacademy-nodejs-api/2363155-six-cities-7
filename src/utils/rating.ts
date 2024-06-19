const calculateAggregateRating = (ratings: number[]) =>
  ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;

export { calculateAggregateRating };
