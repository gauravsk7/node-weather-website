const path=require('path')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const express=require('express')
const hbs=require('hbs')
const request = require('request')

const app=express()


//Define paths for express configuration
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



//Routes
app.get('/',(req,res)=>{
    res.render('index',{ 
        title:'Weather',
        name:'Gaurav'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Gaurav'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Gaurav',
        title:'Help'
    })
})



// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Gaurav',
//         age:19,
//         place:'Pune'
//     })
// })


// app.get('/about',(req,res)=>{
//     res.send("About page")
// })


//API endpoint
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Enter an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={})=>{
        if(error){
             //return console.log(error)
             return res.send({
                error
             })
        }
        
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                //return console.log(error)
                return res.send({
                    error
                })
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                address:req.query.address,
                location,
                forecast:forecastData

            })
          })
        
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        message:'Help article not found',
        name:'Gaurav'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        message:'Page not found',
        name:'Gaurav'
    })
})



//app.com
//app.com/help
//app.com/about
//app.com/weather


app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})