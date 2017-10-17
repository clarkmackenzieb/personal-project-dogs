angular.module('personalProjApp')
    .config(($urlRouterProvider, $stateProvider) => {


        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './component/home/homeTmpl.html',
                controller: 'homeCtrl',
                resolve: {
                    user: mainSrvc => mainSrvc.getUser()
                        .then(response => response.data)
                        .catch(err => err)
                },
            })
            .state('users', {
                url: '/users',
                templateUrl: './component/user/userTmpl.html',
                controller: 'userCtrl',
                resolve: {
                    user: mainSrvc => mainSrvc.getUser()
                        .then(response => response.data)
                        .catch(err => err)
                },
            })
            .state('upload', {
                url: '/spotadog',
                templateUrl: './component/upload-page/uploadTmpl.html',
                controller: 'uploadCtrl',
                resolve: {
                    user: mainSrvc => mainSrvc.getUser()
                        .then(response => response.data)
                        .catch(err => err)
                }
            })
            .state('adoption', {
                url: '/adoptadog',
                templateUrl: './component/adoption-page/adoptionTmpl.html',
                controller: 'adoptionCtrl',
                resolve: {
                    user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
                } 
            })
            .state('voting', {
                url: '/dogvote',
                templateUrl: './component/dog-voting/votingTmpl.html',
                controller: 'votingCtrl',
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
            

            $urlRouterProvider.otherwise('/');


})