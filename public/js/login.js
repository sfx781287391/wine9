// let login_button=document.getElementById('login_button')
login_button.onclick=function (){
  var uname=user_name.value;
  var upwd=user_password.value;
  //非空验证
  if(!uname){alert('用户名不能为空');return}
  if(!upwd){alert('密码不能为空');return}
  //小黄人四部曲
  //1.创建异步对象
  let xhr=new XMLHttpRequest();
        xhr.onreadystatechange=()=>{
            if(xhr.readyState==4&&xhr.status==200){
                let data=xhr.responseText;
                let code=JSON.parse(data).code;
                if(code==1){
                    window.alert('登陆成功');
                }else{
                    window.alert('登陆失败');
                }
            }
        }
        xhr.open('post','/loginu',true);
        let formData=`uname=${uname}&&upwd=${upwd}`;
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(formData);
}