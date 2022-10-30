async function climaReporte(){
    const clima = await fetch('https://weather.contrateumdev.com.br/api/weather/city/?city=Recife,pernambuco',{method: GET})
    console.log(clima)
}

climaReporte()