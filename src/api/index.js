import ajax from './ajax';
const BASE = 'http://localhost3000'
//登陆
export const reqLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE+'/login',user,'POST')

reqLogin('admin','admin').then(result =>{
    console.log('result'+result)
})