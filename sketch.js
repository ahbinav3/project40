var dog,database,position,food;
var foodS,foodstock;
var fedTime,lastFed;
var dogImg,dogImg1;
var foodObj
function preload()
{
  dogImg=loadImage("images/dogimg.png");
  dogImg1=loadImage("images/dogimg1.png");

}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  foodObj=new Food();

  dog=createSprite(250,300,150,150)
dog.addImage(dogImg);
dog.scale=0.2;
foodstock=database.ref('Food');
foodstock.on("value",readStock);
feed=createButton("Feed the dog");
 feed.position(700,95);
  feed.mousePressed(feedDog);
   addFood=createButton("Add Food");
    addFood.position(800,95);
     addFood.mousePressed(addFoods);

}


function draw() {  
  background(46,139,87);
   foodObj.display();
    fedTime=database.ref('FeedTime'); 
    fedTime.on("value",function(data){ 
      lastFed=data.val();
     });
      fill(255,255,254); 
      textSize(15);
       if(lastFed>=12){ 
         text("Last Feed : "+ lastFed%12 + " PM", 350,30); }
         else if(lastFed==0){ text("Last Feed : 12 AM",350,30); }
         else{ text("Last Feed : "+ lastFed + " AM", 350,30);
         }
         drawSprites();
}
function readStock(data){
   foodS=data.val(); 
   foodObj.updateFoodStock(foodS); 
  } 
  //function to update food stock and last fed time 
  function feedDog(){ 
    dog.addImage(dogImg1);
     foodObj.updateFoodStock(foodObj.getFoodStock()-1);
      database.ref('/').update({ Food:foodObj.getFoodStock(), FeedTime:hour() })
     }

     function addFoods(){ foodS++;
       database.ref('/').update({ Food:foodS })
       }


