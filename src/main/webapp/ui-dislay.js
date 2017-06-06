	var postsList;
	var currPostPosition;
	var currentCommentId;
	var numOfLikes;


    
	$(function() {
		jQuery("#dialog").hide();
		jQuery("#dialogRide").hide();

		let url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?query=";
	    $("#check_weather").click(function(){
	    	//window.location=url + $("#destination").val();
	    	$(location).attr("href", url + $("#destination").val());
	    });
        
	    /*
	    * function to display the pop up dialog for offer/ask for a ride
	    */
		$("a#To")
				.click(
						function(e) {
							//e.preventDefault();
							$("#dialogRide")
									.dialog(
											{
												height : 380,
												width : 450,
												modal : true,
												position : {
													my : 'top',
													at : 'top+290'
												},
												buttons : {
													"Cancel" : function() {
														$(this).dialog("close");
													},
													"Submit" : function() {
														var destinatLocat = $(
																'#sel3').val();
														var pickUpLocat = $(
																'#sel2').val();
														var rideTypeSel = $(
																'#sel1').val();
														//console.log(destinatLocat);
														//console.log(pickUpLocat);
														//console.log(rideTypeSel);
														addNewPostAjaxCall(
																rideTypeSel,
																pickUpLocat,
																destinatLocat);

														let postBody = "";
														if ($("#sel1").val() == "2") {
															postBody = "I am offering a ride from "
																	+ pickUpLocat
																	+ " to "
																	+ destinatLocat;
														} else {
															postBody = "I need a ride from "
																	+ pickUpLocat
																	+ " to "
																	+ destinatLocat;
														}

														var post = {
															"userid" : parseInt($(
																	"#myLink")
																	.attr(
																			"myAttr")),
															"post" : postBody,
															"posttype" : rideTypeSel
														};
														let jsonStr = JSON
																.stringify(post);
														// send this new Post to other clients
														sendPostToServer(jsonStr);
														$(this).dialog('close');
													},
												}
											});
						});
	    
	    /*
	    * endless scroll function for two tabs
	    */
		$('#offeride').endlessScroll({
			inflowPixels : 300,
			callback : function() {
				addOffers();
			}
		});

		$('#getride').endlessScroll({
			inflowPixels : 300,
			callback : function() {
				addRides();
			}
		});

		/*
		*AJAX call to retreive the data for the posts tabs
		*/
		$('#posts').html('');

	});
	
	/*
	* Failure method
	*/
	function ajaxFailure(xhr, status, exception) {
		console.log(xhr, status, exception);
	}

	/*
	* method to add posts to span offer
	*/
	function addOffers() {
		displayPostsInfo(postsList, '#offer', 2, currPostPosition);
	}

	/*
	* method to add posts to span request
	*/
	function addRides() {
		displayPostsInfo(postsList, '#request', 1, currPostPosition);
	}

	/*
	* generic method to add posts to spans
	*/
	function displayPostsInfo(posts, elementId, carpoolType, index) {
		console.log(posts);
		var postTypeCounter = 0;
		var i = index;
		console.log("Initial post position " + index  + "  type  " + carpoolType);
		var curPostId = 0;
		for (; i < posts.length; i++) {

			if (postTypeCounter >= 3) {
				currPostPosition = i;
				console.log("Current post position " + currPostPosition  + "  type  " + carpoolType);
				break;
			}
			
			if ( posts[i].postType != carpoolType) {
				continue;
			}

			//current body
			var curBody = posts[i];
			//current post id that accosiated with that body
			curPostId = posts[i].postId;
			//current post Type that accosiated with that body
			var curPostType = posts[i].postType;
			
			//current user id that accosiated with that body
			var userId = posts[i].userId;
			var fName = posts[i].fullname;
			
			//DELETE POST BTN
			var delPostBtnId = curPostId + "del";
			var deletePostBtn = document.createElement("input");
			deletePostBtn.className = 'btn btn-info btn-xs';
			deletePostBtn.setAttribute("id", delPostBtnId);
			deletePostBtn.setAttribute('type', 'button');
			deletePostBtn.setAttribute("data-del", curPostId);
			deletePostBtn.setAttribute('value', 'Delete');
			//$(btn).css('height','15px').css('width',' 70px');
			$(deletePostBtn).css('font-size', '12px');
			
			//SHOW COMMENT BTN
			var showCommBtn = document.createElement("input");
			showCommBtn.className = 'btn btn-primary btn-xs';
			showCommBtn.setAttribute("id", curPostId);
			showCommBtn.setAttribute('type', 'button');
			showCommBtn.setAttribute('value', 'Show Comments');
			//$(btn).css('height','15px').css('width',' 70px');
			$(showCommBtn).css('font-size', '12px');

			//ADD COMMENT BTN
			var addComBtnId = 'addC' + curPostId;
			var addCommBtn = document.createElement("input");
			addCommBtn.className = 'btn btn-primary btn-xs';
			addCommBtn.setAttribute('data-toggle', 'modal');
			addCommBtn.setAttribute('data-target', 'myModal');
			addCommBtn.setAttribute("id", addComBtnId);
			addCommBtn.setAttribute("data-val", curPostId);
			addCommBtn.setAttribute('type', 'button');
			addCommBtn.setAttribute('value', 'Add Comments');
			//$(btn).css('height','15px').css('width',' 70px');
			$(addCommBtn).css('font-size', '12px');

			//LIKE BTN
			var likeBtnId = 'l' + curPostId;
			var btnLike = document.createElement("input");
			btnLike.className = 'btn btn-primary btn-xs';
			btnLike.setAttribute("id", likeBtnId);
			btnLike.setAttribute("data-i", curPostId);
			btnLike.setAttribute('type', 'button');
			btnLike.setAttribute('value', 'Like');
			//$(btnLike).css('height','15px').css('width',' 70px');
			$(btnLike).css('font-size', '11px');
				
			
			var curPostType = posts[i].postType;

				$(elementId)
				.append('</br>')
				.append('<span id = "p'+curPostId+'" style="color:navy;"></span>');
				$('#p'+curPostId).append('<span style="color:green;" > By: ').append('<span style="color:green;" >' +posts[i].fullname+ '</span>').append("</span><br/>")
				$('#p'+curPostId).attr("data-postdel", curPostId);
				$('#p'+curPostId).append("<br/>").append(curBody.postBody);
				
				if (curBody.userId === currentUser){
					$('#p'+curPostId).append("&nbsp;&nbsp;").append(deletePostBtn).append("<br/><br/>");
				}
				
				$('#p'+curPostId).append("<br/>");
				$('#p'+curPostId).append(showCommBtn).append("&nbsp;&nbsp;");
				$('#p'+curPostId).append(addCommBtn).append("&nbsp;&nbsp;").append(btnLike);
				$('#p'+curPostId).append('&nbsp;<span id="likes' + curPostId +'"></span>');
				$('#p'+curPostId).append(
								'<span id = "c'+curPostId+'" style="color:red;"></span>').append("<br/><hr>");
				$('#likes'+curPostId).text(posts[i].likes);
				postTypeCounter++;
			

			var btnId = "\"#" + curPostId + "\"";

			//pass the post id to retreive relevant comments
			showCommBtn.onclick = function() {
				showCommentAjaxCall($(this).attr('id'));
			};

			//pass the post id to retreive relevant comments
			addCommBtn.onclick = function() {
				var postid = $(this).data('val');
				$("#dialog").dialog({
					height : 250,
					width : 450,
					modal : true,
					position : {
						my : 'top',
						at : 'top+290'
					},
					buttons : {
						"Cancel" : function() {
							$(this).dialog("close");
							$('#comBody').val("");
						},
						"Submit" : function() {
							addCommentAjaxCall(postid, $('#comBody').val());
							$('#comBody').val("");
							$(this).dialog('close');
						},
					}
				});

			}

			//pass the post id to update likes
			btnLike.onclick = function() {
				likesAjaxCall($(this).data('i'));
			};
			
			deletePostBtn.onclick = function(){
				deletePostAjaxCall($(this).data('del'));
				//$(this).data('del')).parent().remove();
			};
		}

		if (i >= posts.length) {
			currPostPosition = posts.length;
		}
	}

	/*
	*Ajax call to delete posts that belong to logged in user
	*/
	function deletePostAjaxCall(postId){
		$.ajax({
			'url' : "PostsController",
			'data' : {
				'action' : 'deletePost',
				"currentPostId" : postId
			},
			'type' : 'POST',
			'success' : function(data) {
				//remove post from the view
				$('#p'+postId).remove();
			},
			'error' : ajaxFailure
		});
	}
	
	/*
	* Ajax call to add new posts
	*/
	function addNewPostAjaxCall(rideTypeSel, pickUpLocat, destinatLocat) {

		$.ajax({
			'url' : "PostsController",
			'data' : {
				'action' : 'addPost',
				"rideTypeSel" : rideTypeSel,
				"pickUpLocat" : pickUpLocat,
				"destinatLocat" : destinatLocat
			},
			'type' : 'POST',
			'success' : function(data) {
				// refresh page
				refreshOneListViewByType(rideTypeSel);
			},
			'error' : ajaxFailure
		});
	}

	// refresh one ListView after I update the local database
	function refreshOneListViewByType(rideTypeSel, callbackFun) {
		// patical refresh page by its type ----- need to call ajax to query database
		// todo
		$.ajax({
			'url' : 'PostsController?action=querybytype&type=' + rideTypeSel,
			'type' : 'GET',
			'success' : function(data) {
				var myList = JSON.parse(data);
				//console.log(JSON.parse(data));
				currPostPosition = 0;
				postsList = JSON.parse(data);
				if (rideTypeSel == "2") {
					$('#offer').empty();
					displayPostsInfo(myList, '#offer', 2, currPostPosition);
				} else if (rideTypeSel == "1") {
					$('#request').empty();
					displayPostsInfo(myList, '#request', 1, currPostPosition);
				}

				if (callbackFun)
					callbackFun();
			},
			'error' : ajaxFailure
		});
	}

	function addCommentAjaxCall(postId, comBody) {
		//console.log(postId);
		$.ajax({
			'url' : "CommentsController",
			'data' : {
				'action' : 'addComment',
				"postId" : postId,
				"comBody" : comBody
			},
			'type' : 'POST',
			'success' : function(data) {
				//console.log(data);
				addNewComment(postId, comBody, JSON.parse(data).commentId);
			},
			'error' : ajaxFailure
		});
	}

	function addNewComment(postId, comBody, CurComId) {
		$('#c' + postId).append("</br>").append(
				'<span id = "del'+ CurComId+'" style="color:red;"></span>');
		$('#del' + CurComId).append("</br>").append(comBody).append(
				"&nbsp;&nbsp;&nbsp;");

		var deleteComBtnId = 'btn' + postId;
		var deleteComBtn = document.createElement("input");
		deleteComBtn.className = 'btn btn-primary btn-xs';
		deleteComBtn.setAttribute("id", deleteComBtnId);
		deleteComBtn.setAttribute("data-val", postId);
		deleteComBtn.setAttribute('type', 'button');
		deleteComBtn.setAttribute('value', 'Delete');
		//$(btn).css('height','15px').css('width',' 70px');
		$(deleteComBtn).css('font-size', '11px');
		$('#del' + CurComId).append(deleteComBtn);

		//on click of the delete button ajax call pass the post id to update likes
		deleteComBtn.onclick = function() {
			deleteCommentAjaxCall(CurComId);

		};

	}

	function showCommentAjaxCall(postId) {

		$.ajax({
			'url' : "CommentsController",
			'data' : {

				"postId" : postId
			},
			'type' : 'GET',
			'success' : function(data) {
				//console.log(JSON.parse(data));
				displayCommentsInfo(JSON.parse(data), postId);
			},
			'error' : ajaxFailure
		});

	}

	function likesAjaxCall(postId) {
		$.ajax({
			'url' : "LikesController",
			'data' : {
				"postIdforLikes" : postId,
			},
			'type' : 'GET',
			'success' : function(data) {
				$('#likes' + postId).text(JSON.parse(data));
				
			},
			'error' : ajaxFailure
		});

	}

	function displayCommentsInfo(comments, postId) {
		var text = $('#' + postId).val();
		if (text == 'Hide Comments') {
			$('#' + postId).val('Show Comments');
			$('#c' + postId).slideUp();
			return false;
		}

		$('#c' + postId).html('').show();
		var curUserId = 0;

		for (var i = 0; i < comments.length; i++) {
			var curPostId = comments[i].postId;

			var curCom = comments[i].commentBody;
			var CurComId = comments[i].commentId;
			currentCommentId = CurComId;

			if (curPostId == postId) {
				curUserId = comments[i].userId;

				$('#c' + postId)
						.append("</br>")
						.append(
								'<span id = "del'+ CurComId+'" style="color:red;"></span>');

				$('#del' + CurComId).append("</br>").append(curCom).append(
						"&nbsp;&nbsp;&nbsp;");
				if (curUserId === currentUser) {

					var deleteComBtnId = 'btn' + CurComId;
					var deleteComBtn = document.createElement("input");
					deleteComBtn.className = 'btn btn-primary btn-xs';
					deleteComBtn.setAttribute("id", deleteComBtnId);
					deleteComBtn.setAttribute("data-val", curPostId);
					deleteComBtn.setAttribute("data-id", CurComId);
					deleteComBtn.setAttribute('type', 'button');
					deleteComBtn.setAttribute('value', 'Delete');
					//$(btn).css('height','15px').css('width',' 70px');
					$(deleteComBtn).css('font-size', '11px');
					$('#del' + CurComId).append(deleteComBtn);
					currentCommentId = CurComId;
					//on click of the delete button ajax call pass the post id to update likes
					deleteComBtn.onclick = function() {
						deleteCommentAjaxCall($(this).data('id'));
					};
					
					$('#c' + postId).show('slow');
					if ($('#' + postId).val() == 'Show Comments') {
						$('#' + postId).val('Hide Comments');
					} else {
						$('#' + postId).val('Show Comments');
					}
				}				
			}
		}
	}
	
/*
 * Delete a comment
 */
	function deleteCommentAjaxCall(comId) {
		$.ajax({
			'url' : "CommentsController",
			'data' : {
				'action' : 'deleteComment',
				"comId" : comId,
			},
			'type' : 'POST',
			'success' : function(data) {
				$('#del' + comId).remove();
			},
			'error' : ajaxFailure
		});
	}

	function openPost(evt, postName) {
		// Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className
					.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(postName).style.display = "block";
		evt.currentTarget.className += " active";

		// add by Xianfeng
		// use ajax to call local database to load data by type. after page refresh, clear notification view
		let myType = 2;
		if (postName == 'offeride') { // type 2
			myType = 2;
		} else if (postName == 'getride') {
			myType = 1;
		}

		refreshOneListViewByType(myType, function() {
			clearNotificationView(myType);
		});
	}