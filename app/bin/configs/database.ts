import mongoose from "mongoose";

mongoose.Promise = global.Promise;

try {
    mongoose.connect("mongodb://localhost/neptune-finances", () => {
        console.log("Connection estabilished.")
    })
} catch (error) {
    console.log(`An error occurred. ${error}`);
}

export default mongoose;