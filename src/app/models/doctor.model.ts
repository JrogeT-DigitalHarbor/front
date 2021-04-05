import {Appointment} from "./appointment.model";

export class Doctor {
  constructor(
    public name: string,
    public lastname: string,
    public dateOfBirth: string,
    public address: string,
    public profilePicture: string,
    public specialtiesIds: Array<string>,
    public hospitalId: string,
    public appointments: Array<Appointment>,
    public id?: string,
  ) {
  }
}
