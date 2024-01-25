//created
const mysql=require('mysql') 
const connection =mysql.createConnection({
    host:'localhost',
    database:'testing',
    user:'root',
    password:''
})
connection.connect(function(err){
    if(err){
        throw error;
    }
    else{
        console.log('mySQL Database is connected successfully');
    }//sql DB connected
})
module.exports=connection;
