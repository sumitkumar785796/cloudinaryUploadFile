const UploadFile = require('../schema/schema')
const cloudinary = require('../utils/cloadinary')
const uploadFileMiddleware = require('../middleware/uploadFile')
const main = async (req,res) =>{
    try {
        const view = await UploadFile.find()
        res.status(200).render('index',{title:'Main Page',sessionData: req.session,viewData:view})
    } catch (error) {
        res.status(404).send('Page is not created')
    }
}
const handleFileUpload = async (req, res) => {
    try {
        uploadFileMiddleware(req, res, async (err) => {
            if (err) {
                console.error(err);
                setAlertMessage(req, {
                    message: "Error uploading file. " + err.message,
                    type: "danger"
                });
                return res.redirect("/");
            }

            const { fname } = req.body;

            if (!fname) {
                setAlertMessage(req, {
                    message: "Fill all data!!!",
                    type: "danger"
                });
                return res.redirect("/");
            }

            try {
                // Upload image to Cloudinary
                const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                    public_id: `timestamp_${Date.now()}_${fname}`,
                    // Add any other Cloudinary upload options as needed
                });

                // Save the Cloudinary URL to the database
                const uploadData = new UploadFile({
                    file: cloudinaryResult.secure_url,
                    fname
                });

                await uploadData.save();

                setAlertMessage(req, {
                    message: "File uploaded successfully!!!",
                    type: "success"
                });
                return res.redirect("/");
            } catch (error) {
                console.error(error);
                setAlertMessage(req, {
                    message: "Error saving file data to database",
                    type: "danger"
                });
                return res.redirect("/");
            }
        });
    } catch (error) {
        console.error(error);
        setAlertMessage(req, {
            message: "Internal server error",
            type: "danger"
        });
        return res.redirect("/");
    }
};

function setAlertMessage(req, alert) {
    req.session.alertMessage = alert;
}

module.exports = { main, handleFileUpload };