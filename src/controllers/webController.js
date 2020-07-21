// Path, to avoid / and \ conflicts
const path = require('path');

// This syntax exports this module while defining this controller's methods
module.exports = {
    index: function(req,res){
        // // ! If using HTML views:
        // res.sendFile(path.resolve(__dirname, '..','views','web','index.html'));
        res.render(path.resolve(__dirname, '..','views','web','index'));
    }
}