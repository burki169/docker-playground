import express from 'express';
import { createClient } from 'redis';

var client = createClient({url:"redis://redis:6379"});


var app = new express();
app.use(express.json());

app.get("/:key", async (req,res) =>{
    await client.connect();
    await client.set("Customer","Burak");
    const val = await client.get(req.params.key);
    await client.disconnect();
    res.send(`Value is ${val}`);
});

app.post("/", async (req,res) =>{    
try{
    if(!client.isOpen){
        await client.connect();
    }    
    console.log(`${req.body.key} ${req.body.val}`);
    await client.set(req.body.key,req.body.val);
    //const val = await client.get(req.params.key);    
    res.send(`Value for ${req.body.key} is stored as ${req.body.val}`);
}catch(err){
    console.log(err);
    res.status(500).send();    
}
finally{
    await client.disconnect();
}
    
});

app.listen(8080,"0.0.0.0",() => { console.log("Server started")});
