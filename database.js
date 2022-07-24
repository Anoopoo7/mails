const { MongoClient } = require("mongodb");
const connectionString = "mongodb+srv://zyndicateMessaggings:DiREqo3AV0UpLfhNjDfq5BtCqbwodoAFFxNkccWmTZroIyPsl1azC4fP7ZdUc5AN@cluster0.wubob.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function(callback) {
        client.connect(function(err, db) {
            if (err) {
                return callback(err);
            }

            dbConnection = db.db("ZMessagings");
            console.log("Successfully connected to ZMessagings.");

            return callback();
        });
    },

    getDb: function() {
        return dbConnection;
    },
};