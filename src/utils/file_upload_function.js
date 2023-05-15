const fs = require('fs');
const uuid = require('uuid');

const uploadProfilePicture = (file) => {
    const directoryPath = './app_images/profile_images';
    var fileName = `${uuid.v4()}.${file_extension(file)}`;
    check_directory_exist(directoryPath);
        // Continue with file creation
        const filePath = `${directoryPath}/${fileName}`;

        fs.writeFile(filePath, file, (err) => {
        if (err) {
            console.error('An error occurred while creating the file:', err);
            return null;
        } else {
            console.log('File created successfully.');
            return fileName;
        }
        });
}

const file_extension = (file) => {
    return `${file.originalname.split(".")[0]}_${Date.now().toString()}.${file.mimetype.split("/")[1]}`;
}


const check_directory_exist = (path,createNew) => {
    if (!fs.existsSync(path)) {
        console.log(`${path} not exist.`);
        if(!createNew){
            return false;
        }
        // Create the directory if it doesn't exist
        fs.mkdirSync(path, { recursive: true });
    }
}

module.exports = {
    uploadProfilePicture
}