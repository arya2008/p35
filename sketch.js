var dog,happyDog,milk;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var Obj;
function preload()
{
	//load images here
  dog.loadImage("dogImg");
  happyDog.loadImage("dogImg1");
  milk.loadImage("Milk(1).png")
}

function setup() {
	createCanvas(900, 900);
  dog=createSprite(200,200,50,50);
  dog.addImage("dogImg");

  database=firebase.console;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  FileList(255,255,254);
  textSize(15);
  if(lastFed>=12){
    Text("Last Feed: "+lastFed%12+"PM",350,30);

  }else if(lastFed==0){
    Text("Last Feed: 12 AM",350,30);

  }
  else{
    Text("Last Feed:"+lastFed+"AM",350,30);

  }

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
    function addFoods(){
      foodS++;
      database.ref('/').update({
        Food:foodS
      })
    }
  }
}


function draw() {  
background(46,139,87);


  drawSprites();
  //add styles here

}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}


