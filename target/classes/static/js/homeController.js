angular.module('rolb').controller('homeController',[$http,$scope,$rootScope,$location,function($http,$scope,$rootScope,$location) {
	var self = this;
	/*$http.get('/resource/').then(function(response) {
		self.greeting = response.data;
	})*/
	
	$scope.subscribe = function(prodId) {
		
		var url = "http://localhost:8080/springbootrest/productSubscription/"+prodId+"/"+$scope.selectedAccount;
		$http.post(url).success(function(data) {				    	
			$location.path("/subscribeConfirm");
	    }).error(function(data) {
	    	$scope.error = true;
	    	$scope.errorMessage = data.message;
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
    
    $http.get('http://localhost:8080/springbootrest/subscribedProducts').success(function(data) {				    	
    	if (data) {					
    		$scope.subscribedProducts = data;
		} else {
		
		}	    	
    }).error(function(data) {
     
    })		
    
    
}])