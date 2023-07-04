const url = 'ws://10.3.10.142:3000/ws'

let ws;

function initSocket() {
  return new Promise((resolve, reject) => {
    ws = new WebSocket(url)
    ws.onopen = () => {
      resolve(ws)
    }
    ws.onerror = (err) => {
      reject(err)
    }
  })
}

async function getSocket() {
  if (ws) {
    console.log('ws 复用')
    return ws
  }

  console.log('重新初始化')
  const socket = await initSocket()
  socket.send(
    JSON.stringify({
      type: "online",
      userId: sessionStorage.getItem('userId')
    })
  );
  ws = socket
  return ws
}

export {
  initSocket,
  getSocket
}
