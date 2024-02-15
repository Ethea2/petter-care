import { Types } from "mongoose"

export interface IPets {
    _id?: Types.ObjectId | string
    name: string
    breed: string
    weight: Number
    birthday: string
    medicalRecords: string | IMedicalRecords | Types.ObjectId
    picture: string
}

//temporary medical record field.
export interface IMedicalRecords {
    type: ["vaccines", "infections", "dental_records"]
    data: string
}
