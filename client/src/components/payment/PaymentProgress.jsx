function PaymentProgress() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-medium sm:text-sm">
      <span className="text-[#2F7D5A]">✓ Stay confirmed</span>
      <span className="text-[#8A958F]">→</span>
      <span className="text-[#2F7D5A]">✓ Your details</span>
      <span className="text-[#8A958F]">→</span>
      <span className="rounded-full bg-[#0B4F3A] px-3 py-1.5 text-white">③ Payment</span>
    </div>
  );
}

export default PaymentProgress;