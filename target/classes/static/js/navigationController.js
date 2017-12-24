angular.module('rolb').controller('navigationController',['$rootScope','$http','$location','$route','$scope',function($rootScope, $http, $location, $route,$scope) {


    var authenticate = function(callback) {
	    $http.get('http://localhost:8080/springbootrest/user').success(function(data) {
	      if (data.userName) {
	        $rootScope.authenticated = true;
	        $rootScope.userName = data.userName;
	      } else {
	        $rootScope.authenticated = false;
	      }
	      callback && callback();
	    }).error(function() {
	      $rootScope.authenticated = false;
	      callback && callback();
	    });
	  }
	
	
    $scope.credentials = {};
	$scope.login = function() {
		
		 	$http.post('http://localhost:8080/springbootrest/login', "username=" + encodeURIComponent($scope.credentials.username) +
                 "&password=" + encodeURIComponent($scope.credentials.password), {
		      headers : {
		        "content-type" : "application/x-www-form-urlencoded"
		      }
		    }).success(function(data) {
		        authenticate(function() {
		            if ($rootScope.authenticated) {
		              $location.path("/");
		              $scope.loginError = false;
		            } else {
		              $location.path("/login");
		              $scope.loginError = true;
		            }
		          });
		        }).error(function(data) {
		          $location.path("/login");
		          $scope.loginError = true;
		          $rootScope.authenticated = false;
		        })
	};

	$scope.logout = function() {
		$http.post('logout', {}).finally(function() {
			$rootScope.authenticated = false;
			$location.path("/");
		});
	}
}])