/**
 * Boots the app
 */
 const mongoose = require('mongoose');
 const PORT = process.env.PORT || 5000; // 5000 on local env

// connect to the database cluster
mongoose.connect('mongodb+srv://root:root@cluster0.ijro3.mongodb.net/sample_node_project03?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('database connected...');
}).catch((err) => {
    console.log(err.message);
});

const { appRouter } = require('./routes');

router = require('./routes');

module.exports = (app, router) => {

    appRouter(router);
    app.listen(PORT, ()=>{ 
        
        console.log(`server running on port: ${PORT}`);
    
    });

}; // end module.exports