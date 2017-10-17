const axios = require('axios');

const uploadImages = (req, res) => {
    
    req.app
      .get('db')
      .upload_pic(req.body)
      .catch(err => {console.log(err)})
  }

const updateDogs = (req, res) => {
    
    req.app
      .get('db')
      .update_dogs(req.body)
}

const getDogs = (req, res) => {
  
  req.app.get('db').get_dogs().then(response => res.json(response))
}

const favoriteDog = (req, res) => {

  req.app 
    .get('db')
    .favorite_dog(req.body)
} 

const upvoteDog = (req, res) => {
  
  req.app
    .get('db')
    .upvote_dog(req.body).then(dogs => res.status(200).json(dogs))
}

const getUser = (req, res) => {
  
  if(req.user){
    
    req.app.get('db').getUserByAuthId([req.user.authid]).then(response => response.status(200).json(response)
    )
    .catch(err => {
      console.log(err)
    })
  }
}

const getUserDogs = (req, res) => {
 
  req.app
    .get('db')
    .get_user_dogs(req.query.userid).then(response => res.status(200).json(response))
}

const getUserFavs = (req, res) => {

  req.app
    .get('db')
    .get_user_favs(req.query.userid).then(response => res.status(200).json(response))
}

const getAdoptDogs = (req, res) => {
  
  axios.get(req.body.request).then(response => res.json(response.data))

}

const getShelters = (req, res) => {

  axios.get(req.body.request).then(response => res.json(response.data));

}


module.exports = {
    uploadImages,
    updateDogs,
    getDogs,
    favoriteDog,
    upvoteDog,
    getUser,
    getUserFavs,
    getUserDogs,
    getAdoptDogs,
    getShelters
  }