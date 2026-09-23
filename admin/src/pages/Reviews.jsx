import { useEffect, useMemo, useState } from "react";
import {
  Star,
  Trash2,
} from "lucide-react";
import {
  deleteAdminReview,
  getAdminReviews,
} from "../services/review.service";

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [ratingFilter, setRatingFilter] = useState("All");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAdminReviews();
        const fetchedReviews = Array.isArray(data?.reviews)
          ? data.reviews
          : [];

        setReviews(
          fetchedReviews.map((review) => ({
            id: review._id,
            guest: review.userId?.name || "Not available",
            guestEmail: review.userId?.email || "Not available",
            rating: Number(review.rating) || 0,
            date: review.createdAt
              ? new Date(review.createdAt).toLocaleDateString("en-IN")
              : "Not available",
            bookingId: review.bookingId?._id || "Not available",
            stay:
              review.bookingId?.checkInDate &&
              review.bookingId?.checkOutDate
                ? `${new Date(
                    review.bookingId.checkInDate
                  ).toLocaleDateString("en-IN")} - ${new Date(
                    review.bookingId.checkOutDate
                  ).toLocaleDateString("en-IN")}`
                : "Not available",
            comment: review.comment || "Not available",
          }))
        );
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

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

  const handleDelete = async (review) => {
    if (!window.confirm("Delete this review? This action cannot be undone.")) {
      return;
    }

    try {
      setDeletingId(review.id);
      await deleteAdminReview(review.id);
      setReviews((currentReviews) =>
        currentReviews.filter((currentReview) => currentReview.id !== review.id)
      );
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete review.");
    } finally {
      setDeletingId(null);
    }
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
          See what guests are saying about your hotel.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

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

                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    {review.guestEmail}
                  </p>

                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled
                    title="Replying to reviews is not available yet."
                    className="inline-flex w-fit cursor-not-allowed items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] opacity-70"
                  >
                    Reply unavailable
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(review)}
                    disabled={deletingId === review.id}
                    title="Delete review"
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    {deletingId === review.id ? "Deleting..." : "Delete"}
                  </button>
                </div>

              </div>

              {/* Review Content */}
              <div className="mt-4">
                <p className="text-xs text-[var(--color-text-muted)]">
                  Booking: {review.bookingId}
                </p>

                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  Stay: {review.stay}
                </p>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
                  {review.comment}
                </p>

              </div>

            </div>

          ))}

          {loading && (
            <div className="p-10 text-center text-sm text-[var(--color-text-secondary)]">
              Loading reviews...
            </div>
          )}

          {!loading && filteredReviews.length === 0 && (
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