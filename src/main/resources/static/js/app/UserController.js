'use strict'

var module = angular.module('demo.controllers', []);
module.controller("UserController", [ "$scope", "UserService","$compile",
		function($scope, UserService,$compile) {
	let  vm = this;
	$scope.stompClient= null;
	$scope.groupid=null;
	$scope.sendurl=null;
	$scope.fetchurl=null;
	$scope.userName=null;
	$scope.groupe = null;
	$scope.showConnected=false;
	$scope.contents={};
	$scope.tchatContent={};
	$scope.tchatContent.messages=[];
	  $scope.form = {};
	 null !==  $scope.stompClient &&  $scope.stompClient.disconnect();
	
	 $scope.form.theForm;
	$scope.connect = function()
	{
		  var e = new SockJS('/websocket-example');
		  $scope.setConnected(!0);
		  $scope.stompClient = Stomp.over(e);
		  $scope.groupid =$scope.groupe ;		  
		  $scope.sendurl = "/app/" + $scope.groupid;
		  $scope.fetchurl = "/topic/" + $scope.groupid;
		    
		  $scope.stompClient.connect({}, function (e) {
			 
		        $scope.sendName();
		        $scope.stompClient.subscribe($scope.fetchurl + '/connect', function (e) {
		            var n = JSON.parse(e.body);
		            $scope.userAlert(n)
		        }),
		        $scope.stompClient.subscribe($scope.fetchurl + '/message', function (e) {
		                var n = JSON.parse(e.body);
		                $scope.showMessage(n)
		            }),
		            $scope.stompClient.subscribe('/topic/stats', function (e) {
		                var n = JSON.parse(e.body);
		                $scope.updateBadge(n);
		            })
		    })
	}
	
	$scope.userAlert = function(e)
	{
		 $scope.form.theForm.message.$setTouched();
		 $scope.tchatContent.messages.push(e);
		 console.log('message:',$scope.tchatContent.messages);	
		//console.log('User Alert: ',e);
	}
	$scope.setConnected = function(e)
	{
//		console.log('Set connected: ',e);
		$scope.showConnected = e;		
	}
	
	$scope.sendName = function()
	{
		$scope.stompClient.send($scope.sendurl + '/connect', {}, $scope.userName);
	}
	
	$scope.showMessage = function(n)
	{

		$scope.form.theForm.message.$setTouched();
		$scope.tchatContent.messages.push(n);
		 //$scope.form.theForm.message.$setPristine();
		//console.log('show message',n);
		console.log('message:',$scope.tchatContent.messages);
		$scope.appendMessage(n);
	}
	
	$scope.updateBadge = function(n)
	{
	//	console.log('update badge',n);
	}
	
	$scope.appendMessage = function(message)
		{
		var divElement = angular.element(document.querySelector('.messages'));
		var htmlElement = angular.element('	<div> >'+message.name+':  '+message.content+'   at : '+message.time+'');		
				
		divElement.append(htmlElement);
		$compile(divElement)($scope);
		}
	
	$scope.sendMessage = function(){
		$scope.stompClient.send($scope.sendurl + '/message', {}, JSON.stringify({
	        name: $scope.userName,
	        content: $scope.contents.message
	    }));
		
	}
	
	$scope.getMessages= function()
	{
		return $scope.tchatContent.messages;
	}
/**
			$scope.userDto = {
				userId : null,
				userName : null,
				skillDtos : []
			};
			$scope.skills = [];
			
			UserService.getUserById(1).then(function(value) {
				console.log(value.data);
			}, function(reason) {
				console.log("error occured");
			}, function(value) {
				console.log("no callback");
			});
	$scope.saveUser = function() {
				$scope.userDto.skillDtos = $scope.skills.map(skill => {
					return {skillId: null, skillName: skill};
				});
				UserService.saveUser($scope.userDto).then(function() {
					console.log("works");
					UserService.getAllUsers().then(function(value) {
						$scope.allUsers= value.data;
					}, function(reason) {
						console.log("error occured");
					}, function(value) {
						console.log("no callback");
					});

					$scope.skills = [];
					$scope.userDto = {
						userId : null,
						userName : null,
						skillDtos : []
					};
				}, function(reason) {
					console.log("error occured");
				}, function(value) {
					console.log("no callback");
				});
			}
		**/	
			
			
			
		} ]);