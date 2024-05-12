import { useState } from 'react';

function ReviewForm({ onSubmit }) {
  const [name, setName] = useState(''); // Add state for the name field
  const [drinkName, setDrinkName] = useState(''); // Add state for the drinkName field
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation if needed
    onSubmit({ name, drinkName, reviewText, rating });
    // Clear form fields after submission
    setName('');
    setDrinkName('');
    setReviewText('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Drink Name:
        <input
          type="text"
          value={drinkName}
          onChange={(e) => setDrinkName(e.target.value)}
          required
        />
      </label>
      <label>
        Review:
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
      </label>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          required
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;



  