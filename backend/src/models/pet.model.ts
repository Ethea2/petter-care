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
        birthday: Date,
        user_id: string,
        sex: string,
        age: number
    ): IPets
    getUserPets(id: string): Array<IPets>
    getPet(id: string): IPets
}

export const petSchema = new Schema<IPets, PetModel>({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    birthday: {
        type: String
    },
    picture: {
        type: String,
        default:
            "https://res.cloudinary.com/dtocowzq2/image/upload/v1712161354/petter-care-defaults/sklqkrvrda35kod55m8b.svg"
    },
    sex: {
        type: String,
        enum: ["Male", "Female"]
    },
    medicalRecords: [
        {
            type: Object
        }
    ],
    wants: [
        {
            type: String
        }
    ],
    hates: [
        {
            type: String
        }
    ],
    vetVisits: [
        {
            type: Object
        }
    ],
    notes: [
        {
            type: String
        }
    ],
    age: {
        type: Number
    }
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
        birthday: Date,
        user_id: string,
        sex: string,
        age: number
    ) {
        try {
            const user = await User.findById(user_id)
            if (!user) {
                throw Error("The user does not exist")
                return
            }

            const pet = await this.create({
                name,
                breed,
                birthday,
                sex,
                age
            })

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

petSchema.static("getUserPets", async function getUserPets(id: string) {
    try {
        const user = await User.findById(id)
        if (!user) {
            throw Error("The user does not exist")
            return
        }
        const pets = await this.find({
            _id: {
                $in: user.pets
            }
        })

        return pets
    } catch (e) {
        const result = e as Error
        throw Error(result.message)
    }
})

petSchema.static("getPet", async function getPet(id: string) {
    try {
        const pet = await this.findById(id)
        return pet
    } catch (e) {
        const result = e as Error
        throw Error(result.message)
    }
})

const Pet = model<IPets, PetModel>("Pet", petSchema)

export default Pet
