var dog,dogImg,happyDog,database,foodS,foodStock;

function preload()
{
	dogImg=loadImage("dogImg.png")
  happyDog=loadImage("dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  foodStock.set(20);

  dog=createSprite(250,350,10,60)
  dog.addImage(dogImg)
  dog.scale=0.2
}


function draw() {  
  background(46,139,87)
  if(foodS!==undefined){
    textSize(20)
    fill(255)
    text("Note:Press DOWN_ARROW Key To Feed Drago Milk!",15,50)
    text("Food Remaining : "+foodS,150,150)

    if(keyWentDown(DOWN_ARROW)){
      writeStock(foodS)
      dog.addImage(happyDog)
    }

    if(keyWentDown(UP_ARROW)){
      dog.addImage(dogImg)
    }

    if(foodS===0){
      foodS=20
    }
    drawSprites();
  } 
}

function writeStock(x){
  if(x<=0){
    x=0
  }else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}

function readStock(data){
  foodS=data.val();
}


