import { useState } from 'react';

function ReviewForm({ onSubmit }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation if needed
    onSubmit({ reviewText, rating });
    // Clear form fields after submission
    setReviewText('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
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


  