//引入Express模块
const express = require('express');
const fs=require('fs');
//引入MySQL模块
const cors = require('cors');
const mysql = require('mysql');
//引入bodyParser模块
const bodyParser = require('body-parser');
//创建MySQL连接池
const pool = mysql.createPool({
    //数据库服务器地址
    host:'127.0.0.1',
    //数据库用户名
    user:'root',
    //数据库用户密码
    password:'',
    //数据库服务器端口号
    port:3306,
    //数据库名称
    database:'szq',
    //编码方式
    charset:'utf8',
    //连接限制
    connectionLimit:20
});
// 创建Express实例
const server =express();
server.listen(8080,()=>{console.log('服务器启动成功')})
server.use(express.static('public'))
server.use(bodyParser.urlencoded({
    extended:false
}))
server.use(cors({
    origin:['http://127.0.0.1:8080','http://localhost:8080','http://172.20.10.3:8080/','http://127.0.0.1:8080']
}))

// 用户登录的接口
server.post('/login',(req,res)=>{
    let username=req.body.uname;
    let password=req.body.upwd;
    // 以用户名和密码作为条件查找
    let sql = 'SELECT COUNT(id) AS count FROM szq_person_vip WHERE uname=? AND upwd=?';
    // let sql = 'SELECT * FROM szq_person_vip ';
    pool.query(sql,[username,password],(err,results)=>{
        if(err) throw err;
        if(results[0].count){
            res.send({message:'登录成功',code:1,results});
        }else{
            res.send({message:'登录失败',code:0,results});
        }
    });
});
// 注册接口
server.post('/register',(req,res)=>{
    let uname=req.body.uname;
    let upwd=req.body.upwd;
    // res.send(uname+'----------'+upwd);
    let sql='SELECT COUNT(id) AS count FROM szq_person_vip WHERE uname=?';
    pool.query(sql,[uname],(err,result)=>{
      if(err) throw err;
      if(result[0].count){
        res.send({message:'注册失败',code:0});
      }else{
        let sql='INSERT INTO szq_person_vip(uname,upwd) VALUES (?,MD5(?))';
        pool.query(sql,[uname,upwd],(err,results)=>{
          if(err) throw err;
          res.send({message:'注册成功',code:1,results:results});
        });
      }
    });
  });


// 跳转登陆页面的接口
// server.get('/login',(req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/html'});
//     fs.readFile('/public/login.html','utf8',(err,data)=>{
//       if(err) throw err;
//       res.end(data);
//     });
//   });