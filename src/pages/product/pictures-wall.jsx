import React ,{Component} from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import {BASE_IMG_URL} from '../../utils/constants';
import ProtoTypes from 'prop-types';
import {reqDeleteImg} from '../../api';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {

  static protoTypes = {
      imgs:ProtoTypes.array
  }  
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ]
  };
  getImgs = ()=>{
    return this.state.fileList.map(file => file.name)
  }
  //关闭大图预览
  handleCancel = () => this.setState({ previewVisible: false });
  //打开大图预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  //文件对象发生改变时的回调
  handleChange = async ({file, fileList }) => {
    console.log(file,fileList)
    if(file.status==='done'){
      const result = file.response;
      if(result.status===0){
        const name = result.data.name;
        const url = result.data.url;
        fileList[fileList.length-1].name = name
        fileList[fileList.length-1].url = url
      }else{
        message.error('图片上传失败')
      }
    }else if(file.status==='removed'){
      const result = await reqDeleteImg(file.name);
      if(result.status===0){
        message.success('删除图片成功')
      }else{
        message.error('删除图片失败')
      }
    }
    this.setState({
      fileList
    })
  };
  componentWillMount(){
    const {imgs} = this.props;
    if(imgs && imgs.length>0){
      const fileList = imgs.map((img,index)=>({
        uid: -index + '',
        name: img,
        url: BASE_IMG_URL + img,
        status: 'done',
      }))
      this.setState({
        fileList
      })
    }
  }



  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div >
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          name='image'
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

