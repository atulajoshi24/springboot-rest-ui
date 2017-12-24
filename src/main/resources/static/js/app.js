angular.module('rolb', ['ngRoute']).config(function($routeProvider, $httpProvider) {

	$routeProvider.when('/', {
		templateUrl : 'home.html',
		controller : 'homeController'		
	}).when('/login', {
		templateUrl : 'login.html',
		controller : 'navigationController'		
	}).when('/subscribeConfirm', {
		templateUrl : 'subscribe.html',
		controller : 'subscriptionController'		
	}).otherwise('/');
	
   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
   $httpProvider.defaults.headers.post = {};
   $httpProvider.defaults.headers.put = {};
   $httpProvider.defaults.headers.patch = {};
   /*if this is not set , after successfull authentication for first time , the next request doesn't contain JSESSIONID and hence session is not established 
   requiring again /login request*/
   $httpProvider.defaults.withCredentials = true;

})