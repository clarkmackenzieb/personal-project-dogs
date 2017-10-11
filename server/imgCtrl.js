const uploadImages = (req, res) => {
    console.log(req.body)
    req.app
      .get('db')
      .upload_pic(req.body)
      .catch(err => {console.log(err)})
  }

const updateDogs = (req, res) => {
    console.log(req.body)
    req.app
      .get('db')
      .update_dogs(req.body)
}

const getDogs = (req, res) => {
  console.log(req.body)
  return req.app 
            .get('db')
            .get_dogs();
}

module.exports = {
    uploadImages,
    updateDogs,
    getDogs
  }