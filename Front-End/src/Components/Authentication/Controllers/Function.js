import axios from "axios"


// product add in favorite 
export const addToFavorite=(productId)=>{
     axios.post('http://localhost:8000/add-to-favourite',{productId},{
          withCredentials : true
     }).then((res)=>{
          console.log(res)
          
     }).catch((err=>{
          console.log(err)
     }))
}
// product delete in favorite 
export const deleteToFavorite=(productId)=>{
     axios.delete(`http://localhost:8000/remove-from-favourite/${productId}`,{
          withCredentials : true
     }                     
     ).then((res)=>{
          console.log(res)
          return false;
     }).catch((err=>{
          console.log(err)
          return true;
     }))
}