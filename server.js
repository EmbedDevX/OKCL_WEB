const express =  require('express')
const cors = require('cors')
const mssql = require("mssql")


const port = 5000;
const app = express();


app.use(express.urlencoded({
    extended: false
}));
app.use(cors())
app.use(express.json())

const sqlConfig = {
    server: '4.193.100.251',
    user: 'SA',
    password: 'Soulsvciot01',
    database: 'okcl',
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
}
mssql.connect(sqlConfig, (err, result) => {
    if (err) throw err
    else {
        console.log('Connected to DB');
    }
})
// app.use(express.json())

app.post('/register' , (req , res) => {
    console.log(req.body)
    // let query = `SELECT * FROM okcl_master WHERE slno = '1'`
    // let query = `SELECT * FROM okcl_master WHERE benefitaccount_no = '${req.body.accn}' AND mobile = '${req.body.phone}'`
    let query = `SELECT * FROM okcl_master WHERE mobile = '${req.body.phone}'`
    let result = mssql.query(query , (err , result) => {
        if(err) {console.log(err)}
        else {
            if(result.recordset.length > 0){
                res.send(JSON.stringify(Object.values(result.recordset[0])))
            } else {
                res.send(JSON.stringify([true , "Incorrect Inputs , Please Re-Enter Data Again"]))
            }
        }
    })
    
})

app.listen(port , ()=> console.log("Server Running at Port 5000"))