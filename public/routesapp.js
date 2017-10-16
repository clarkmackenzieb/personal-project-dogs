angular.module('personalProjApp')
    .config(($urlRouterProvider, $stateProvider) => {


        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './component/home/homeTmpl.html',
                controller: 'homeCtrl',
                // resolve: {} if statement, if logged in, personalized homepage 
            })
            .state('users', {
                url: '/users',
                templateUrl: './component/user/userTmpl.html',
                controller: 'userCtrl',
                resolve: {
                    user: mainSrvc => mainSrvc.getUser()
                        .then(response => response.data)
                        .catch(err => err)
                }
            })
            .state('upload', {
                url: '/spotadog',
                templateUrl: './component/upload-page/uploadTmpl.html',
                controller: 'mainCtrl',
                resolve: {
                    user: mainSrvc => mainSrvc.getUser()
                        .then(response => response.data)
                        .catch(err => err)
                }
            })
            .state('adoption', {
                url: '/adoptadog',
                templateUrl: './component/adoption-page/adoptionTmpl.html',
                controller: 'mainCtrl',
                resolve: {
                    user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
                } 
            })
            .state('voting', {
                url: '/dogvote',
                templateUrl: './component/dog-voting/votingTmpl.html',
                controller: 'mainCtrl',
                resolve: {
                    user: mainSrvc => mainSrvc.getUser()
                        .then(response => response.data)
                        .catch(err => err)
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: './component/login/loginTmpl.html',
                controller: 'mainCtrl',
                // resolve: {} 
            })
            .state('donate', {
                url:'/donate',
                templateUrl: './component/donate/donateTmpl.html',
                controller: 'mainCtrl',
                resolve: {
                    user: mainSrvc => mainSrvc.getUser()
                        .then(response => response.data)
                        .catch(err => err)
                }
            })

            $urlRouterProvider.otherwise('/');


})