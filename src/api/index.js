import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';


const BASE = ''
//登陆
export const reqLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE+'/manage/user/add',user,'POST')



//发送jsonp请求
export const reqWeather = (location) =>{
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        jsonp(url,{},(err,data)=>{
            if(!err && data.status==='success'){
                const{dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                message.err('获取天气失败')
            }
            
        })
    },2000)
  })
}