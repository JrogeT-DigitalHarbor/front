export class Hospital {
    constructor(
        public id: string,
        public name: string,
        public doctorsIds: Array<string>
    ) { }
}