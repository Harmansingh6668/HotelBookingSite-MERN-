import { useNavigate } from "react-router-dom";
import RoomForm from "../components/rooms/RoomForm";
import { createAdminRoom } from "../services/room.service";

function AddRoom() {
  const navigate = useNavigate();

  const handleAddRoom = async (roomData) => {
    const { room } = await createAdminRoom({
      roomNumber: roomData.roomNumber,
      roomType: roomData.roomType.toUpperCase(),
      description: roomData.description,
      capacity: Number(roomData.capacity),
      pricePerNight: Number(roomData.price),
      bedType: roomData.bedType.toUpperCase().replace(" BED", "").replace(" BEDS", ""),
      status: roomData.status.toUpperCase().replace(" ", "_"),
      amenities: roomData.amenities,
      images: roomData.images,
    });
    const id = room._id;

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