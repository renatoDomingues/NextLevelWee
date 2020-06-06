
//import sqlite3 dependency
const sqlite3 = require('sqlite3').verbose()
//.verbose() :a function method that makes importing more communicative with the dev

//create objects that will perform operations on databases
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db  

//use the database object, for our operrations
//db.serialize(()=>{
    //with sql command, I will:
    //(1)create a table
    /*db.run(`
       CREATE TABLE IF NOT EXISTS places (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           image TEXT,
           name TEXT,
           address TEXT,
           address2 TEXT,
           state TEXT,
           city TEXT,
           items TEXT
       );
    `)*/

    //(2)insert data into the table
    /*const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?); 
    `*/
    /*const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260 - sala 18",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]*/
    /*function afterInsertData(err)
    {
        if(err)
        {
            return console.log(err)
        }
        console.log('Registered sucessfully!')
        console.log(this)
    }*/
    //db.run(query, values, afterInsertData)
    
    //(3)consult the table data
    /*db.all(`SELECT * FROM places`, function(err, rows)
    {
        if(err)
        {
            return console.log(err)
        }
        console.log('Here are your records:')
        console.log(rows)
    })*/
    
    //(4)delete data from table
    /*db.run(`DELETE FROM places WHERE id = ?`, [ ], function(err)
    {
        if(err)
        {
            return console.log(err)
        }
        console.log('Record deleted sucessfully!')
    })*/
//})