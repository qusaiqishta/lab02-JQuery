'use strict'


let picturesArray=[];
let keywordsArray=[];
let page1Path='data/page-1.json';
let page2Path='data/page-2.json';
let defaultPage=page1Path;



function Pictures(objectPic){
  this.title=objectPic.title;
  this.description=objectPic.description;
  this.image_url=objectPic.image_url;
  this.keyword=objectPic.keyword;
  this.horns=objectPic.horns;
  picturesArray.push(this);
}

Pictures.prototype.renderWithMustache=function(){
  this.renderKeywords();
  let picSource=$('#photo-template').html();
  let html=Mustache.render(picSource,this);
  $('main').append(html);
}

$('#selectPage').on('change',function(){
  if($(this).value==='page1'){
    defaultPage=page1Path;
    console.log($('.p').value);
  }
  else if($(this).value==='page2'){
    defaultPage=page2Path;
  }
  ajaxFunction();
})
console.log(defaultPage);


const ajaxSetting={
  method:'get',
  dataType:'json'
}

function ajaxFunction(){
  
$.ajax(defaultPage,ajaxSetting).then(data=>{
  console.log(defaultPage);

  data.forEach(element => {
    let imgs= new Pictures(element);
    imgs.renderWithMustache();
    
   
  });
})}

ajaxFunction();

Pictures.prototype.renderKeywords=function(){
  if (!(keywordsArray.includes(this.keyword))){
    let newOption=$('<Option></Option>').text(this.keyword);
    newOption.attr('class','newOptions');
    $('#filtering').append(newOption);
    keywordsArray.push(this.keyword);
    
  }
  }
  console.log(keywordsArray,'naaa');

 
  $('#filtering').on('change', function () {
    $('section').hide();
    picturesArray.forEach(pic => { 
      if (this.value === pic.keyword) {
        $(`.${this.value}`).show(); 
        console.log(this.value)
      } else if (this.value === 'default') {
        $('section').show();
      }
    });
  });
  
$(document).ready(function () {
  $('#byTitle').on('click', function () {
    picturesArray.sort(titleComparison);
    $('section').remove();
    picturesArray.forEach( imgs => {
      imgs.renderWithMustache();
      console.log('ss00');
    });
  });
});


$(document).ready(function () {
  $('#byHorns').on('click', function () {
    picturesArray.sort(hornsComparison);
    $('section').remove();
    picturesArray.forEach(imgs => {
      imgs.renderWithMustache();
      console.log('qqq');
    });
  });
});



  
function titleComparison(a,b){
  let titleOne=a.title.toUpperCase();
  let titleTwo=b.title.toUpperCase();
  if(titleOne>titleTwo){
    return 1;
  }
  else if(titleTwo>titleOne){
    return -1;
  }
  return 0;
}

function hornsComparison(a,b){
  let hornOne=a.horns;
  let hornTwo=b.horns;

  if(hornOne>hornTwo){
    return 1;
  }
  else if(hornTwo>hornOne){
    return -1;
  }
  return 0;
}
