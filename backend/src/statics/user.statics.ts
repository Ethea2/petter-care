import { userSchema } from "../models/user.model"
import bcrypt from "bcrypt"

userSchema.static(
    "signup",
    async function signup(username: string, password: string) {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)

        const user = await this.create({ username, password: hash })

        return user
    }
)

userSchema.static(
    "login",
    async function login(username: string, password: string) {
        if (!username || !password) {
            throw Error("All fields must be field")
        }

        const user = await this.findOne({ username })

        if (!user) {
            throw Error("Incorrect username")
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error("Wrong password!")
        }

        return user
    }
)

userSchema.static("getUser", async function getUser(_id: string) {
    try {
        const user = await this.findById(_id).select("-password")
        return user
    } catch (error) {
        throw Error("Could not fetch the user")
    }
})

userSchema.static("getAllUsers", async function getAllUsers() {
    try {
        const users = await this.find({}).select("-password")
        return users
    } catch (error) {
        throw Error("Could not fetch the users")
    }
})
userSchema.static(
    "signup",
    async function signup(username: string, password: string) {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)

        const user = await this.create({ username, password: hash })

        return user
    }
)

userSchema.static(
    "login",
    async function login(username: string, password: string) {
        if (!username || !password) {
            throw Error("All fields must be field")
        }

        const user = await this.findOne({ username })

        if (!user) {
            throw Error("Incorrect username")
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error("Wrong password!")
        }

        return user
    }
)

userSchema.static("getUser", async function getUser(_id: string) {
    try {
        const user = await this.findById(_id).select("-password")
        return user
    } catch (error) {
        throw Error("Could not fetch the user")
    }
})

userSchema.static("getAllUsers", async function getAllUsers() {
    try {
        const users = await this.find({}).select("-password")
        return users
    } catch (error) {
        throw Error("Could not fetch the users")
    }
})
userSchema.static(
    "signup",
    async function signup(username: string, password: string) {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)

        const user = await this.create({ username, password: hash })

        return user
    }
)

userSchema.static(
    "login",
    async function login(username: string, password: string) {
        if (!username || !password) {
            throw Error("All fields must be field")
        }

        const user = await this.findOne({ username })

        if (!user) {
            throw Error("Incorrect username")
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error("Wrong password!")
        }

        return user
    }
)

userSchema.static("getUser", async function getUser(_id: string) {
    try {
        const user = await this.findById(_id).select("-password")
        return user
    } catch (error) {
        throw Error("Could not fetch the user")
    }
})

userSchema.static("getAllUsers", async function getAllUsers() {
    try {
        const users = await this.find({}).select("-password")
        return users
    } catch (error) {
        throw Error("Could not fetch the users")
    }
})
