function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;

  const nights = Math.ceil(
    (new Date(`${checkOut}T00:00:00`) -
      new Date(`${checkIn}T00:00:00`)) /
      (1000 * 60 * 60 * 24)
  );

  return Math.max(nights, 1);
}

export function calculateBookingPrice({ checkIn, checkOut, selectedRooms }) {
  const nights = getNights(checkIn, checkOut);
  const roomSubtotal = selectedRooms.reduce((total, selection) => {
    const pricePerNight = selection.room?.price ?? selection.pricePerNight ?? 0;
    return total + pricePerNight * selection.quantity * nights;
  }, 0);

  return {
    nights,
    roomSubtotal,
    taxesAndFees: 0,
    total: roomSubtotal,
  };
}

export default calculateBookingPrice;
