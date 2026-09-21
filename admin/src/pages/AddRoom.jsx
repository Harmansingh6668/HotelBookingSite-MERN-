import { useNavigate } from "react-router-dom";
import RoomForm from "../components/rooms/RoomForm";

function AddRoom() {
  const navigate = useNavigate();

  const handleAddRoom = (roomData) => {
    console.log("New room:", roomData);

    // Backend integration will be added later.
    // POST /api/rooms
    const id = `new-${Date.now()}`;

    navigate(`/rooms/${id}`, {
      replace: true,
      state: {
        notification: "Room successfully added.",
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
      onSubmit={handleAddRoom}
    />
  );
}

export default AddRoom;