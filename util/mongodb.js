import { MongoClient } from 'mongodb';

process.env.BUCKETEER_AWS_ACCESS_KEY_ID="AKIAVVKH7VVUGGAOLANO"
process.env.BUCKETEER_AWS_REGION="eu-west-1"
process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY="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"
process.env.BUCKETEER_BUCKET_NAME="bucketeer-75a3326a-ab9c-4ea3-9927-3856be7c0128"
process.env.BUCKETEER_URL="https://bucketeer-75a3326a-ab9c-4ea3-9927-3856be7c0128.s3.amazonaws.com/"
process.env.ORMONGO_DB="g2layer"
process.env.ORMONGO_OPTIONS="?replicaSet=e9a77bc18c8647269da6a35d80f18626"
process.env.ORMONGO_PW="NYkmoboIvlAQl4rR9VLHVZHLw6VIA4F4t"
process.env.ORMONGO_REGION="LON"
process.env.ORMONGO_URL="lon5-c13-1.mongo.objectrocket.com:43656,lon5-c13-0.mongo.objectrocket.com:43656,lon5-c13-2.mongo.objectrocket.com:43656"
process.env.ORMONGO_USER="g2"
process.env.G2_GEN_LINK = "https://g2layer-gen.herokuapp.com"


var username = process.env.ORMONGO_USER;
var password = process.env.ORMONGO_PW;
var hosts = process.env.ORMONGO_URL;
var database = process.env.ORMONGO_DB;
var options = process.env.ORMONGO_OPTIONS;



var MONGODB_URI = 'mongodb://' + username + ':' + password + '@' + hosts + '/' + database + options;
var MONGODB_DB = database;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

if (!MONGODB_DB) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    );
}

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            return {
                client,
                db: client.db(MONGODB_DB),
            };
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}


