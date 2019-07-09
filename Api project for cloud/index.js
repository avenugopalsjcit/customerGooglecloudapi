var mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//while deploying points to remember admin username and other thing is whitelist of ip 0.0.0.0 and also 80 port which redirect to 8080
var url = "mongodb+srv://admin:appayanna@cluster0-p7m1w.mongodb.net/test?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.NODE_ENV === 'production' ? process.env.PORT :'80';
mongoose.connect(url,{ useNewUrlParser: true },(err,database) =>{
    if (err) return console.log(err)
    app.listen(process.env.port || port,() => {
        console.log("We are live on "+port); 
    });
    var collection = database.collection('customers');
    var docs = [{ name: "Udat", id: "21" },
                     { name: "Karthik", id: "24" },
                     { name: "Anil", id: "23" }];
                     collection.insertMany(docs, function(err, res) {
      if (err) throw err;
      console.log(res.insertedCount+" documents inserted");
      // close the connection to db when you are done with it
      database.close();
  });

});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/fetchcustomers', (req, res) => {
  mongoose.connect(url, function(err, db) {
    var collection = db.collection('customers');
    var cursor = collection.find({});
    str = "";
    cursor.forEach(function(item) {
        if (item != null) {
                str = str + "    Customer name  " + item.name + "</br>";
        }
    }, function(err) {
        res.send(str);
        db.close();
       }
    );
  });
});

  app.get('/fetchcustomersbyid/:id', (req, res) => {
    mongoose.connect(url, function(err, db) {
      var collection = db.collection('customers');
      var cursor = collection.find({});
      str = "";
      cursor.forEach(function(item) {
          if (item.id == req.params.id) {
                  str = str + "    Customer name  " + item.name + "</br>";
          }
      }, function(err) {
          res.send(str);
          db.close();
         }
      );
    });
  });