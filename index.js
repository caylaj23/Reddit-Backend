let express = require('express')
const Pool = require('pg').Pool
let app = express()
let bodyParser = require("body-parser")
let cors = require('cors')

const corsOptions = {
    origin: '*',
    credentials: 'true',
    optionsSuccessStatus : 200,

}
app.use(cors(corsOptions))

app.use(bodyParser.json())

const pool = new Pool({
    user:'cjohnson345',
    host: 'localhost',
    database: 'reddit',
    password: 'password',
    port: 5432
})

app.get('/', function(req,res){
    pool.query('SELECT * FROM userinfo', function(error, results){
        if(error) {
            throw error
        }
        res.send(results.rows)
    })

})

app.post('/post', function(req,res){
 let votes = req.body.votes
 let image = req.body.image
 let title = req.body.title
 let author = req.body.author
 let subreddit = req.body.subreddit
    
    pool.query('INSERT INTO userinfo (votes, image, title, author, subreddit) VALUES ($1,$2,$3,$4,$5)', [votes, image, title, author, subreddit], function (error, results){
    if(error){
        throw error
    }
    res.json("Post Added")
    
    })
})

app.put('/post/:id', function(req,res){
    const id = req.params.id
    const votes = req.body.votes

    
    pool.query('UPDATE userinfo SET votes = $1 WHERE id = $2', [votes, id], function(error,results){
        if(error){
            throw error
        }
        res.json({votes, id})
})

})

app.listen(3000)