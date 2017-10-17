angular.module('personalProjApp').service('mainSrvc', function($http){

    this.getADogPic = function(){
        var promise = $http({
            method: "GET",
            url: "https://dog.ceo/api/breeds/image/random",
        })
        return promise;
    }

    this.getDogs = () => {
        return $http.get('/api/getdogs')
    };

    this.getAdopt = (location, size, breed, age) => {
        let request = "http://api.petfinder.com/pet.find?key=9d6a47d438e8fbfbcfc69f98cab12a30&animal=dog&format=json"
        if(location != undefined){
            request += ("&location="+location);
         }
        if(size != undefined){
            request += ("&size="+size);
         }
        if(breed != undefined){
            request += ("&breed="+breed);
         }
        if(age != undefined){
            request += ("&age="+age);
         }   
       
    
        
        return $http.post('/api/getadoptdogs', {request}).catch(err => console.log(err));
    }

    this.getShelter = (shelterlocation) => {

        let request = "http://api.petfinder.com/shelter.find?key=9d6a47d438e8fbfbcfc69f98cab12a30&format=json&location="+shelterlocation;

        return $http.post('/api/getshelters', {request}).catch(err => console.log(err));
    }

    this.uploadImage = (file, dogname, dogbreed, dogage, dogcity, dogstate, thedate, userid) => {
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
            if(downloadURL){


            let headers = {
                        downloadURL: downloadURL[0],
                        dogname: dogname,
                        dogbreed: dogbreed,
                        dogage: dogage,
                        dogcity: dogcity,
                        dogstate: dogstate,
                        thedate: thedate,
                        userid: userid,
            }
            console.log(headers)
            return $http.post(`/api/dogupdate`, headers)
        }
            });
        
    }

    this.favoriteDog = (userid, dogid) => {
        let headers = {
            userid: userid,
            dogid: dogid
        }
        
        return $http.post('/api/favoritedog', headers)
    }

   

    this.upvoteDog = (dogid) => {
        
        
        let headers = {
            dogid: dogid
        }
        
        return $http.post('/api/upvotedog', headers).then(res => res.data)
    
    }

    this.getUser = () => {
        return $http.get('/user')
    }

    this.getUserDogs = (userid) => {
        let headers = {
            userid: userid
        }
        
        return $http.get('/api/getuserdogs?userid='+userid)
    }
    this.getUserFavs = (userid, dogid) => {
        let headers = {
            userid: userid
        }
        
        return $http.get('/api/getuserfavs?userid='+userid+'&dogid='+dogid)
    }

    this.makePayment = function(payload) {
        return $http.post('/api/payment', payload);
    } // this was in service




});


// function for payment :-) 
//install stripe 