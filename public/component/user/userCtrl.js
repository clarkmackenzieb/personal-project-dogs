angular.module('personalProjApp').controller('userCtrl', function ($scope, user, mainSrvc){
    
    $scope.user = user.data && user.data.err ? user.data.err : user;

    mainSrvc.getUserFavs($scope.user.authid).then(res => $scope.user_favs = res.data);
    
    mainSrvc.getUserDogs($scope.user.authid).then(res => {
        $scope.user_dogs = res.data;
        if($scope.user_dogs.length < 1){
            $scope.dogmessage = "None yet. Go exploring and find some dogs!";
        }
    });

    
    //Function to the css rule
    checkSize = () => {
        if ($(".photo-cred").css("display") == "none" ){
            console.log("jquery firing")
            
                let sidebarBox = document.querySelector('#box'),
    sidebarBtn = document.querySelector('#btn'),
    pageWrapper = document.querySelector('#page-wrapper');

sidebarBtn.addEventListener('click', function (event) {
        sidebarBtn.classList.toggle('active');
        sidebarBox.classList.toggle('active');
});

pageWrapper.addEventListener('click', function (event) {

        if (sidebarBox.classList.contains('active')) {
                sidebarBtn.classList.remove('active');
                sidebarBox.classList.remove('active');
        }
});

window.addEventListener('keydown', function (event) {

        if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
                sidebarBtn.classList.remove('active');
                sidebarBox.classList.remove('active');
        }
});
        }else{console.log("jquery not firing")}
    }    

    $(document).ready(function() {
        // run test on initial page load
        checkSize();
    
        // run test on resize of the window
        $(window).resize(checkSize());
    });
        
    
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