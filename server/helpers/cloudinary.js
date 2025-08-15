
const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
    cloud_name : 'dqdn8s4at',
    api_key:'986276788632788',
    api_secret : 'CIEVboVXbkX5lXAALbDcr2Pa87Q'

})

const storage = new multer.memoryStorage()

async function imageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type :'auto'
    })
    return result
}


const upload = multer({storage})


module.exports = {upload , imageUploadUtil}
