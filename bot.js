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

const SENHA = 'SUA_SENHA_AQUI'
let autenticado = false

bot.on('login', () => {
  console.log('✅ Bot conectou ao servidor!')
})

bot.on('spawn', () => {
  console.log('✅ Bot entrou no mundo!')
})

bot.on('message', (message) => {
  const texto = message.toString()
  console.log('[SERVIDOR]', texto)

  const msg = texto.toLowerCase()

  // REGISTRO - use somente se a conta ainda não estiver registrada
  if (
    !autenticado &&
    (
      msg.includes('register') ||
      msg.includes('registre') ||
      msg.includes('registr')
    )
  ) {
    console.log('📝 Servidor pediu registro. Registrando...')
    bot.chat(`/register ${SENHA} ${SENHA}`)
    autenticado = true
    return
  }

  // LOGIN
  if (
    !autenticado &&
    (
      msg.includes('login') ||
      msg.includes('senha') ||
      msg.includes('password')
    )
  ) {
    console.log('🔐 Servidor pediu login. Fazendo login...')
    bot.chat(`/login ${SENHA}`)
    autenticado = true
  }
})

bot.on('kicked', (reason) => {
  console.log('❌ Bot foi expulso:', reason)
})

bot.on('end', (reason) => {
  console.log('❌ Bot desconectou do servidor:', reason)
})

bot.on('error', (err) => {
  console.log('❌ Erro:', err)
})
