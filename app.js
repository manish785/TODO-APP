var express = require('express');
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
const port=8000;
var app=express();



app.set('view engine', 'ejs');
app.use(express.static('cssstyle'));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{
    useNewUrlParser:true,useUnifiedTopology:true
});
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"Welcome to Coding",
});

const item2=new Item({
    name:"Welcome to Coding",
});


const item3=new Item({
    name:"Welcome to Coding",
});

const d=[item1,item2,item3];
/*
Item.insertMany(d,function(err){
    if(err){
        console.log(err);
    }
    console.log("Suceesfully item saved in Database");
});
*/


app.get('/', function(req,res){
    Item.find({},function(err,f){

       if(f.length===0){

        Item.insertMany(d,function(err){
            if(err){
                console.log(err);
            }
            console.log("Suceesfully item saved in Database");
        });
        res.redirect("/");
       }
        res.render("list",{newListItems:f});
    });
       /*if(f.length()===0){
        Item.insertMany(d,function(err){
            if(err){
                console.log(err);
            }
            console.log("Suceesfully item saved in Database");
        });
        res.redirect("/");
    }else{
        res.render("list",{newListItems:f});
    }
    })*/

   //res.render("list",{newListItems:i1});
})

app.post("/",function(req,res){
     const itemName=req.body.n;
      //console.log(i);
     // res.render("list",{newListItem:i});
     //i1.push(i);
     //res.redirect("/");
     const item=new Item({
           name:itemName
     });
     item.save();
});

app.post("/delete",function(req,res){
    const check=req.body.checkbox;
    Item.findByIdAndDelete(check,function(err){
        if(!err){
            console.log("Successfully deleted");
            res.redirect("/");
        }
    });
});



app.listen(port,function(err){
    if(err){
        console.log('Eroor in running the server',err);
        return;
    }
    console.log('server is up and running on port',port);
})

