var promise = require("bluebird");
var jsonBody=require ('body/json');

var options = {
  promiseLib:promise,
    error: function (error, e) {
        if (e.cn) {
            // A connection-related error;
            //
            // Connections are reported back with the password hashed,
            // for safe errors logging, without exposing passwords.
            console.log("CN:", e.cn);
            console.log("EVENT:", error.message || error);
        }
    }

  };

var pgp = require('pg-promise')(options)

var connectionString =process.env.DATABASE_URL || 'postgresql://webapp:password@192.168.99.100:5432/webapp'

var db = pgp(connectionString);

function getAllItemsByName(req,res,next){
  var name = req.params.name;
  db.any("select * from items Where name = $1",name)
    .then(function(data){
      res.status(200)
	.json({status:'success',
	       data:data,
	       message:'Retrieved all items'
	      });
    })
    .catch(function(err){
      return next(err)
    });
}


function getAllItems(req,res,next){
  db.any("select * from items")
    .then(function(data){
      res.status(200)
	.json({status:'success',
	       data:data,
	       message:'Retrieved all items'
	      });
    })
    .catch(function(err){
      return next(err)
    });
}

function toBool(str,def){
  if(str=='true')
    return true
  else if (str=='false')
    return false
  else
    return def  
}

function createItem(req,res,next){
  jsonBody(req, res,function(err,body){
    if(err){
      res.statusCode=500;
      return next(err);
    }
    body.complete = toBool(body.complete,false);
    db.none("insert into items(name, text, complete)"+
	    "values ($(name),$(text),$(complete))",
	    body)
      .then(function(){
	res.status(200)
	  .json({status:'success',
		 message:'Inserted items'
		});
      })
    .catch(function(err){
      return next(err)
    });
  })
}



module.exports ={
  getAllItems : getAllItems,
  getAllItemsByName : getAllItemsByName,
  //getSingleItem : getSignleItem,
  createItem: createItem
  //uppdateItem: updateItem,
  //removeItem: removeItem
};
