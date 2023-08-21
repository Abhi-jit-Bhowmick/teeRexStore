import axios from "axios"

const url = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

export const apicall = async()=>{
   return axios.get(url)
}