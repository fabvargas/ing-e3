export type Room = {
  id: number;
  numero: number;
  categoria: "Single" | "Premium" | "Turista";
  tipo: "Suit" | "Turista";
  piso: number;
  precioDiario: number;
  descripcion: string;
};

export class JsonRoomModel {
  rooms: Room[] = [
    {
      id: 1,
      numero: 10,
      categoria: "Single",
      tipo: "Turista",
      piso: 1,
      precioDiario: 40_000,
      descripcion: "Habitación cómoda para una persona, con baño privado y WiFi.",
    },
    {
      id: 2,
      numero: 22,
      categoria: "Premium",
      tipo: "Suit",
      piso: 2,
      precioDiario: 45_000,
      descripcion: "Suite Premium con sala de estar, minibar y vistas al jardín.",
    },
    {
      id: 3,
      numero: 28,
      categoria: "Premium",
      tipo: "Suit",
      piso: 2,
      precioDiario: 45_000,
      descripcion: "Suite elegante con balcón privado y decoración moderna.",
    },
    {
      id: 4,
      numero: 33,
      categoria: "Single",
      tipo: "Turista",
      piso: 3,
      precioDiario: 55_000,
      descripcion: "Habitación individual confortable, ideal para viajes de negocios.",
    },
    {
      id: 5,
      numero: 35,
      categoria: "Single",
      tipo: "Suit",
      piso: 3,
      precioDiario: 80_000,
      descripcion: "Suite individual espaciosa con zona de trabajo y vistas panorámicas.",
    },
    {
      id: 6,
      numero: 40,
      categoria: "Single",
      tipo: "Turista",
      piso: 4,
      precioDiario: 42_000,
      descripcion: "Habitación sencilla y acogedora, con todas las comodidades básicas.",
    },
    {
      id: 7,
      numero: 44,
      categoria: "Premium",
      tipo: "Suit",
      piso: 4,
      precioDiario: 85_000,
      descripcion: "Suite Premium con decoración lujosa, sala de estar y baño privado.",
    },
  ];

  async getAllRooms(): Promise<Room[]> {
    return this.rooms;
  }

  async getRoomById(id: number): Promise<Room> {
    console.log(id, "----id")
    if (!id) {
      throw new Error("error en validacion");
    }
    const room = this.rooms.find((room) => room.id == id);

    if (!room) {
      throw new Error("error en el servidor");
    }
    return room;
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
      room.tipo = updatedInfo.tipo ?? room.tipo;
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
