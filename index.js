
const express = require('express')
const app = express()
const port = 3000
const quotesRoute = require("./v1/routes/quotesRoute")


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))



//routes
app.use("/api/v1/quotes",quotesRoute)



app.post('*',(req, res)=>{
  res.status(404).json({status:"Endpoint doesn't exist"})
})

//server running
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})