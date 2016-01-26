var switterApp = angular.module('switterApp', ['ngRoute','ngAnimate']);

switterApp.config(['$routeProvider', function ($routeProvide) {

	$routeProvide
		.when('/posts', {
			templateUrl: '/posts.html',
			controller: 'SwitterListCtrl'
		})
		.when('/posts/:postId', {
			templateUrl: '/post-detail.html',
			controller: 'PostDetailCtrl'
		})
		.otherwise({
			redirectTo: '/posts'
		});

}])

switterApp.controller('SwitterListCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {

	$http.get('http://jsonplaceholder.typicode.com/posts').success(function(data){
		$scope.posts = data;
	});

}]);

switterApp.controller('PostDetailCtrl', ['$scope', '$location', '$http', '$routeParams', function ($scope, $location, $http, $routeParams) {
	
	$scope.postId = $routeParams.postId;

	$http.get('http://jsonplaceholder.typicode.com/posts/'+$routeParams.postId+'').success(function(data){
		$scope.post = data;
	});

	$http.get('http://jsonplaceholder.typicode.com/comments?postId='+$routeParams.postId+'').success(function(data){
		$scope.comments = data;
	});

}]);