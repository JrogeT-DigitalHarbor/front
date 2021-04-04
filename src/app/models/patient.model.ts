import { Appointment } from "./appointment.model";

export class Patient {
    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public dateOfBirth: string,
        public address: string,
        public profilePicture: string,
        public appointments: Array<Appointment>
    ) { }
}
