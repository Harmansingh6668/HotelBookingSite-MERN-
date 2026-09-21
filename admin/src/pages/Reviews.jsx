import { useMemo, useState } from "react";
import {
  MessageCircle,
  Reply,
  Star,
  Send,
} from "lucide-react";

const initialReviews = [
  {
    id: 1,
    guest: "Harpreet Singh",
    rating: 5,
    date: "Sep 20, 2026",
    title: "Excellent stay",
    comment:
      "The room was clean, comfortable and the staff was very helpful. The location was also convenient.",
    reply: "",
  },
  {
    id: 2,
    guest: "Simran Kaur",
    rating: 4,
    date: "Sep 18, 2026",
    title: "Very comfortable",
    comment:
      "Overall a very good experience. The room was spacious and breakfast was nice.",
    reply:
      "Thank you for staying with us, Simran. We are glad you enjoyed your stay.",
  },
  {
    id: 3,
    guest: "Aman Sharma",
    rating: 5,
    date: "Sep 15, 2026",
    title: "Great hospitality",
    comment:
      "The staff was extremely welcoming and the property was maintained very well.",
    reply: "",
  },
  {
    id: 4,
    guest: "Navneet Gill",
    rating: 3,
    date: "Sep 10, 2026",
    title: "Good but could improve",
    comment:
      "The overall stay was good, but the room service took longer than expected.",
    reply: "",
  },
  {
    id: 5,
    guest: "Riya Kapoor",
    rating: 5,
    date: "Sep 05, 2026",
    title: "Wonderful experience",
    comment:
      "Beautiful property and very friendly staff. Would definitely consider staying here again.",
    reply:
      "Thank you, Riya. We truly appreciate your kind words and look forward to welcoming you again.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating
              ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
              : "text-[var(--color-border)]"
          }
        />
      ))}
    </div>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [ratingFilter, setRatingFilter] = useState("All");
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const filteredReviews = useMemo(() => {
    if (ratingFilter === "All") {
      return reviews;
    }

    return reviews.filter(
      (review) => review.rating === Number(ratingFilter)
    );
  }, [reviews, ratingFilter]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const ratingCounts = {
    5: reviews.filter((review) => review.rating === 5).length,
    4: reviews.filter((review) => review.rating === 4).length,
    3: reviews.filter((review) => review.rating === 3).length,
    2: reviews.filter((review) => review.rating === 2).length,
    1: reviews.filter((review) => review.rating === 1).length,
  };

  const startReply = (review) => {
    setReplyingId(review.id);
    setReplyText(review.reply || "");
  };

  const cancelReply = () => {
    setReplyingId(null);
    setReplyText("");
  };

  const submitReply = (reviewId) => {
    if (!replyText.trim()) return;

    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              reply: replyText.trim(),
            }
          : review
      )
    );

    console.log("Review reply:", {
      reviewId,
      reply: replyText.trim(),
    });

    // POST /api/reviews/:id/reply later

    cancelReply();
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--color-primary)]">
          REPUTATION
        </p>

        <h1 className="mt-1 text-2xl font-semibold">
          Reviews
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          See what guests are saying about your hotel and respond to their feedback.
        </p>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Overall Rating */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">

          <p className="text-sm text-[var(--color-text-secondary)]">
            Overall Rating
          </p>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-4xl font-semibold">
              {averageRating}
            </span>

            <div className="pb-1">
              <StarRating rating={Math.round(Number(averageRating))} />

              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {reviews.length} reviews
              </p>
            </div>
          </div>

        </div>

        {/* Rating Distribution */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 lg:col-span-2">

          <p className="text-sm font-medium">
            Rating Distribution
          </p>

          <div className="mt-4 space-y-3">

            {[5, 4, 3, 2, 1].map((rating) => {

              const percentage =
                reviews.length > 0
                  ? (ratingCounts[rating] / reviews.length) * 100
                  : 0;

              return (
                <div
                  key={rating}
                  className="flex items-center gap-3"
                >

                  <span className="w-8 text-sm text-[var(--color-text-secondary)]">
                    {rating}★
                  </span>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-gold)]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <span className="w-8 text-right text-xs text-[var(--color-text-muted)]">
                    {ratingCounts[rating]}
                  </span>

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* Review Section */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-white">

        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-[var(--color-border)] p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="font-semibold">
              Guest Reviews
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Read and respond to guest feedback.
            </p>
          </div>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

        </div>

        {/* Reviews */}
        <div className="divide-y divide-[var(--color-border)]">

          {filteredReviews.map((review) => (

            <div
              key={review.id}
              className="p-5 sm:p-6"
            >

              {/* Review Header */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <p className="font-medium">
                      {review.guest}
                    </p>

                    <StarRating rating={review.rating} />

                  </div>

                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    {review.date}
                  </p>

                </div>

                {!review.reply && replyingId !== review.id && (
                  <button
                    onClick={() => startReply(review)}
                    className="inline-flex w-fit items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-surface-muted)]"
                  >
                    <Reply size={16} />
                    Reply
                  </button>
                )}

              </div>

              {/* Review Content */}
              <div className="mt-4">

                <h3 className="font-medium">
                  {review.title}
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
                  {review.comment}
                </p>

              </div>

              {/* Existing Reply */}
              {review.reply && replyingId !== review.id && (
                <div className="mt-5 rounded-xl bg-[var(--color-surface-muted)] p-4">

                  <div className="flex items-center gap-2">

                    <MessageCircle
                      size={17}
                      className="text-[var(--color-primary)]"
                    />

                    <p className="text-sm font-medium">
                      Your response
                    </p>

                  </div>

                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {review.reply}
                  </p>

                  <button
                    onClick={() => startReply(review)}
                    className="mt-3 text-sm font-medium text-[var(--color-primary)] hover:underline"
                  >
                    Edit response
                  </button>

                </div>
              )}

              {/* Reply Form */}
              {replyingId === review.id && (
                <div className="mt-5 rounded-xl border border-[var(--color-border)] p-4">

                  <div className="flex items-center gap-2">

                    <MessageCircle
                      size={17}
                      className="text-[var(--color-primary)]"
                    />

                    <p className="text-sm font-medium">
                      {review.reply
                        ? "Edit your response"
                        : "Write a response"}
                    </p>

                  </div>

                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a professional response to the guest..."
                    className="mt-3 w-full resize-none rounded-xl border border-[var(--color-border)] p-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
                  />

                  <div className="mt-3 flex flex-wrap gap-2">

                    <button
                      onClick={() => submitReply(review.id)}
                      disabled={!replyText.trim()}
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={15} />
                      {review.reply ? "Update Response" : "Send Response"}
                    </button>

                    <button
                      onClick={cancelReply}
                      className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-surface-muted)]"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}

            </div>

          ))}

          {filteredReviews.length === 0 && (
            <div className="p-10 text-center">

              <Star
                size={32}
                className="mx-auto text-[var(--color-text-muted)]"
              />

              <p className="mt-3 font-medium">
                No reviews found
              </p>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Try selecting a different rating.
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Reviews;