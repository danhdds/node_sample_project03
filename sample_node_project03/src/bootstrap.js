/**
 * Boots the app
 */
 const mongoose = require('mongoose');

// connect to the database cluster
mongoose.connect('mongodb+srv://root:root@cluster0.ijro3.mongodb.net/sample_node_project03?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected...');
}).catch((err) => {
    console.log(err.message);
});

const { appRouter } = require('./routes');

router = require('./routes');

module.exports = (app, router) => {

    appRouter(router);
    app.listen(5000, ()=>{ 
        
        console.log('server running');
    
    });

}; // end module.exports