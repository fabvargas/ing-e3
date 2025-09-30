export interface Reservation {
  id: number;
  roomId: number;
  fechaInicio: Date;
  fechaTermino: Date;
}

export class JsonReservationModel {
  reservations: Reservation[] = [
    { id: 1, roomId: 1, fechaInicio: new Date("2025-10-01"), fechaTermino: new Date("2025-10-29") },
    { id: 2, roomId: 2, fechaInicio: new Date("2025-10-05"), fechaTermino: new Date("2025-11-02") },
    { id: 3, roomId: 3, fechaInicio: new Date("2025-10-10"), fechaTermino: new Date("2025-11-07") },
    { id: 4, roomId: 4, fechaInicio: new Date("2025-10-15"), fechaTermino: new Date("2025-11-12") },
    { id: 5, roomId: 5, fechaInicio: new Date("2025-10-20"), fechaTermino: new Date("2025-11-24") },
    { id: 6, roomId: 6, fechaInicio: new Date("2025-11-01"), fechaTermino: new Date("2025-11-29") },
    { id: 7, roomId: 7, fechaInicio: new Date("2025-11-05"), fechaTermino: new Date("2025-12-03") },
    { id: 8, roomId: 1, fechaInicio: new Date("2025-11-10"), fechaTermino: new Date("2025-12-08") },
    { id: 9, roomId: 2, fechaInicio: new Date("2025-11-20"), fechaTermino: new Date("2025-12-18") },
    { id: 10, roomId: 3, fechaInicio: new Date("2025-12-01"), fechaTermino: new Date("2025-12-29") },
    { id: 11, roomId: 4, fechaInicio: new Date("2025-12-05"), fechaTermino: new Date("2026-01-02") },
    { id: 12, roomId: 5, fechaInicio: new Date("2025-12-10"), fechaTermino: new Date("2026-01-14") },
    { id: 13, roomId: 6, fechaInicio: new Date("2025-12-20"), fechaTermino: new Date("2026-01-24") },
    { id: 14, roomId: 7, fechaInicio: new Date("2026-01-01"), fechaTermino: new Date("2026-01-29") },
    { id: 15, roomId: 1, fechaInicio: new Date("2026-01-05"), fechaTermino: new Date("2026-02-02") },
    { id: 16, roomId: 2, fechaInicio: new Date("2026-01-10"), fechaTermino: new Date("2026-02-07") },
    { id: 17, roomId: 3, fechaInicio: new Date("2026-01-20"), fechaTermino: new Date("2026-02-17") },
    { id: 18, roomId: 4, fechaInicio: new Date("2026-02-01"), fechaTermino: new Date("2026-03-01") },
    { id: 19, roomId: 5, fechaInicio: new Date("2026-02-05"), fechaTermino: new Date("2026-03-05") },
    { id: 20, roomId: 6, fechaInicio: new Date("2026-02-15"), fechaTermino: new Date("2026-03-15") },
  ];

  async getAllReservations() {
    return this.reservations;
  }

  async getReservationById(id: number) {
    return this.reservations.find(r => r.id === id);
  }

  async addReservation(reservation: Reservation) {
    reservation.id = this.reservations.length + 1;
    this.reservations.push(reservation);
    return reservation;
  }

  async deleteReservation(id: number) {
    const index = this.reservations.findIndex(r => r.id === id);
    if (index !== -1) {
      const deleted = this.reservations.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
}
