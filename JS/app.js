  
'use strict';

let picArray=[];
let keysArray=[]; 
let htmlTemplate=$('#photo-template').html();

function Pictures(horns) {
  for (const key in horns) {
    this[key] = horns[key];
  }
  picArray.push(this);
}

Pictures.prototype.renderKeywords=function(){
if (!(keysArray.includes(this.keyword))){
  let newOption=$('<Option></Option>').text(this.keyword);
  newOption.attr('class','newOptions');
  $('select').append(newOption);
  keysArray.push(this.keyword);
  console.log(keysArray);
}
}

Pictures.prototype.renderingImages=function(){
  this.renderKeywords();
  let container=$('<section></section>');
  container.html(htmlTemplate);
  let template=$(container).html(); 
  container.attr('class',this.keyword);
   let mustacheRender=Mustache.render(template,this);
   container.html(mustacheRender); 
   $('main').append(container);
}

const ajaxSetting={
  method:'get',
  dataType:'json'
}
let jsonfile='data/page-1.json';

$.ajax(jsonfile,ajaxSetting).then(data=>{
  data.forEach(element => {
    let imgs= new Pictures(element);
    imgs.renderingImages();
    
  });
})

$(document).ready(function () {
  $('select').on('change', function () {
    let selected = this.value;
    $('section').hide();
    $(`.${selected}`).show();
  });
});

$(document).ready(function(){
  $('#page1').on('click',function(){
    jsonfile='data/page-1.json';
    picArray=[];
    $('section').remove();
    $('.newOptions').remove();
    gettingDataByAjax(jsonfile);
    renderKeywords();
  })
})
$(document).ready(function(){
  $('#page2').on('click',function(){
    jsonfile='data/page-2.json';
    picArray=[];
    $('section').remove();
    $('.newOptions').remove();
    gettingDataByAjax(jsonfile);
    renderKeywords();
  })

})

function gettingDataByAjax(jsonFile){
  $.ajax(jsonFile,ajaxSetting).then(data=>{
    data.forEach(element=>{
      let newInstance=new Pictures(element);
      newInstance.renderingImages()
    })
  })
}

$(document).ready(function () {
  $('#byTitle').on('click', function () {
    picArray.sort(titleComparison);
    $('section').remove();
    picArray.forEach( newInstance => {
      newInstance.renderingImages();
      console.log('ss00');
    });
  });
});


$(document).ready(function () {
  $('#byHorns').on('click', function () {
    picArray.sort(hornsComparison);
    $('section').remove();
    picArray.forEach(newInstance => {
      newInstance.renderingImages();
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



console.log($('#sortDiv'))

