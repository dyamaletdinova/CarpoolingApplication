<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<title>geolocation</title>
	<meta charset="utf-8"/>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta charset="utf-8">
	<title>CarPooling</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="style.css">
  <script type="text/javascript">
   
  </script>
  
<script type="text/javascript">
	
	x=navigator.geolocation;
	x.getCurrentPosition(success,failure);

	function success(position){

		var mylat=position.coords.latitude;
		var mylong=position.coords.longitude;

		var coords=new google.maps.LatLng(mylat,mylong);

		var mapOptions={
			zoom:16,
			center:coords,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		}

		var map=new google.maps.Map(document.getElementById('map'),mapOptions);

		var marker= new google.maps.Marker({map: map, position: coords});
		}

		function failure(){
			$('body').append("<p>It didn't work, co-ordinates not available!</p>")
		}

</script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbpL4gJwkFtm8WJNhvYF92cQyI-LZPIHk">
    </script>
<style type="text/css">
#map{
	width:100%;
	height: 400px;
}
</style>
</head>

<body>
<header>
  <nav id="header-nav" class="navbar navbar-default">
    <div class="container"></div>
    <div class="navbar-header">
      <a href="mainpagenew.jsp" class="pull-left visible-md visible-lg">
        <div id="logo-img" alt="Logo image"></div>
      </a>
      <div class="navbar-brand">
        <a href="mainpagenew.jsp"><h1>MUM CarPooling</h1></a>
      </div>
    </div>
  </nav>
</header>

<div id="map">
	
</div>
<br/><br/><br/><br/>
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
</div>
</body>
</html>    