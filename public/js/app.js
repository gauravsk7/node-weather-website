//Client side javascript code

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const paraOne=document.querySelector('#Para1')
const paraTwo=document.querySelector('#Para2')



weatherForm.addEventListener('submit', (e)=>{          //e stands for event
    e.preventDefault()
    
    const location=search.value
    paraOne.textContent='Loading...'
    paraTwo.textContent=''

    const address=(location)=>{
        return location.replace(' ','%20')
    }
    const url='http://localhost:3000/weather?address='+address(location)
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                paraOne.textContent=data.error
            }
            else{
                paraOne.textContent=data.location
                paraTwo.textContent=data.forecast

            }
        })
    })

})