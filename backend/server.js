import express from "express"
import cors from "cors"
import routes from "./routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
 res.json({status:"cup9gpu backend running"})
})

app.use("/api",routes)

const PORT = process.env.PORT || 10000

app.listen(PORT,()=>{
 console.log("server running on",PORT)
})