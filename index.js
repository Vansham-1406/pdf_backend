const express = require("express");
const body_parser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const path = require("path");

const pdfTemplate = require("./documents")

const app = express();
const port = process.env.port || 5109
app.use(cors())
app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json());

app.post("/create-pdf", (req,res)=>{
    pdf.create(pdfTemplate(req.body),{}).toFile('result.pdf',(err)=>{
        if(err)
        {
            return res.send(Promise.reject())
        }

        return res.send(Promise.resolve())
    })
})

app.get("/fetch-pdf",(req,res)=>{
    // res.sendFile(`../result.pdf`)
    const filePath = path.join(__dirname,'result.pdf');
    // const filename = 'result.pdf';
    res.download(filePath);
})

app.listen(port,()=>{console.log(`listening at port : ${port}`)})