require('dotenv').config()
const Telegraf  	= require('telegraf'),
			express 		= require('express'),
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


const URL = process.env.URL || '',
			PORT = process.env.PORT || 5000
console.log(URL+':'+PORT)

if (URL) {
	const app = express()
	bot.telegram.setWebhook(`${URL}bot${token}`);
	app.use(bot.webhookCallback(`/bot${token}`));
	
	app.get('/', (req, res) => {
		res.send('Hello World!');
	});
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
} else {
	bot.telegram.deleteWebhook()
	bot.startPolling()
}

// bot.telegram.deleteWebhook()
// bot.startPolling()