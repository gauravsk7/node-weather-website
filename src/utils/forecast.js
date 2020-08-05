const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/5575c8ba7426b8ee259fbefac0417b8a/'+latitude+','+longitude+'?units=si'
    request({url, json:true},(error,response)=>{
        const {error:typeTwoError,currently,daily}=response.body
        if(error){
            callback('Unable to access weather service :(',undefined)
        } else if(typeTwoError){
            callback('Unable to find location', undefined)
        } else{
            const temp=currently.temperature        //Here response.body is already parsed ie it is an object
            const rainChance=(currently.precipProbability)*100
            callback(undefined, daily.data[0].summary+" It is "+temp+" degree C outside. There is a "+rainChance
            +"% chance of rainfall. Maximum temperature is "+daily.data[0].temperatureHigh+" degree C and minimum temperature is "+daily.data[0].temperatureLow+" degree C.")
        }
    })
}

module.exports=forecast



/*
const url='https://api.darksky.net/forecast/5575c8ba7426b8ee259fbefac0417b8a/18.5204,73.85?units=si'

request({url:url, json:true},(error, response)=>{
    // const data=JSON.parse(response.body)             When we use the json property,
    // console.log(data.currently)                      we dont need to use these two lines

    if(error){
        console.log('Unable to access weather service :(')
    }else if(response.body.error){
        console.log('Unable to find location')
    }else{
        const temp=response.body.currently.temperature        //Here response.body is already parsed ie it is an object
        const rainChance=(response.body.currently.precipProbability)*100
        console.log(response.body.daily.data[0].summary+" It is "+temp+" degree C outside. There is a "+rainChance+"% chance of rainfall.")
    }
    
})
*/