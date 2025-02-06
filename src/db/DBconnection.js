import mongoose from "mongoose"

const ConnectionDB=async()=>{
    await mongoose.connect(process.env.URI_ONLINE).then(()=>{
        console.log('db are connecting')
    }).catch((err)=>{
        console.log('fail to connect',err)

    })
}
export default ConnectionDB