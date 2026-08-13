const mineflayer = require('mineflayer')
const http = require('http')

// Servidor web exigido pelo plano Free do Render
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Bot Online\n')
})
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Servidor de monitoramento rodando na porta ${PORT}`)
})

// Configuração do robô de Minecraft
const bot = mineflayer.createBot({
  host: 'bmx.exfrp.zip', 
  port: 38769,        
  username: 'AntiAFK_Bot',
  // REMOVEMOS A VERSÃO FIXA. O Mineflayer vai tentar descobrir e se adaptar sozinho!
})

bot.on('spawn', () => {
  console.log('Bot entrou no servidor com sucesso!')
  setInterval(() => {
    bot.chat('Mantendo o servidor ativo...');
  }, 180000)
})

bot.on('kick', (reason) => {
  console.log('O bot foi expulso por: ' + reason)
})

bot.on('error', (err) => {
  console.log('Erro encontrado: ', err)
})
