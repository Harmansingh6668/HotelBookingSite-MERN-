import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";

function MyBooking() {
  const { bookingId } = useParams();

  return (
    <main className="min-h-screen bg-[#FAF8F2] py-12">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[16px] border border-[#DDE5DF] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-[#1F2925]">My Booking</h1>
          <p className="mt-3 text-sm text-[#66736D]">
            Booking reference: <span className="font-medium text-[#1F2925]">{bookingId}</span>
          </p>
          <p className="mt-2 text-sm text-[#66736D]">Detailed booking management will be available here soon.</p>
          <Link to="/" className="mt-6 inline-block font-medium text-[#0B4F3A]">Back to home</Link>
        </div>
      </Container>
    </main>
  );
}

export default MyBooking;
