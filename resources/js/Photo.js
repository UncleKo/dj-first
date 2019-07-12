import React from 'react';
import axios from 'axios';

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

  addPhoto = (newPhoto) => {
    // console.log(newPhoto)
    this.setState(state => ({
      photos: [newPhoto, ...state.photos]
    }));
  }

  postData = (e) => {
    e.preventDefault();
    // this.fileUpload(this.state.file).then(this.getData());
    this.fileUpload(this.state.file).then( res => {
      this.addPhoto(res.data);
    });
  }

  onChange = (e) => {
    // console.log(e.target.files[0]);
    this.setState({file:e.target.files[0]});
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

  insertImage = (e) => {
    // console.log(e.target.dataset.medium)
    let image = `<a href="${e.target.dataset.origin}"><img src="${e.target.dataset.medium}"></a>`;
    document.querySelector('#id_content').value += image;
  }

  render() {
    // console.log(this.state.photos);
    let elements = this.state.photos.map((photo,index) => {
      return (
      <li key={photo.id}>
        <img className="thumb" onClick={this.insertImage} src={ photo.thumbnail } data-medium={ photo.medium } data-origin={ photo.origin }/> 
      </li>
      )
    })
    return (
      <div>
        <div className="photo-list">
          <small>クリックして画像を挿入</small>
          <ul>
            {elements}
          </ul>
        </div>
        <small>or 画像をアップロード</small>
        
        {/* <input type="file" className="keep-modal" onChange={this.onChange} />
        <button className="btn btn-primary keep-modal" onClick={this.postData}>アップロード</button> */}
        <form method="POST" action="http://127.0.0.1:8000/api/photos/" onSubmit={this.postData}>
          <input type="file" className="keep-modal" onChange={this.onChange} />
          <button className="btn btn-primary keep-modal" type="submit">アップロード</button>
        </form>
      </div>
    )
  } //render

}

export default PhotoList;
