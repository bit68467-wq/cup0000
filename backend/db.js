import fs from "fs"

const DB_FILE = "./database.json"

export function loadDB(){
 if(!fs.existsSync(DB_FILE)){
  fs.writeFileSync(DB_FILE, JSON.stringify({collections:{}}))
 }
 return JSON.parse(fs.readFileSync(DB_FILE))
}

export function saveDB(data){
 fs.writeFileSync(DB_FILE, JSON.stringify(data,null,2))
}