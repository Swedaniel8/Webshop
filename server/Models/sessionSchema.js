import mongoose from "mongoose";


const sessionSchema = mongoose.Schema({
    userId: {type:String,sparse: true, unique: true},
    accessToken: String,
    refreshToken: String
    
}
)



const Session = mongoose.model("Session", sessionSchema)

export default Session

/*
TOKEN EXPIRATION FORMAT
expiresIn('2 days')  // 172800000
expiresIn('1d')      // 86400000
expiresIn('10h')     // 36000000
expiresIn('2.5 hrs') // 9000000
expiresIn('2h')      // 7200000
expiresIn('1m')      // 60000
expiresIn('5s')      // 5000
expiresIn('1y')      // 31557600000
expiresIn('100')     // 100
expiresIn('-3 days') // -259200000
expiresIn('-1h')     // -3600000
expiresIn('-200')    // -200


*/