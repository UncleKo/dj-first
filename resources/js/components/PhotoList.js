import React, { useState } from 'react';
import Pagination from './Pagination';

const PhotoList = (props) => {
  
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(10);

  const insertImageFromList = (e) => {
    // console.log(e.target.dataset.medium)
    let image = `<a href="${e.target.dataset.origin}"><img src="${e.target.dataset.medium}"></a>`;
    document.querySelector('#id_content').value += image;
  }


  const hideList = () => {
    document.querySelector('.photo-upload').style.display = 'block';
    document.querySelector('.photo-list').style.display = 'none';
  }

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = props.photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const lastPage = Math.ceil(props.photos.length / photosPerPage);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const toPreviousPage = () => setCurrentPage(currentPage-1);
  const toNextPage = () => setCurrentPage(currentPage+1);

  // render() {
    let elements = currentPhotos.map((photo,index) => {
      return (
      <li key={photo.id}>
        <img className="thumb" onClick={insertImageFromList} src={ photo.thumbnail } data-medium={ photo.medium } data-origin={ photo.origin }/> 
      </li>
      )
    })
    return (
        <div className="photo-list">
          <div>
            <p>クリックして画像を挿入</p>
            <button className="btn btn-outline-info keep-modal" onClick={hideList}>写真をアップロードする</button>
          </div>
          <ul>
            {elements}
          </ul>
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            paginate={paginate}
            toPreviousPage={toPreviousPage}
            toNextPage={toNextPage}
          />
        </div>
    )

}

export default PhotoList;
