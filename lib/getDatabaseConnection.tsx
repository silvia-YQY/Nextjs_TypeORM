import {createConnection, getConnectionManager} from "typeorm";

const promise = (async function(){
    const manager = getConnectionManager()
    const hasDefaultConnection = manager.has('default')
    if(hasDefaultConnection){
        console.log('復用');
        const current = manager.get('default')
        if(!current.isConnected){
            console.log('被關閉了')
            return createConnection()
        }
        return current
    }
    console.log('创建connection')
    return createConnection()
})()

export const getDatabaseConnection = async () =>{
    return promise;
}
