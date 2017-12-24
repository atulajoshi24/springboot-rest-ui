angular.module('hello', [ 'ngRoute' ]).config(function($routeProvider, $httpProvider) {

	$routeProvider.when('/', {
		templateUrl : 'home.html',
		controller : 'home',
		controllerAs: 'controller'
	}).when('/login', {
		templateUrl : 'login.html',
		controller : 'navigation',
		controllerAs: 'controller'
	}).when('/subscribeConfirm', {
		templateUrl : 'subscribe.html',
		controller : 'home',
		controllerAs: 'controller'
	}).otherwise('/');
	


   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
   //$httpProvider.defaults.headers.common = {};
   $httpProvider.defaults.headers.post = {};
   $httpProvider.defaults.headers.put = {};
   $httpProvider.defaults.headers.patch = {};

}).controller('navigation',function($rootScope, $http, $location, $route,$scope) {
			
			var self = this;

			self.tab = function(route) {
				return $route.current && route === $route.current.controller;
			};

	
		    var authenticate = function(callback) {
			    $http.get('user').success(function(data) {
			      if (data.name) {
			        $rootScope.authenticated = true;
			      } else {
			        $rootScope.authenticated = false;
			      }
			      callback && callback();
			    }).error(function() {
			      $rootScope.authenticated = false;
			      callback && callback();
			    });
			  }
			
			
			self.credentials = {};
			self.login = function() {
				
				 	$http.post('http://localhost:8080/springbootrest/login', "username=" + encodeURIComponent(self.credentials.username) +
	                     "&password=" + encodeURIComponent(self.credentials.password), {
				      headers : {
				        "content-type" : "application/x-www-form-urlencoded"
				      }
				    }).success(function(data) {				    	
				    	if (data.userId) {
							$rootScope.authenticated = true;
							$rootScope.userName = data.userName;
							$rootScope.userId = data.userId;
							$location.path("/");
						} else {
							$rootScope.authenticated = false;
							$location.path("/");
						}
				    	
				    }).error(function(data) {
				      $location.path("/login");
				      self.error = true;
				      $rootScope.authenticated = false;
			    })
			};

			self.logout = function() {
				$http.post('logout', {}).finally(function() {
					$rootScope.authenticated = false;
					$location.path("/");
				});
			}

		}).controller('home', function($http,$scope,$rootScope,$location) {
			var self = this;
			/*$http.get('/resource/').then(function(response) {
				self.greeting = response.data;
			})*/
			
			$scope.subscribe = function(prodId) {
				
				var url = "http://localhost:8080/springbootrest/productSubscription/"+$rootScope.userId+"/"+prodId+"/"+$scope.selectedAccount;
				$http.post(url).success(function(data) {				    	
					$location.path("/subscribeConfirm");
			    }).error(function(data) {
			     
			    })						
			}
						
			$http.get('http://localhost:8080/springbootrest/products').success(function(data) {				    	
		    	if (data) {					
		    		$scope.products = data;
				} else {
				
				}	    	
		    }).error(function(data) {
		     
		    })	
		    
		    $http.get('http://localhost:8080/springbootrest/accounts').success(function(data) {				    	
		    	if (data) {					
		    		$scope.accounts = data;
				} else {
				
				}	    	
		    }).error(function(data) {
		     
		    })		
		    
});
