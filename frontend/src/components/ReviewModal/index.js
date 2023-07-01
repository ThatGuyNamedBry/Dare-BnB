import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";
import "./ReviewModal.css";

function ReviewModal({ spotId, disabled }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const [activeRating, setActiveRating] = useState(stars);

  const handleStarClick = (value) => {
    setStars(value);
    setActiveRating(value);
  };

  const handleStarHover = (value) => {
    if (!disabled) {
      setActiveRating(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      review,
      stars,
    };

    if (!review || stars === 0) {
      setErrors({
        message: "Please provide a comment and star rating.",
      });
      return;
    }

    dispatch(createReviewThunk(spotId, formData))
      .then(() => {
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const renderStars = () => {
    const starElements = [];
    for (let i = 1; i <= 5; i++) {
      const className = i <= activeRating ? 'filled' : 'empty';
      starElements.push(
        <span
          key={i}
          className={`star ${className}`}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={() => setActiveRating(stars)}
          onClick={() => handleStarClick(i)}
        >
        <i className="fa-sharp fa-solid fa-star"></i>
        </span>
      );
    }
    return starElements;
  };

  return (
    <div id="review-modal">
      <h2>How was your stay?</h2>
      {errors.message && <p className="error">{errors.message}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="star-rating">
          <div className="stars">{renderStars()} Stars</div>
        </div>
        <button className="reviewBttn" type="submit">Submit Your Review</button>
      </form>
    </div>
  );
}

export default ReviewModal;
