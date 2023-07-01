const express = require("express");
const path = require("path")
const app = express();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const port = 3000;
app.use('/static', express.static('downloads')) //cuz we are serving static files like images pdfs
const {mergePdfs}  = require('./merge')
// const {postWork}  = require('./script')

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "template/index.html"));
})

app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
    // console.log(req.files)
    //running mergePdfs function now passing two pdf files' path (from req.data.path)
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/merged_${d}.pdf` ) //here static means downloads
    //req.files is array of 'pdfs' files
    // res.send({data:req.files}) //use to check the content of req.file
    // postWork();
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})

//Multer helps in file upload in nodejs application

