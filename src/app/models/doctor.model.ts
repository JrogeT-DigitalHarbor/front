import { DatePipe } from "@angular/common";

export class Doctor {
    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public dateOfBirth: string,
        public address: string,
        public profilePicture: string,
        public specialtiesIds: Array<string>,
        public hospitalId: string
    ) { }
}
