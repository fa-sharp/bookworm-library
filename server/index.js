import express from "express";

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/hello', (req,res) => {
    const { name } = req.query;
    res.status(200).json({ message: `Hello ${name ? name : 'friend'}!` });
    console.log(new Datej().toString(),"/hello: Sucessfully sent response!");
})

app.listen(PORT, () => {
    console.log(`Server nnlistening on port ${PORT}`);
})