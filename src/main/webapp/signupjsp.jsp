<%@ taglib prefix="ct" uri="/WEB-INF/custom.tld" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta charset="utf-8">
	<title>CarPooling</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="style.css">
  <script type="text/javascript">
   
  </script>
</head>
<body>
<header>
  <nav id="header-nav" class="navbar navbar-default">
    <div class="container"></div>
    <div class="navbar-header">
      <a href="index.jsp" class="pull-left visible-md visible-lg">
        <div id="logo-img" alt="Logo image"></div>
      </a>
      <div class="navbar-brand">
        <a href="index.jsp"><h1>MUM CarPooling</h1></a>
      </div>
    </div>
  </nav>
</header>

<div class="container">
<div class="row">
  <h2>Creat Account</h2>
  <hr>
    <p>Already a member?
    <input type="submit"class="btn btn-info"  name="submit" value="Sign-in"></p>
  <hr>
  <div class="col-lg-3">
  <form class="form-horizontal"action="ProfileController.do?action=create" method="post">
  
  <ct:input label="Full Name: " value="" required='true' id="fullname" type="text" name="fullname" pattern="^[a-zA-Z]+\s[a-zA-Z]+$" />
  
  <div class="form-group ">
    <label>Female <input required type="radio" name="gender" value="F" <c:if test="${LoginUser.gender == false}">checked</c:if> ></label>
  	<label>Male <input required type="radio" name="gender" value="M" <c:if test="${LoginUser.gender == true}">checked</c:if>></label>
  </div>
  
  <ct:input required='true' value="" label="State: " id="state" type="text" name="state"  pattern="^[a-zA-Z]+\s*[a-zA-Z]*$" />
  
  <ct:input required='true' value="" label="City: " id="city" type="text" name="city" pattern="^[a-zA-Z]+\s*[a-zA-Z]*$" />
  
  <ct:input required='true' label="Street: " id="street" type="text" name="street" value="" pattern="^[a-zA-Z0-9]+\s+[a-zA-Z0-9]+\s++[a-zA-Z0-9]+\s+[a-zA-Z]+$" />
   
   <div id="left">
   
   <ct:input required='true' label="Zip code: " id="zipcode" type="number" name="zipcode" value="" pattern="^[0-9]{5}$" />
   
   <ct:input required='true' label="Birth Year: " id="birthyear" type="number" name="birthyear" value="" min="1999" />
   
   <ct:input required='true' label="Email: " id="email" type="email" name="email" value="" pattern="^[a-zA-Z_\-][a-zA-Z_\-0-9]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$" />
    
   <div class="form-group ">
   <label for="password">Password: </label>
   <input class="form-control" id="password" type="password" name="password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" title="Must contain at east one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
   </div>
   <input type="hidden" name="hidden" value="signupjsp"/>
   <div class="form-group" class="btn btn-default">
   </div>
   <input class="btn btn-info" type="submit" name="submit" value="Sign-up">

   </div>
</form>
</div>
</div>
</div>

<br/><br/><br/><br/><br/><br/><br/>
<footer class="panel-footer">
  <div class="container">
    <div class="row">
      <section id="members" class="col-sm-4">
        
        Xianfeng Cai: samuel.caiceo@gmail.com<br>
        Diana  Yamaletdinova:  d.yamaletdinova@gmail.com<br>
        Bizen Okbaldet: Bizentse@gmail.com
        <hr class="visible-xs">
      </section>
      <section id="copyright" class="col-sm-3">
     
      </section>
      <section id="sayings" class="col-sm-2">
        <em>"It's a Mark of an educated mind, to entertain a thought without accepting it" --Aristotle </em>
      </section>
    </div>
    <div class="text-center">&copy; Copyright Amazing3 2017</div>
  </div>
</footer> 
</body>
</html>
