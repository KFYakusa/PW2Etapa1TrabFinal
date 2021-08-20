import axios from 'axios'



const instance = axios.create({
  baseURL:process.env.NODE_ENV==="production"?process.env.API_URL : "http://localhost:3001",
  headers:{
    'content-type':'application/json'
  }
});


export default{
  singUp:(authObject)=>{
    return instance({
      method:'POST',
      url:'/user/singup',
      data:{
        'email': authObject.email,
        'password':authObject.password,
        'username':authObject.username,
        'role':1,
      }
    })
  },

  login:(authObject)=>{
    return instance({
      method:'POST',
      url:'/user/login',
      data:{
        email:authObject.email,
        password:authObject.password
      }
    })
  },

  calcTemp:(tempObject)=>{
    const { scale, number} = tempObject
    return instance({
      method:'POST',
      url:'/aula2/temperature',
      data:{
        scale:scale,
        number:number
      }
    })
  }
}