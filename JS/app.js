  
'use strict';

function Pictures(pic) {
  this.image = pic.image_url;
  this.title = pic.title;
  this.description = pic.description;
  this.keyword = pic.keyword;
  this.horns = pic.horns;
  //Pictures.allkeys.push(this.keyword);

}
//let allkeys=[]

Pictures.prototype.render = function () {
  let newOption = $('<option></option>').text(this.keyword);
  $('select').append(newOption);
  let picturesClone = $('#photo-template').clone();
  picturesClone.find('h2').text(this.title);
  picturesClone.find('img').attr('src', this.image);
  picturesClone.find('p').text(this.description);
  picturesClone.attr('class', this.keyword);
  picturesClone.attr('id', this.keyword);
  $('main').append(picturesClone);
};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax('data/page-1.json', ajaxSettings).then((data) => {
  data.forEach(Element => {
    let imgs = new Pictures(Element);
    imgs.render();
  });
});

$(document).ready(function(){
  $('select').on('change', function(){
    let selected = this.value;
    console.log(this.value);
    $('section').hide();
    $(`.${selected}`).show();
  });
});