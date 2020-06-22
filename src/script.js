var image=null;
var im=null;//output
var inpcanvas;
var outcanvas;
function upload(){
  inpcanvas=document.getElementById("can");
  var fileinput=document.getElementById("finput");
  image=new SimpleImage(fileinput);
  image.drawTo(inpcanvas);
}

function loaded(img){
  if(img==null || !img.complete()){
    return(false);
  }
  else{
    return(true);
  }
}

function makegray(){
    if(!loaded(image)){
    alert('Image is not loaded!!!');
    return;
  }
   else{
  outcanvas=document.getElementById("output");
im=new SimpleImage(image);
  for(var pixel of im.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  im.drawTo(outcanvas);}
}

function clearCanvas(){
  doClear(inpcanvas);
  doClear(outcanvas);
}

function doClear(canvas){
  var context=canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height); 
}

function makeredroom(){
      if(!loaded(image)){
    alert('Image is not loaded!!!');
    return;
  }
   else{
     outcanvas=document.getElementById("output");
     im=new SimpleImage(image);
     for(var pixel of im.values()){
       
    var avg = (pixel.getRed()+ pixel.getGreen() + pixel.getBlue())/3;
     if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
     }
     im.drawTo(outcanvas);}
}

function makeblur(){
    if(!loaded(image)){
    alert('Image is not loaded!!!');
    return;
  }
   else{
  outcanvas=document.getElementById("output");
im=new SimpleImage(image);
  for(var pixel of im.values()){
    var x=pixel.getX();
    var y=pixel.getY();
    var rand=Math.random();
    if(rand<0.7){
      im.setPixel(x,y,pixel);
    }
    else{//set nearby pixel
      var w=im.getWidth();
      var h=im.getHeight();
      var tempx=x+Math.floor(2*rand);
      var tempy=y+Math.floor(2*rand);
      if(tempx>=w){
        tempx = w - Math.floor(2*rand) - 1;
      }
      if(tempy>=h){
        tempy = h- Math.floor(2*rand) - 1;
      }
      var newpix=im.getPixel(tempx,tempy);
      im.setPixel(x,y,newpix);
      
      
    }//set nearby ends
       
  }//for loop end
  im.drawTo(outcanvas);}//else end
  
}

function makedark(){
  
      if(!loaded(image)){
    alert('Image is not loaded!!!');
    return;
  }
   else{
  outcanvas=document.getElementById("output");
im=new SimpleImage(image);
  for(var pixel of im.values()){
    var R=pixel.getRed();
    var G=pixel.getGreen();
    var B=pixel.getBlue();
    var newR=R-40;
    var newG=G-40;
    var newB=B-40;
    if(newR<0){
      newR=0;
    }
    if(newG<0){
      newG=0;
    }
    if(newB<0){
      newB=0;
    }
    pixel.setRed(newR);
    pixel.setGreen(newG);
    pixel.setBlue(newB);
  }
  im.drawTo(outcanvas);}
}

function makesunlight(){
      if(!loaded(image)){
    alert('Image is not loaded!!!');
    return;
  }
   else{
  outcanvas=document.getElementById("output");
im=new SimpleImage(image);
  for(var pixel of im.values()){
    var R=pixel.getRed();
    var G=pixel.getGreen();
    var B=pixel.getBlue();
    var newR=R+60;
    var newG=G+60;
    var newB=B+60;
    if(newR>255){
      newR=255;
    }
    if(newG>255){
      newG=255;
    }
    if(newB>255){
      newB=255;
    }
    pixel.setRed(newR);
    pixel.setGreen(newG);
    pixel.setBlue(newB);
  }
  im.drawTo(outcanvas);}
}

function makewarmamber(){
  
  
        if(!loaded(image)){
    alert('Image is not loaded!!!');
    return;
  }
   else{
     outcanvas=document.getElementById("output");
     im=new SimpleImage(image);
     for(var pixel of im.values()){
       
    var avg = (pixel.getRed()+ pixel.getGreen() + pixel.getBlue())/3;
     if (avg < 170) {
      pixel.setRed(2 * avg);
      pixel.setGreen(2 * avg);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(255);
      pixel.setBlue(2 * avg - 255);
    }
     }
     im.drawTo(outcanvas);}
  
}

function makeNoise(){
  
      if(!loaded(image)){
    alert('Image is not loaded!!!');
    return;
  }
   else{
  outcanvas=document.getElementById("output");
im=new SimpleImage(image);
  for(var pixel of im.values()){
    var x=pixel.getX();
    var y=pixel.getY();
    var rand=Math.random();
    if(rand>0.01){
      im.setPixel(x,y,pixel);
    }
    else{
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(0);

      
      
    }//set nearby ends
       
  }//for loop end
  im.drawTo(outcanvas);
   }
}

function myFunction(){
  var e = document.getElementById("ddlViewBy");
  var strUser = e.options[e.selectedIndex].text;
  if(strUser=="Select a filter"){
    alert('Filter has not been selected!!!');
  }
  if(strUser=="Grayscale"){
    makegray();
  }
  else
    if(strUser=="Red Room"){
      makeredroom();
    }
  else
    if(strUser=="Blur"){
      makeblur();
    }
  else
    if(strUser=="Darken"){
      makedark();
    }
  else
    if(strUser=="Light Cross"){
      makesunlight();
    }
  else
    if(strUser=="Warm Amber"){
      makewarmamber();
    }
  else
    if(strUser=="Noise"){
      makeNoise();
    }
}

window.onload = function(){
  var dwn = document.getElementById('btndownload'),
      canvas = document.getElementById('output'),
      context = canvas.getContext('2d');
    dwn.onclick = function(){
    download(canvas, 'myimage.png');
  }

}

function download(canvas, filename) {
  var lnk = document.createElement('a'), e;
  lnk.download = filename;
  lnk.href = canvas.toDataURL("image/png;base64");
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}