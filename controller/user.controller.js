const userContoller = {}    // 객체타입
const User = require("../model/User")
const bcrypt = require("bcrypt")
const saltRounds = 10;


userContoller.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body
        const user = await User.findOne({ email: email })
        if (user) {
            throw new Error("이미 가입된 유저 입니다!!")
        }

        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = new User({ email, name, password: hash })
        await newUser.save()    // 저장해주세요
        res.status(200).json({ status: "success" })

    } catch (error) {

        res.status(400).json({ status: "fail", message: error.message })
    }
}

userContoller.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }, "-createdAt -updatedAt -__v")
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password)
            if (isMatch) {
                const token = user.generateToken()
                return res.status(200).json({ status: "success", user, token })
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다. ")

    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
}

userContoller.getUser = async (req, res) => {
    try {
        const userId = req.userId;      // req.userId는 authenticate 미들웨어 설정됨.  
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("can not find user")
        }
        
        res.status(200).json({ status: "success", user })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
}

module.exports = userContoller

//미들웨어
