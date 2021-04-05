import { AppointmentDTO } from "./appointment-dto.model";

export class DoctorDTO {
    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public dateOfBirth: string,
        public address: string,
        public profilePicture: string,
        public specialtiesIds: Array<string>,
        public hospitalId: string,
        public appointments: Array<AppointmentDTO>
    ) { }
}
