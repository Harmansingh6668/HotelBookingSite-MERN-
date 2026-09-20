const paymentLabels = {
  upi: {
    title: "UPI",
    description: "Pay securely using a UPI app.",
  },
  card: {
    title: "Card",
    description: "Use a debit or credit card.",
  },
  netBanking: {
    title: "Net Banking",
    description: "Pay through your bank account.",
  },
  payAtHotel: {
    title: "Pay at Hotel",
    description: "Pay at check-in if the property supports this option.",
  },
};

function PaymentMethod({ method, selected, onSelect }) {
  const details = paymentLabels[method];
  if (!details) return null;

  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-[12px] border p-4 transition-colors ${
        selected
          ? "border-[#0B4F3A] bg-[#F2F5F1]"
          : "border-[#DDE5DF] hover:border-[#6F8F78]"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value={method}
        checked={selected}
        onChange={() => onSelect(method)}
        className="mt-1 accent-[#0B4F3A]"
      />
      <span>
        <span className="block font-medium text-[#1F2925]">{details.title}</span>
        <span className="mt-1 block text-sm text-[#66736D]">{details.description}</span>
      </span>
    </label>
  );
}

export default PaymentMethod;