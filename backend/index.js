import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDao.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

// console.log(process.env.RESTREVIEWS_DB_URI)

MongoClient.connect
    (
        process.env.RESTREVIEWS_DB_URI
        // ,{
        //    maxPoolSize: 50,
        //     //waitQueueTimeoutMS: 2500,
        //     // qtimeout: 2500,
        //    // useNewUrlParse: true
        // }
    )
    .catch(
        err=>{
            console.error(err.stack)
            process.exit(1)
        }
    )
    .then(
        async client=>{
            await RestaurantsDAO.injectDB(client)
            app.listen(port, ()=>{
                console.log(`listenning on port ${port}`)
            })
        }
    )
