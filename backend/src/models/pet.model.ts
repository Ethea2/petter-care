import { Model, Schema, model, Types } from "mongoose"
import { IMedicalRecords, IPets } from "../types/pet.types"

interface PetModel extends Model<IPets> {
    //statics function go here!
}

const petSchema = new Schema<IPets>({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    weight: {
        type: Number
    },
    birthday: {
        type: String
    }
})
