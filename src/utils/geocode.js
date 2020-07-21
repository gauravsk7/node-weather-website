const request=require('request')

const convert=(address)=>{
    return address.replace(' ','%20')
}

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+convert(address)+'.json?access_token=pk.eyJ1IjoiZ2F1cmF2azciLCJhIjoiY2tjaW4xejNhMGc5dzJ1cDVlcTVxMnd1cCJ9.OD5tl0iJJheCKKk7IZc_HQ'
    request({url,json:true},(error,response)=>{
        const {features}=response.body
        if(error){
            callback('Unable to access service',undefined)
        } else if(features.length===0){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, {
                latitude:features[0].center[1],
                longitude:features[0].center[0],
                location:features[0].place_name
            })
        }
    })
}

module.exports=geocode



// const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/dick.json?access_token=pk.eyJ1IjoiZ2F1cmF2azciLCJhIjoiY2tjaW4xejNhMGc5dzJ1cDVlcTVxMnd1cCJ9.OD5tl0iJJheCKKk7IZc_HQ'

// request({url:url2, json:true},(error,response)=>{
//     if(error){
//         console.log('Unable to access mapbox')
//     }else if(response.body.features.length===0){
//         console.log('Unable to find location')
//     }else{
//         const lat=response.body.features[0].center[1]
//         const long=response.body.features[0].center[0]
//         console.log('The coordinates are '+lat+','+long+'.')
//     }
    
// })
