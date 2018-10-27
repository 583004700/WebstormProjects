var http = require("http");

var server = http.createServer(function(request,response){
    response.writeHead(200,{
        'Content-Type':'text/html',
        'key1':'value1'
    });
    response.write('<h1>hahaha</h1>');
    response.end();
});

server.listen(8080,function(error){
    console.log('监听8080端口成功');
})