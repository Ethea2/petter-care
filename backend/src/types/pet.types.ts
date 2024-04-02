import { Types } from "mongoose"

export interface IPets {
    _id?: Types.ObjectId | string
    name: string
    breed: string
    weight: Number
    birthday: string
    medicalRecords: string | IMedicalRecords | Object
    vetVisits: string | IVetVisits | Object
    picture: string
    sex: string
    wants: Array<string>
    hates: Array<string>
    notes: Array<string>
}

//temporary medical record field.
export interface IMedicalRecords {
    doctor: string
    reason: string
    date: Date
    note: string
}

export interface IVetVisits {
    date: Date
    location: string
    doctor: string
    reason: string
}
