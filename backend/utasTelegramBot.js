import { Telegraf } from "telegraf"
import { message } from "telegraf/filters"
import dotenv from "dotenv"

dotenv.config()

const bot = new Telegraf(process.env.telegramBotToken)

export function botready(){
    bot.start((ctx) => {
        ctx.reply("ratatatattatatataatouuuuuiiiillllllleeeeeeeee")
    })
    bot.launch()
    console.log("ratattatataouile is readyyyyyyyy")
}