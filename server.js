const express = require("express");
const dbConnection = require("./dbConnect");
const itemsRoute = require("./routes/itemsRoute");
const userRoute = require("./routes/userRoute");
const billsRoute = require("./routes/billsRoute");
const saleRoute = require('./routes/salesItems')
const searchRoute = require('./routes/search')
const app = express();


app.use(express.json());


app.use("/api/items/", itemsRoute);
app.use("/api/users/", userRoute);
app.use("/api/bills/", billsRoute);
app.use("/api/sale/", saleRoute);
app.use("/api/sale/", searchRoute);

const path = require('path');

if(process.env.NODE_ENV==='production')
{
    app.use('/' , express.static('cimpex-inventory/build'))
    app.get('*' , (req,res)=>{
         res.sendFile(path.resolve(__dirname , 'cimpex-inventory/build/index.html'))
    }) 
}


const port = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Hello, world"));
app.listen(port, () => console.log(`Example app  ${port}`));