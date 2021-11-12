// App configuration
const app = require('./app');

//Port configuration
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});