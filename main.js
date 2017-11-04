var express = require("express");
app = express();

var apiInfo = require("./apiInfo.json");
var user = require("./User.json");
var todo = require("./Todos.json");

app.get('/User',function(req,res){
	var userid=req.query.userid;
	if(typeof userid!=='undefined' || userid===''){
	var response={};
	var todos=[];
	var todoObj={};
		for(var i=0;i<user.length;i++){
			if(user[i].id===userid){
		    response.user=user[i];
			}
		}
		for(var i=0;i<todo.length;i++){
			if(todo[i].userid===userid){
				todoObj=todo[i];
				todos.push(todoObj);
				response.todos=todos;
			}
		}
		res.send(JSON.stringify(response));
	}
	res.end();
});

app.get('/Todos',function(req,res){
	var id=req.query.id;
	if(typeof id!=='undefined' || id===''){
	var response={};
		for(var i=0;i<todo.length;i++){
			if(todo[i].id===id){
		    response.todo=todo[i];
			}
		}
		res.send(JSON.stringify(response));
	}
	res.end();
});

app.get('/ActiveUsers',function(req,res){
	var response={};
	var users=[];
	var userObj={};
	var todos=[];
	var todoObj={};
		for(var i=0;i<user.length;i++){
			if(user[i].isActive==='true'){
				userObj=user[i];
				users.push(userObj);
				
				console.log('');
				for(var j=0;j<todo.length;j++){
			if(todo[j].userid==user[i].id){
				todoObj=todo[j];
				users.push(todoObj);
			}
			response.users=users;
		}
			}
		}
		res.send(JSON.stringify(response));
	res.end();
});

app.get('/Users/activeTodos',function(req,res){
	var userid=req.query.userid;
	if(typeof userid!=='undefined' || userid===''){
	var response={};
	var todos=[];
	var currentDate		 =new Date();
	var tomorrowdate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
	var current=""+currentDate.getDate()+"-"+(currentDate.getMonth() + 1)+"-"+currentDate.getFullYear();
	var tommorow=""+tomorrowdate.getDate()+"-"+(tomorrowdate.getMonth() + 1)+"-"+tomorrowdate.getFullYear();
	if(current.length<10){
		current='0'+current;
	}
	if(tommorow.length<10){
		tommorow='0'+tommorow;
	}
	var todoObj={};
		for(var i=0;i<user.length;i++){
			if(user[i].id===userid){
		    response.user=user[i];
			}
		}
		for(var i=0;i<todo.length;i++){
			if(todo[i].userid===userid && (todo[i].targetDate===current || todo[i].targetDate===tommorow)){
				todoObj=todo[i];
				todos.push(todoObj);
				response.todos=todos;
			}
		}
		res.send(JSON.stringify(response));
	}
	res.end();
});

app.get('/ApiInfo',function(req,res){
		res.send(JSON.stringify(apiInfo));
	res.end();
});

app.listen(3001,function(){
console.log('Welcome to intellect server');

});