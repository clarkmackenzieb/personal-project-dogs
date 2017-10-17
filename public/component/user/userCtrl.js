angular.module('personalProjApp').controller('userCtrl', function ($scope, user, mainSrvc){
    
    $scope.user = user.data && user.data.err ? user.data.err : user;

    mainSrvc.getUserFavs($scope.user.authid).then(res => $scope.user_favs = res.data);
    
    mainSrvc.getUserDogs($scope.user.authid).then(res => $scope.user_dogs = res.data);
        
    
    $scope.openPayment = (name, desc) => {
        console.log('WINDO STRIPE OBJ', window.StripeCheckout);
            let handler = window.StripeCheckout.configure({
                key: 'pk_test_UdbEvwq8NlDPleKPkdAdjYTx',
                locale: 'auto',
                token: function(token) {
                    var payload = {
                        token: token,
                        total: $scope.final * 100,
    
                   }
                    mainSrvc.makePayment(payload).then(function(response) {
                        console.log(response);
                    }).catch(err => console.log(err));
                }
            });
    
           handler.open({
                name: 'ASPCA Donation',
                description: "Thank you! Your donation will change a dog's life",
                amount: $scope.final * 100
            });
        }
            

    })