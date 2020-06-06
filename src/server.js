
const express = require('express')
const server = express()
//get the database
const db = require('./database/db')

//configure public folder
server.use(express.static('public'))

//enable the use of req.body in our application
server.use(express.urlencoded({extended: true}))


//using template enginner, it passes dynamic HTML powers
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',
{
    express: server,
    noCache: true,
})

//setup my application paths, home page
server.get('/', (req, res)=>{
    //res.send('Arrive here!')
    return res.render('index.html', {title: 'Um título'})
})
server.get('/create-point', (req, res)=>{
    //req.query: Query Strings da nossa url
    //console.log(req.query)


    //res.sendFile(__dirname + '/views/create-point.html')
    return res.render('create-point.html')
})
server.post('/savepoint', (req, res)=>{
    
    //req.body: O corpo do nosso formulario
    //console.log(req.body)

    //insert data into the database
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?); 
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err)
    {
        if(err)
        {
            //return console.log(err)
            console.log(err)
            return res.send('Registration error!')
        }
        console.log('Registered sucessfully!')
        console.log(this)

        //return res.send('Ok!')
        return res.render('create-point.html', {saved: true})
    }
    db.run(query, values, afterInsertData)
    
    //return res.send('ok')
})
server.get('/search', (req, res)=>{

    const search = req.query.search
    if(search == "")
    {
        //empty search
        return res.render('search-results.html', {total: 0})
    }

    //get data from the database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows)
    {
        if(err)
        {
            return console.log(err)
        }
        //console.log('Here are yous records:')
        //console.log(rows)

        const total = rows.length

        //show the html page with the data from the database
        return res.render('search-results.html', {places: rows, total: total})
    })

    //return res.render('search-results.html')
})

//open the server
server.listen(3000) 