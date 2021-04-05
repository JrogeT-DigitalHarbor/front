import { Patient } from "./patient.model";

export class AppointmentDTO {
    constructor(
        public description: string,
        public date: string,
        public doctorId: string,
        public patient: Patient
    ) { }
}
