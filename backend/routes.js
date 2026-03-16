import express from "express"
import {loadDB,saveDB} from "./db.js"

const router = express.Router()

router.get("/collections/:name",(req,res)=>{

 const db = loadDB()
 const name = req.params.name

 if(!db.collections[name]) db.collections[name] = []

 res.json(db.collections[name])
})

router.post("/collections/:name",(req,res)=>{

 const db = loadDB()
 const name = req.params.name

 db.collections[name] = db.collections[name] || []

 const record = {
  id: Date.now().toString(36),
  ...req.body,
  created_at:new Date().toISOString()
 }

 db.collections[name].unshift(record)

 saveDB(db)

 res.json(record)
})

router.patch("/collections/:name/:id",(req,res)=>{

 const db = loadDB()

 const {name,id} = req.params

 const col = db.collections[name] || []

 const index = col.findIndex(x=>x.id===id)

 if(index === -1){
  return res.status(404).json({error:"not found"})
 }

 col[index] = {...col[index],...req.body}

 saveDB(db)

 res.json(col[index])
})

router.delete("/collections/:name/:id",(req,res)=>{

 const db = loadDB()

 const {name,id} = req.params

 db.collections[name] = (db.collections[name] || []).filter(x=>x.id !== id)

 saveDB(db)

 res.json({ok:true})
})

export default router