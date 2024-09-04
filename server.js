const express=require("express");
// const serverless=require('serverless-http');
const app=express();
const mysql2=require("mysql2");
const fileuploader=require("express-fileupload");


app.listen(1111,function(){
    console.log("hey client I can listen you");
});
const configObj={
    host:"127.0.0.1",
    user:"root",
    password:"T#9758@qlph",
    database:"project"
}
const mysql=mysql2.createConnection(configObj);

mysql.connect(function(err)
{
    if(err==null)
    console.log("connected to database");
    else
    console.log(err.message);
})

app.use(express.static("public"));
app.get("/",function(req,resp){
   let filePath=process.cwd()+"/public/index.html";
   resp.sendFile(filePath);
});
app.use(express.urlencoded({extended:true}));
app.get("/profile-save",function(req,resp)
{
    // create table users(emailid varchar(30) primary key, password varchar(20),utype varchar(20),dos date,status int);
    const email=req.query.kuchEmail;
    const pwd=req.query.kuchPass;
    const usty=req.query.kuchUser;
    
    mysql.query("insert into users values(?,?,?,current_date(),1)",[email,pwd,usty],function(err)
    {
        if(err==null)
        resp.send("Status: Signed Up Successfullyyy");
    else
        resp.send(err.message);
    })
});
app.get("/chkav",function(req,resp)
{
    mysql.query("select * from users where emailid=?",[req.query.kuchEmail],function(err,resultJsonAry)
        {
            if(resultJsonAry.length==1)
            {
                resp.send("Not available");
            }
            else
            {
                resp.send(" Yes!!! Available");
            }
        })
})

app.post("/check-login",function(req,resp)
{
    mysql.query("select * from users where emailid=? and password=?",[req.body.email,req.body.pass],function(err,resultJson)
    {
        if(err)
        {
            resp.send(err.message);
        }
        else if(resultJson.length==1)
        {
            if(resultJson[0].status==1)
            {
                const userType=resultJson[0].utype;
                resp.send(userType);
            }
            else
            {
                resp.send("your Account is blocked !! Contact Admin");
            }
        }
        else{
            resp.send("Invalid email or password");
        }
    })
})
app.get("/CustPro",function(req,resp){
    let filePath=process.cwd()+"/public/profile-customer.html";
    resp.sendFile(filePath);
})

app.use(fileuploader());

app.post("/save-customer-profile",function(req,resp)
{
    // create table custprofile(emailid varchar(30) primary key,name varchar(20),contact varchar(10),address varchar(40),city varchar(20),state varchar(30),ppic varchar(30));
    const email=req.body.txtEmail;
   const name=req.body.txtName;
   const mobile=req.body.txtContact;
   const add=req.body.txtAddress;
   const city=req.body.txtCity;
   const state=req.body.txtState;



   let filename;
   if(req.files==null)
   {
    filename="images.jpeg";      // no pic is selected
   }
   else// pic is selected by user
   {
         filename=req.files.ppic.name;
         let path=process.cwd()+"/public/pics/"+filename;
         req.files.ppic.mv(path);//to store pic in uploads folder
   }

   req.body.ppic=filename;

   mysql.query("insert into custprofile values(?,?,?,?,?,?,?)",[email,name,mobile,add,city,state,filename],function(err)
   {
    if(err==null)
        resp.send("Record Saved Successfullyyy");
    else
        resp.send(err.message);
   })


})
app.get("/check-email",function(req,resp)
{
    mysql.query("select * from custprofile where emailid=?",[req.query.kuchEmail],function(err,resultJsonAry)
    {
        if(resultJsonAry.length==1)
        {
            resp.send(resultJsonAry);
        }
        else
        {
            resp.send("Not Present");
        }

    })
});
app.post("/modify-customer-profile",function(req,resp)
{
    // create table custprofile(emailid varchar(30) primary key,name varchar(20),contact varchar(10),address varchar(40),city varchar(20),state varchar(30),ppic varchar(30));
    const email=req.body.txtEmail;
   const name=req.body.txtName;
   const mobile=req.body.txtContact;
   const add=req.body.txtAddress;
   const city=req.body.txtCity;
   const state=req.body.txtState;

   let filename;
    if(req.files==null)
        filename=req.body.hdn;
    else
       {
        filename=req.files.ppic.name;
        let path=process.cwd()+"/public/pics/"+filename;
        req.files.ppic.mv(path);
       }
    
    mysql.query("update custprofile set name=?,contact=?,address=?,city=?,state=?,ppic=? where emailid=?",[name,mobile,add,city,state,filename,email],function(err,resJsonAry)
    {
        if(err==null)
        resp.send("Record update Successfullyyy");
        else
        resp.send(err.message);
    })
})
app.get("/customer-dashb",function(req,resp)
{
    let filePath=process.cwd()+"/public/Customer-Dash.html";
    resp.sendFile(filePath);
})

app.get("/task-save",function(req,resp)
{
    //create table tasks(rid int primary key auto_increment,emailid varchar(30),category varchar(20),address varchar(40),city varchar(20),upto date,task varchar(50));
    const email=req.query.kuchEmail;
    const catgy=req.query.kuchCategory;
    const add=req.query.kuchAddress;
    const City=req.query.kuchCity;
    const date=req.query.kuchDate;
    const task=req.query.kuchTask;
    
    mysql.query("insert into tasks values(0,?,?,?,?,?,?)",[email,catgy,add,City,date,task],function(err)
    {
        if(err==null)
        resp.send("Task Saved Successfullyyy");
    else
        resp.send(err.message);
    })
});
app.get("/fetchadd",function(req,resp)
{
    mysql.query("select * from custprofile where emailid=?",[req.query.kuchEmail],function(err,respJsonArray)
    {
        if(err==null)
        {
            if(respJsonArray.length==1)
            {
                resp.send(respJsonArray);
            }
        }
        else{
            resp.send(err.message);
        }
    })
})
app.get("/passwordchange",function(req,resp)
{
    mysql.query("update users set password=? where emailid=?",[req.query.kuchpwd,req.query.kucheml],function(err)
    {
        if(err==null)
        {
            resp.send("password change");
        }
        else{
            resp.send(err.message);
        }
    })

})
app.get("/service-dashb",function(req,resp)
{
    let filePath=process.cwd()+"/public/Service-Provider_Dash.html";
    resp.sendFile(filePath);
})
app.get("/SerPro",function(req,resp){
    let filePath=process.cwd()+"/public/profile-service.html";
    resp.sendFile(filePath);
})

app.post("/save-service-profile",function(req,resp)
{
    // create table providers(email varchar(30) primary key,name varchar(20),contact varchar(10),gender varchar(6),category varchar(30),firm varchar(30),website varchar(50),location varchar(50),since int,proofpic varchar(40),otherinfo varchar(50));
    const email=req.body.ntxtEmail;
   const name=req.body.ntxtName;
   const mobile=req.body.ntxtContact;
   const gen=req.body.ntxtGender;
   const cate=req.body.ntxtCategory;
   const firm=req.body.ntxtFirm;
   const web=req.body.ntxtWebsite;
   const add=req.body.ntxtAdd;
   const sin=req.body.ntxtSince;
   const text=req.body.ntxtText;

   let filename;
   if(req.files==null)
   {
    filename="images.jpeg";// no pic is selected
   }
   else// pic is selected by user
   {
         filename=req.files.txtId.name;
         let path=process.cwd()+"/public/pics/"+filename;
         req.files.txtId.mv(path);//to store pic in uploads folder
   }

   req.body.txtId=filename;

   mysql.query("insert into providers values(?,?,?,?,?,?,?,?,?,?,?)",[email,name,mobile,gen,cate,firm,web,add,sin,filename,text],function(err)
   {
    if(err==null)
        resp.send("Record Saved Successfullyyy");
    else
        resp.send(err.message);
   })


})
app.get("/search-email",function(req,resp)
{
    mysql.query("select * from providers where email=?",[req.query.kuchEmail],function(err,resultJsonAry)
    {
        if(resultJsonAry.length==1)
        {
            resp.send(resultJsonAry);
        }
        else
        {
            resp.send("Not Present");
        }

    })
});
app.post("/modify-service-profile",function(req,resp)
{
    // create table providers(email varchar(30) primary key,name varchar(20),contact varchar(10),gender varchar(6),category varchar(30),firm varchar(30),website varchar(50),location varchar(50),since int,proofpic varchar(40),otherinfo varchar(50));

    const email=req.body.ntxtEmail;
    const name=req.body.ntxtName;
    const mobile=req.body.ntxtContact;
    const gen=req.body.ntxtGender;
    const cate=req.body.ntxtCategory;
    const firm=req.body.ntxtFirm;
    const web=req.body.ntxtWebsite;
    const add=req.body.ntxtAdd;
    const sin=req.body.ntxtSince;
    const text=req.body.ntxtText;
 

   let filename;
    if(req.files==null)
        filename=req.body.hdn;
    else
       {
        filename=req.files.txtId.name;
        let path=process.cwd()+"/public/pics/"+filename;
        req.files.txtId.mv(path);
       }
    
    mysql.query("update providers set name=?,contact=?,gender=?,category=?,firm=?,website=?,location=?,since=?,proofpic=?,otherinfo=? where email=?",[name,mobile,gen,cate,firm,web,add,sin,filename,text,email],function(err,resJsonAry)
    {
        if(err==null)
        resp.send("Record update Successfullyyy");
        else
        resp.send(err.message);
    })
})

app.get("/Users-manager",function(req,resp){
    let filePath=process.cwd()+"/public/Users-manager.html";
    resp.sendFile(filePath);
})

app.get("/fetch-user",function(req,resp)
{
    mysql.query("select * from users",function(err,resultJsonAry)
    {const resultJsonAry1=resultJsonAry.map(users => {
        if (users.dos) {
            users.dos = new Date(users.dos).toISOString().split('T')[0];
        }
        return users;});
        resp.send(resultJsonAry1);
    })

})
app.get("/user-delete",function(req,resp)
{
    const email=req.query.emailkuch;
    mysql.query("delete from users where emailid=?",[email],function(err,result)
    {
         if(err==null)
         {
            if(result.affectedRows==1)
                      resp.send("Record Deleted Successfullyyy");
                    else
                    resp.send("Inavlid ID");
         }
         else
             resp.send(err.message);
    })

})
app.get("/user-block",function(req,resp)
{
    const email=req.query.emailkuch;
    mysql.query("update users set status=0 where emailid=?",[email],function(err,result)
    {
         if(err==null)
         {
             resp.send("Block user successfully");
         }
         else
             resp.send(err.message);
    })

})

app.get("/user-unblock",function(req,resp)
{
    const email=req.query.emailkuch;
    mysql.query("update users set status=1 where emailid=?",[email],function(err,result)
    {
         if(err==null)
         {
             resp.send("Unblock user successfully");
         }
         else
             resp.send(err.message);
    })
})
app.get("/Providers-manager",function(req,resp){
    let filePath=process.cwd()+"/public/all-providers.html";
    resp.sendFile(filePath);
})
app.get("/fetch-Providers",function(req,resp)
{
    mysql.query("select * from providers",function(err,resultJsonAry)
    {
        resp.send(resultJsonAry);
    })

})
app.get("/Customers-manager",function(req,resp){
    let filePath=process.cwd()+"/public/all-customers.html";
    resp.sendFile(filePath);
})
app.get("/fetch-Customers",function(req,resp)
{
    mysql.query("select * from custprofile",function(err,resultJsonAry)
    {
        resp.send(resultJsonAry);
    })

})
app.get("/admin",function(req,resp){
    let filePath=process.cwd()+"/public/Admin.html";
    resp.sendFile(filePath);
})
app.get("/fetch-Passwords",function(req,resp)
{
    mysql.query("select distinct password from users",function(err,resultJsonAry)
    {
        resp.send(resultJsonAry);
    })

})
app.get("/fetch-one-record",function(req,resp){
    mysql.query("select * from users where password=?",[req.query.pwd],function(err,resultJsonAry){
        const resultJsonAry1=resultJsonAry.map(users => {
            if (users.dos) {
                users.dos = new Date(users.dos).toISOString().split('T')[0];
            }
            return users;});
            resp.send(resultJsonAry1);
    })
})
app.get("/providers-finder",function(req,resp){
    let filePath=process.cwd()+"/public/Service-Providers-Finder.html";
    resp.sendFile(filePath);
});
app.get("/fetch-Ct",function(req,resp)
{
    mysql.query("select distinct location from providers",function(err,resultJsonAry)
    {
        resp.send(resultJsonAry);
    })

})
app.get("/fetch-Ctg",function(req,resp)
{
    mysql.query("select distinct category from providers where location=?",[req.query.loc],function(err,resultJsonAry)
    {
        resp.send(resultJsonAry);
    })

})
app.get("/JobManager",function(req,resp){
    let filePath=process.cwd()+"/public/Job_Manager.html";
    resp.sendFile(filePath);
})
app.get("/fetch-previous",function(req,resp)
{
    mysql.query("select * from tasks where emailid=?",[req.query.eml],function(err,resultJsonAry)
    {
        const resultJsonAry1=resultJsonAry.map(tasks => {
            if (tasks.upto) {
                tasks.upto = new Date(tasks.upto).toISOString().split('T')[0];
            }
            return tasks;});
        resp.send(resultJsonAry1);
    })

})
app.get("/Jobfind",function(req,resp){
    let filePath=process.cwd()+"/public/Job_find.html";
    resp.sendFile(filePath);
})
app.get("/fetch-jobs",function(req,resp)
{
    mysql.query("select * from tasks ",function(err,resultJsonAry)
    {
        const resultJsonAry1=resultJsonAry.map(tasks => {
            if (tasks.upto) {
                tasks.upto = new Date(tasks.upto).toISOString().split('T')[0];
            }
            return tasks;});
        resp.send(resultJsonAry1);
    })

})
app.get("/fetch-cards",function(req,resp)
{
    mysql.query("select * from providers where location=? and category=?",[req.query.loc,req.query.cgy],function(err,resultJsonAry)
    {

        resp.send(resultJsonAry);
    })

})
app.get("/delete-work",function(req,resp)
{
    
    mysql.query("delete from tasks where rid=?",[req.query.rid],function(err,result)
    {
         if(err==null)
         {
            if(result.affectedRows==1)
                      resp.send("Record Deleted Successfullyyy");
                    else
                    resp.send("Inavlid ID");
         }
         else
             resp.send(err.message);
    })

})
// app.use('/.netlify/server.js');
// module.exports.handler=serverless(app);