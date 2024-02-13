import { Types } from "mongoose"

export interface IPets {
    _id?: Types.ObjectId
    name: string
    breed: string
    weight: Number
    birthday: string
    medicalRecords: IMedicalRecords[]
}

//temporary medical record field.
export interface IMedicalRecords {
    type: ["vaccines", "infections", "dental_records"]
    data: string
}
