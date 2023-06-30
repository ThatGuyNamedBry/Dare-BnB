import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";
import './ReviewModal.css';

function ReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});

  const handleStarClick = (value) => {
    setStars(value);
  };
  const handleStarHover = (value) => {
    setStars(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      comment,
      stars,
    };

    if (!comment || stars === 0) {
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
      const className = i <= stars ? "filled" : "";
      starElements.push(
        <span
          key={i}
          className={`star ${className}`}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={() => handleStarHover(stars)}
          onClick={() => handleStarClick(i)}
        >
          &#9733;
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`star ${value <= stars ? "filled" : ""}`}
              onClick={() => handleStarClick(value)}
            >
              &#9733;
            </span>
          ))}
          <p>Stars</p>
        </div>
        <button type="submit">Submit Your Review</button>
      </form>
    </div>
  );
}

export default ReviewModal;
