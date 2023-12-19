import axios from "axios";


const axiosClient = axios.create({
  baseURL: 'https://featuresphere.wuaze.com/',
})
// for development ...! or local run  baseURL: 'http://localhost:9000/api',
// for hosting domain ...!
    //     baseURL: 'https://task-managment-app.k.strikerlulu.me',
  
export default axiosClient;