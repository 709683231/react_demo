import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';


const BASE = ''
//登陆
export const reqLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE+'/manage/user/add',user,'POST')
//获取所有用户列表
export const reqUserList = () => ajax(BASE+'/manage/user/list',{})

//获取数据
export const reqCategorys = (parentId)=> ajax(BASE + '/manage/category/list',{parentId},'GET')
//根据分类ID获取分类
export const reqCategory = (categoryId)=> ajax(BASE + '/manage/category/info',{categoryId})
//更新数据
export const reqUpdateCategory = (categoryId,categoryName) => ajax(BASE + '/manage/category/update',{categoryId,categoryName},'POST')
//添加分组
export const reqAddCategory = (parentId,categoryName) => ajax(BASE + '/manage/category/add',{parentId,categoryName},'POST')
//获取商品分页列表
export const reqProductList = (pageNum,pageSize) => ajax(BASE + '/manage/product/list',{pageNum,pageSize})
//按需获取商品列表 
export const reqProductSearchList = (pageNum,pageSize,searchType,searchName) => ajax(BASE + '/manage/product/search',{pageNum,pageSize,[searchType]:searchName})
//对商品进行上架/下架处理
export const reqUpdateStatus = (productId,status) => ajax(BASE + '/manage/product/updateStatus',{productId,status},'POST')
// 添加商品
//export const reqSubmit = (categoryId ,pCategoryId,name ) => ajax(BASE + '/manage/product/add',{categoryId ,pCategoryId,name },'POST')
// 更新/添加商品
export const reqAddAndUpdateProduct = (product) => ajax(BASE + '/manage/product/'+(product._id?'update':'add'),product,'POST')
//上传图片
export const reqImgUpLoad = (image) => ajax(BASE + '/manage/img/upload','image','POST')
//删除图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete',{name},'POST')




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
                message.error('获取天气失败')
            }
            
        })
    },2000)
  })
}