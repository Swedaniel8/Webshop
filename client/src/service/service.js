import http from '../http-common'

//* POST 
export const addItemPost = (data) => {return http.post("/additempost",data)}
export const getItem = () => {return http.get("/getitemsget")}
