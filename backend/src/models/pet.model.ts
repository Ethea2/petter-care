import { Model, Schema, model, Types } from "mongoose"
import { IMedicalRecords, IPets } from "../types/pet.types"
import cloudinary from "../utils/cloudinary"
import User from "./user.model"
import { ObjectId } from "mongodb"

interface PetModel extends Model<IPets> {
    //statics function go here!
    addPetsWithPic(
        name: string,
        breed: string,
        weight: number,
        birthday: Date,
        picturePath: string,
        user_id: string
    ): IPets
    addPets(
        name: string,
        breed: string,
        weight: number,
        birthday: Date,
        user_id: string
    ): IPets
}

const petSchema = new Schema<IPets | PetModel>({
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
    },
    picture: {
        type: String
    },
    medicalRecords: [
        {
            type: String
        }
    ]
})

petSchema.static(
    "addPetsWithPic",
    async function addPetsWithPic(
        name: string,
        breed: string,
        weight: number,
        birthday: Date,
        picturePath: string,
        user_id: string
    ) {
        try {
            const result = await cloudinary.uploader.upload(picturePath, {
                use_filename: true,
                folder: "Petter-Care"
            })
            const pet = await this.create({
                name,
                breed,
                weight,
                birthday,
                picture: result.secure_url
            })
            const user = await User.findById({ user_id })
            if (!user) {
                throw Error("The user does not exist")
                return
            }

            if (!pet) {
                throw Error("The pet upload failed")
                return
            }

            if (!pet._id) {
                throw Error("The pet ID is missing, upload failed")
                return
            }
            user.pets.push(pet._id)

            user.save()
            return pet
        } catch (error) {
            const result = error as Error
            throw Error(result.message)
        }
    }
)

petSchema.static(
    "addPets",
    async function addPets(
        name: string,
        breed: string,
        weight: number,
        birthday: Date,
        user_id: string
    ) {
        try {
            const pet = await this.create({
                name,
                breed,
                weight,
                birthday
            })

            const user = await User.findById({ user_id })
            if (!user) {
                throw Error("The user does not exist")
                return
            }

            if (!pet) {
                throw Error("The pet upload failed")
                return
            }

            if (!pet._id) {
                throw Error("The pet ID is missing, upload failed")
                return
            }
            return pet
        } catch (error) {
            const result = error as Error
            throw Error(result.message)
        }
    }
)
