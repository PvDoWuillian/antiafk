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
  auth: 'offline',
  version: false
})

const SENHA = 'wuillian360'

bot.on('spawn', () => {
  console.log('Bot entrou no servidor!')

  // Espera o AuthMe terminar de enviar a mensagem
  setTimeout(() => {
    bot.chat(`/login ${SENHA}`)
    console.log('Tentando fazer login no AuthMe...')
  }, 3000)

  setInterval(() => {
    bot.chat('Mantendo o servidor ativo...')
  }, 180000)
})

bot.on('message', (message) => {
  const texto = message.toString()
  console.log('[CHAT]', texto)

  // Se a conta ainda não estiver registrada
  if (
    texto.toLowerCase().includes('registre-se') ||
    texto.toLowerCase().includes('register') ||
    texto.toLowerCase().includes('/register')
  ) {
    setTimeout(() => {
      bot.chat(`/register ${SENHA} ${SENHA}`)
      console.log('Conta ainda não registrada. Registrando...')
    }, 1500)
  }

  // Se o servidor pedir login
  if (
    texto.toLowerCase().includes('faça login') ||
    texto.toLowerCase().includes('login') ||
    texto.toLowerCase().includes('/login')
  ) {
    setTimeout(() => {
      bot.chat(`/login ${SENHA}`)
      console.log('Enviando senha para o AuthMe...')
    }, 1500)
  }
})

bot.on('kicked', (reason) => {
  console.log('Bot foi expulso:', reason)
})

bot.on('error', (err) => {
  console.log('Erro encontrado:', err)
})

bot.on('end', () => {
  console.log('Bot desconectou do servidor.')
})
