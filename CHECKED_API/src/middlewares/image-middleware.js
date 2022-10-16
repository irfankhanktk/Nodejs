import multer, { diskStorage } from 'multer';


const fileFilter=(req, file, cb)=> {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}
const upload = multer({
    storage:diskStorage({
        destination: (req, file, cb)=> {
            cb(null, './src/upload/')
        },
        filename:  (req, file, cb)=> {
            cb(null, `${Date.now()}${file.originalname}`)
        }
    }),
    fileFilter,
    // limits:{
    //     fieldSize:1024*1024*10,
    // }
});
export default upload;
