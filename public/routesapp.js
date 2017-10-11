angular.module('personalProjApp')
    .config(($urlRouterProvider, $stateProvider) => {


        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './component/home/homeTmpl.html',
                controller: 'homeCtrl',
                // resolve: {} if statement, if logged in, personalized homepage 
            })
            .state('user', {
                url: '/userpage',
                templateUrl: './component/user/userTmpl.html',
                controller: 'userCtrl',
                // resolve: {} 
            })
            .state('upload', {
                url: '/spotadog',
                templateUrl: './component/upload-page/uploadTmpl.html',
                controller: 'mainCtrl',
                // resolve: {} 
            })
            .state('adoption', {
                url: '/adoptadog',
                templateUrl: './component/adoption-page/adoptionTmpl.html',
                controller: 'adoptionCtrl',
                // resolve: {} 
            })
            .state('voting', {
                url: '/dogvote',
                templateUrl: './component/dog-voting/votingTmpl.html',
                controller: 'votingCtrl',
                // resolve: {} 
            })
            .state('login', {
                url: '/login',
                templateUrl: './component/login/loginTmpl.html',
                controller: 'loginCtrl',
                // resolve: {} 
            })

            $urlRouterProvider.otherwise('/');


})