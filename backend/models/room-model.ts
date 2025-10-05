export type Room = {
  id: number;
  numero: number;
  categoria: "Suit Premium" | "Turista Single" | "Turista Vista al Mar" | "Turista Doble";
  piso: number;
  precioDiario: number;
  descripcion: string;
};

export class JsonRoomModel {
  rooms: Room[] = [
    {
      id: 1,
      numero: 10,
      categoria: "Turista Single",
      piso: 1,
      precioDiario: 40_000,
      descripcion: "Habitación cómoda para una persona, con baño privado y WiFi.",
    },
    {
      id: 2,
      numero: 22,
      categoria: "Suit Premium",
      piso: 2,
      precioDiario: 85_000,
      descripcion: "Suite Premium con sala de estar, minibar y vistas al jardín.",
    },
    {
      id: 3,
      numero: 28,
      categoria: "Suit Premium",
      piso: 2,
      precioDiario: 90_000,
      descripcion: "Suite elegante con balcón privado y decoración moderna.",
    },
    {
      id: 4,
      numero: 33,
      categoria: "Turista Vista al Mar",
      piso: 3,
      precioDiario: 65_000,
      descripcion: "Habitación con vista panorámica al mar, ideal para viajes de negocios.",
    },
    {
      id: 5,
      numero: 35,
      categoria: "Suit Premium",
      piso: 3,
      precioDiario: 95_000,
      descripcion: "Suite individual espaciosa con zona de trabajo y vistas panorámicas.",
    },
    {
      id: 6,
      numero: 40,
      categoria: "Turista Doble",
      piso: 4,
      precioDiario: 55_000,
      descripcion: "Habitación doble acogedora, con todas las comodidades básicas.",
    },
    {
      id: 7,
      numero: 44,
      categoria: "Turista Vista al Mar",
      piso: 4,
      precioDiario: 70_000,
      descripcion: "Habitación con vista al mar, decoración moderna y balcón privado.",
    },
  ];

  async getAllRooms(): Promise<Room[]> {
    return this.rooms;
  }

  async getRoomById(id: number): Promise<Room | null> {
    console.log(id, "----id")
    if (!id) {
      return null;
    }
    const room = this.rooms.find((room) => room.id == id);

    return room || null;
  }

  async addRoom(room: Room) {
    room.id = this.rooms.length + 1;
    this.rooms.push(room);
    return room;
  }

  async updateRoom(id: number, updatedInfo: Partial<Room>) {
    if (!id) {
      throw new Error("error en validacion");
    }
    const room = this.rooms.find((room) => room.id === id);
    if (room) {
      room.numero = updatedInfo.numero ?? room.numero;
      room.categoria = updatedInfo.categoria ?? room.categoria;
      room.piso = updatedInfo.piso ?? room.piso;
      room.precioDiario = updatedInfo.precioDiario ?? room.precioDiario;
      room.descripcion = updatedInfo.descripcion ?? room.descripcion;
      return room;
    }
    return null;
  }

  async deleteRoom(id: number) {
    const index = this.rooms.findIndex((room) => room.id === id);
    if (index !== -1) {
      const deletedRoom = this.rooms.splice(index, 1);
      return deletedRoom[0];
    }
    return null;
  }
}
