require('dotenv').config()
const Telegraf  	= require('telegraf'),
			token 			= process.env.TOKEN,
			bot 				= new Telegraf(token),
			{ post } 		= require('axios')

bot.settings(async ctx => {
	await ctx.setMyCommands([
		{
			command: '/get_order',
			description: 'Получить заказ'
		}
	])
	return ctx.reply('Список комманд обновлён')
})

bot.hears('/get_order', ctx => {
	console.log('xex')
	return post(`${process.env.BACKEND}/get_order`)
})
bot.on('dice', (ctx) => ctx.reply(`Value: ${ctx.message.dice.value}`))

bot.start(ctx => {
	ctx.getChat()
		.then(user => console.log(user))
})

bot.telegram.deleteWebhook()
bot.startPolling()