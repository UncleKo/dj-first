// import React from 'react';
import React from 'react'
import axios from 'axios';

import Dropzone from './Dropzone';

class PhotoList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      photos: [],
      file: null
    }
  }

  getData = () => {
    axios.get('http://127.0.0.1:8000/api/photos/')
      .then(res => {
        // console.log(res.data)
        this.setState({
          photos: res.data
        });
        // console.log(res.data);
      });
  }

  componentDidMount() {
    this.getData();
  }

  // addPhoto = (newPhoto) => {
  //   // console.log(newPhoto)
  //   this.setState(state => ({
  //     photos: [newPhoto, ...state.photos]
  //   }));
  // }

  insertImage = (data) => {
    // console.log(e.target.dataset.medium)
    let image = `<a href="${data.origin}"><img src="${data.medium}"></a>`;
    document.querySelector('#id_content').value += image;
  }

  postData = (e) => {
    e.preventDefault();
    // this.fileUpload(this.state.file).then(this.getData());
    this.fileUpload(this.state.file).then( res => {
      // this.addPhoto(res.data);
      this.insertImage(res.data);
    });
  }

  // onChange = (e) => {
  //   // console.log(e.target.files[0]);
  //   this.setState({file:e.target.files[0]});
  // }

  dropChange = (file) => {
    // console.log(file);
    this.setState({file: file})
  }

  fileUpload = (file) => {
    const url = 'http://127.0.0.1:8000/api/photos/';
    const formData = new FormData();
    formData.append('origin', file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData, config);
  }

  // expandModal() {
  //   modal.classList.add('show-modal');
  // }

  insertImageFromList = (e) => {
    // console.log(e.target.dataset.medium)
    let image = `<a href="${e.target.dataset.origin}"><img src="${e.target.dataset.medium}"></a>`;
    document.querySelector('#id_content').value += image;
  }

  showList = () => {
    document.querySelector('.photo-upload').style.display = 'none';
    document.querySelector('.photo-list').style.display = 'block';
  }

  hideList = () => {
    document.querySelector('.photo-upload').style.display = 'block';
    document.querySelector('.photo-list').style.display = 'none';
  }

  render() {
    // console.log(this.state.photos);
    let elements = this.state.photos.map((photo,index) => {
      return (
      <li key={photo.id}>
        <img className="thumb" onClick={this.insertImageFromList} src={ photo.thumbnail } data-medium={ photo.medium } data-origin={ photo.origin }/> 
      </li>
      )
    })
    return (
      <div>
        <div className="photo-upload">
          <Dropzone dropChange={this.dropChange} />
          <button className="btn btn-primary" onClick={this.postData}>アップロードして画像を挿入</button>
          <p>or</p>
          <button className="btn btn-outline-info keep-modal" onClick={this.showList}>アルバムから選択して挿入</button>
        </div>
        <div className="photo-list">
          <small>画像をクリックして挿入</small>
          <button className="btn btn-outline-info keep-modal" onClick={this.hideList}>写真をアップロードする</button>
          <ul>
            {elements}
          </ul>
        </div>
        {/* <input type="file" className="keep-modal" onChange={this.onChange} />
        <button className="btn btn-primary keep-modal" onClick={this.postData}>アップロード</button> */}
        {/* <form method="POST" action="http://127.0.0.1:8000/api/photos/" onSubmit={this.postData}>
          <input type="file" className="keep-modal" onChange={this.onChange} />
          <button className="btn btn-primary keep-modal" type="submit">アップロード</button>
        </form> */}
      </div>
    )
  } //render

}

export default PhotoList;
