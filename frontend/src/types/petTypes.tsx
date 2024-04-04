export interface IPets {
    _id?: string
    name: string
    breed: string
    weight: Number
    birthday: string
    medicalRecords: Array<IMedicalRecords>
    vetVisits: Array<IVetVisits>
    picture: string
    sex: string
    wants: Array<string>
    hates: Array<string>
    notes: Array<string>
    age: number
}

export interface IMedicalRecords {
    doctor: string
    reason: string
    date: Date
    note: string
    medication: string
}

export interface IVetVisits {
    date: Date
    location: string
    doctor: string
    reason: string
}
