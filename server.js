import express from 'express';

const app = express();
const port = 3000;

app.get("/",(req,res)=>{
    res.send("Hello Word")
});

// para que funcione necesita algo que escuche

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
});