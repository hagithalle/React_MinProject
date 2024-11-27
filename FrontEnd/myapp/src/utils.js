import axios from "axios";

const getData= async(url)=>{
    const {data} = await axios.get(`${url}`)
    //console.log(data)
    return data
}

 export {getData}