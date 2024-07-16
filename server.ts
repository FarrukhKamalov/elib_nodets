import app from './src/app';
import { config } from './src/config/config';
import connectDB from './src/config/db';

const startServer = () => {
    const port = config.port || 5000;
    connectDB()
    app.listen(port, ()=>{
        console.log(`Server listener PORT: ${port}`)
    })
}

startServer()