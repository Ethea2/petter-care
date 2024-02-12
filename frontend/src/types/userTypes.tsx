import { Types } from "mongoose"

export interface UserType {
    username: string
    _id: Types.ObjectId
    token?: string
}
