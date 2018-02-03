angular.module('rolb').controller('subscriptionController', ['$http','$scope','$rootScope','$location',function($http,$scope,$rootScope,$location) {
	
	$http.get('http://localhost:8080/springbootrest/subscriptionInfo').success(function(data) {				    	
    	if (data) {					
    		$scope.selectedProduct = data.productsDto;
    		$scope.selectedAccount = data.accountsDto;
		} else {
		
		}	    	
    }).error(function(data) {
     
    })	
       
}]);