import axios from "axios";


const axiosClient = axios.create({

// for hosting domain ...!
          //  baseURL: 'https://featuresphere.wuaze.com/',
// for development ...! or local run  
        // baseURL: 'http://localhost:9000/',
// for hosting domain ...!
        baseURL: 'https://task.k.strikerlulu.me/',
})

  
export default axiosClient;