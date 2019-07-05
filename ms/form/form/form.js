var http=require('http');
var fs= require('fs');
var url=require('url');
var query=require('querystring');
function process_request(req,resp){
 var p=url.parse(req.url);
 console.log(p);
 resp.writeHead(200,{'Content-Type':'text/html'});
 console.log(p.pathname);
 switch(p.pathname)
 {
 case '/':
     fs.readFile("form.html",function(err,data){
	 if(err)
	 {
		 resp.write("not loaded");
		  resp.end();
	 }
	 else{
		 
		 resp.write(data);
		 resp.end();
	 }
	 
	 });
	 break;
	 case '/calc':
	 
	 console.log("heloo");
	 var str="";
	 req.on('data',function(d)
	 {
		 console.log("in");
		 str+=d;
		 
	 });
	 req.on('end',function()
	 {
		 
		console.log(str);
	var ob=query.parse(str);
	if(ob.factorial=='fact')
	{
		var facto=1;
		var num=parseInt(ob.num1);
		console.log(num);
		for(var i=1;i<=num;i++)
		{
			
			facto=facto*i;
		}
		resp.end("<h2> factorial  ::</h1>"+facto);
		
	}
	else if(ob.prime=='prime')
	{
		var primeno=parseInt(ob.num1);
		if(primeno==1)
		{
			resp.end("not prime "+primeno);
		}
		else if(primeno==2)
		{
			resp.end("prine Number ::"+primeno);
		}
		else 
		{
			for(var i=2;i<primeno;i++)
			{
				if(primeno%i==0)
				{
					resp.end("prime not Num::"+primeno);
				}
			}
			resp.end("prime number"+primeno);
		}
		
	}
	else if(ob.add=='add')
	{
	var num=parseInt(ob.num1)+parseInt(ob.num2);
	resp.end("<h1>Addtion :   </h1>"+num);
	}
	else if(ob.sub=='sub')
	{
		var num3=parseInt(ob.num1)-parseInt(ob.num2);
		resp.end("<h2> Substraction ::</h2>"+num3);
	}
	 });
	 break;
 
 
 }


}
var server=http.createServer(process_request);
server.listen(1000);
console.log("server start");