/**
 * Created by lorenzvercoutere on 2/01/17.
 */


"use strict";

var config = {
    HOST: 'http://localhost',
    PORT: getEnv('PORT') || 3000,
    MONGODBURL : process.env.MONGO_URI || 'mongodb://localhost/sharkfrenzy',
};

function getEnv(variable) {
    if (process.env[variable] === undefined) {
        //throw new Error('You must create an environment variable for ' + variable);
        if (variable == 'PORT') { return 1337 }

        console.log('You must create an environment variable for ' + variable);

        //return null;
    }

    return process.env[variable]; //of bvb. process.env.WEB_PORT
}

module.exports = config;

