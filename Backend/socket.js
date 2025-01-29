const {Server}= require('socket.io')


let io ; 

const initSocket =(server)=>{
     io = new Server(server,{
          cors: {origin : '*'}
     })

     io.on('connection',(socket)=>{
          console.log('user connected',socket.id)

          socket.on('disconnect',()=>{
               console.log('user disconnected')
          })
     })

     return io;
}
 
const getIo=()=>{
     if(!io){
          throw new Error('socket server is not connect')
     }
     return io;
}

module.exports={initSocket, getIo}