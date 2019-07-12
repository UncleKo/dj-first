import {$, $$} from './bling.js';
import React from 'react';
import ReactDOM from 'react-dom';
import PhotoList from './Photo';

ReactDOM.render(<PhotoList />, document.getElementById('photos'));

(function ($, $$) {


  let modal = $('.modal');
  // let photos = $$('#photos img');

  // // transfered to Photo.js(React Component)
  // function insertImage() {
  //   let image = '<a href="' + this.dataset.origin + '"><img src="' + this.dataset.medium + '"></a>';
  //   let image = `<a href="${this.dataset.origin}"><img src="${this.dataset.medium}"></a>`;
  //   $('#id_content').value += image;
  // }

  function expandModal() {
    modal.classList.add('show-modal');
  }

  function closeModal(e) {
    // console.log(e.target);
    // let a = e.target
    // let parents = [];
    // while (a) {
    //     parents.unshift(a);
    //     a = a.parentNode;
    //  }
    //  console.log(parents);
    if(!e.target.classList.contains('keep-modal')) {
      modal.classList.remove('show-modal');
    }
  }

  // photos.forEach( photo => photo.on('click', insertImage));

  $('#expand-modal').on('click', expandModal);

  modal.on('click', closeModal);



  // // Without bing.js
  // let modal = document.querySelector('.modal');
  // let photos = document.querySelectorAll('#photos img');

  // function insertImage() {
  //   let image = '<a href="' + this.dataset.origin + '"><img src="' + this.dataset.medium + '"></a>';
  //   document.querySelector('#id_content').value += image;
  // }

  // function expandModal() {
  //   modal.classList.add('show');
  // }

  // function closeModal(e) {
  //   // console.log(e);
  //   // if(e.target==='form') return;
  //   modal.classList.remove('show');
  // }

  // photos.forEach( photo => photo.addEventListener('click', insertImage));

  // document.querySelector('#expand-modal').addEventListener('click', expandModal);

  // modal.addEventListener('click', closeModal);

})($, $$);