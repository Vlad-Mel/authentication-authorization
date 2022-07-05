import config from "./../config/config";
import app from './express';
import mongoose from "mongoose";
import template from "./../template"

const {port, mongoUri} = config;

app.get('/', (req, res) => {
    res.status(200).send(template())
})

app.listen(port, (err) => {
    if (err) console.log(err);
    console.info(`Server started on port ${port}`)
});

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useNewUrlParser: true,
                             useUnifiedTopology: true});

mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${mongoUri}`);
});

mongoose.connection.on('connected', () => {
    console.log(`Successfully connected to ${mongoUri}`);
})

mongoose.connection.on('disconnected', () => {
    console.log(`Disconnected database`);
})
                