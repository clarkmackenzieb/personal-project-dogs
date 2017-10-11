angular.module('personalProjApp').service('mainSrvc', function($http){

    this.getADogPic = function(){
        var promise = $http({
            method: "GET",
            url: "https://dog.ceo/api/breeds/image/random",
        })
        return promise;
    }

    this.getDogs = () => $http.get('/api/getdogs');

    this.getUser = () => $http.get('/login');

    this.uploadImage = (file, dogname, dogbreed, dogage, dogcity, dogstate) => {
        console.log("working")
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('images/' + file.name).put(file);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                        break;
                }
        }, function(error) {
    
        }, function() {
            let downloadURL = [uploadTask.snapshot.downloadURL];
            console.log(downloadURL)
            console.log(dogname)

            // return $http({
            //     method: "POST",
            //     url: "/api/dogupdate",
            //     headers: {
            //         "downloadURL": downloadURL,
            //         "dogname": dogname,
            //         'dogbreed': dogbreed,
            //         'dogage': dogage,
            //         'dogcity': dogcity,
            //         'dogstate': dogstate
            //     }
            // })
            
            let headers = {
                        downloadURL: downloadURL[0],
                        dogname: dogname,
                        dogbreed: dogbreed,
                        dogage: dogage,
                        dogcity: dogcity,
                        dogstate: dogstate
            }
            console.log(headers)
            return $http.post(`/api/dogupdate`, headers)
            
            });
    
    }

    

});