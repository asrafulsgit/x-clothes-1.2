import axios from "axios";


const  apiRequiest = async(method,route,data=null,headers={}) =>{
     try {
          const res = await axios({
               method,
               url :`${import.meta.env.VITE_BACKEND_URL}${route}`,
               data,
               headers
          })
          return res.data;
     } catch (error) {
          console.log('API ERROR : ',error)
     }
}

export default apiRequiest;