import { useLocation, useNavigate, useParams } from "react-router-dom";
import RoomForm from "../components/rooms/RoomForm";

const rooms = [
  {
    id: "1",
    roomNumber: "101",
    roomType: "Deluxe",
    capacity: 2,
    price: 3500,
    bedType: "King Bed",
    status: "Available",
    description:
      "A comfortable deluxe room designed for a relaxing stay with modern amenities.",
    amenities: [
      "Wi-Fi",
      "Air Conditioning",
      "TV",
      "Breakfast",
    ],
    images: [],
  },
  {
    id: "2",
    roomNumber: "102",
    roomType: "Deluxe",
    capacity: 2,
    price: 3500,
    bedType: "Queen Bed",
    status: "Occupied",
    description:
      "A spacious deluxe room with a comfortable interior and essential facilities.",
    amenities: [
      "Wi-Fi",
      "Air Conditioning",
      "TV",
    ],
    images: [],
  },
];

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const room = location.state?.room || rooms.find((item) => item.id === id);

  if (!room) {
    return (
      <div className="rounded-[18px] border border-[var(--color-border)] bg-white p-8 text-center">
        <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Room Not Found
        </h1>

        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          The room you are trying to edit could not be found.
        </p>
      </div>
    );
  }

  const handleUpdateRoom = (roomData) => {
    console.log("Updated room:", {
      id,
      ...roomData,
    });

    // Backend integration will be added later.
    // PATCH /api/rooms/:id
    navigate(`/rooms/${id}`, {
      replace: true,
      state: {
        notification: "Room successfully edited.",
        room: {
          number: roomData.roomNumber,
          type: roomData.roomType,
          description: roomData.description,
          capacity: Number(roomData.capacity),
          price: Number(roomData.price),
          status: roomData.status,
          bed: roomData.bedType,
          amenities: roomData.amenities,
        },
      },
    });
  };

  return (
    <RoomForm
      initialData={room}
      isEdit={true}
      onSubmit={handleUpdateRoom}
    />
  );
}

export default EditRoom;