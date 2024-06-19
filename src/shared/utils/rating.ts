const calculateAggregateRating = (ratings: number[]) => {
  if (!ratings.length) {
    return 0;
  }
  return ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
};

export { calculateAggregateRating };
