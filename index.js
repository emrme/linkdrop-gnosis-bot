import express from 'express'
import Telegraf from 'telegraf'
import connectDB from './config/db'

import Markup from 'telegraf/markup'

import inviteLinkService from './src/services/inviteLinkService'

require('dotenv').config()
const app = express()

// Connect database
connectDB()

const state = {}

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async ctx => {
  console.log('Started bot with: ', ctx.from)

  ctx.reply(
    `🤑 Welcome onboard, ${ctx.from.first_name}`,
    Markup.inlineKeyboard([
      Markup.callbackButton('🎉 Get invite link', 'GET_LINK')
    ]).extra()
  )

  bot.action('GET_LINK', async ctx => {
    const userId = ctx.from.id
    console.log(
      `Received new invite link request from: ${ctx.from.first_name}}`
    )

    try {
      if (
        (await inviteLinkService.getCount()) >= process.env.MAX_LINKS_NUMBER
      ) {
        console.log('All links have been claimed')
        return ctx.answerCbQuery(
          '🤢 Oops.. All available links have been claimed'
        )
      }

      console.log('ctx: ', ctx.from)

      if (ctx.from.is_bot) {
        return ctx.answerCbQuery('Bots are not allowed.')
      }

      if (
        ctx.from.username === 'genesisblock' ||
        ctx.from.username === 'covfefefe' ||
        ctx.from.username === 'ignatyev' ||
        ctx.from.username === 'dobrokhvalov'
      ) {
        inviteLink = await inviteLinkService.create(userId, ctx.from)

        console.log(
          `Generated new invite link for ${ctx.from.first_name}:\n`,
          inviteLink
        )

        ctx.answerCbQuery('🥳 Here is your claim link:')
        return ctx.reply(`Claim tokens and try a dapp: ${inviteLink.shortUrl}`)
      }

      let inviteLink = await inviteLinkService.find(userId)

      if (inviteLink && inviteLink.linkId) {
        console.log('Existing invite link found:\n', inviteLink)
        return ctx.answerCbQuery('🤔 You have already received a link')
      }

      inviteLink = await inviteLinkService.create(userId, ctx.from)
      console.log(
        `Generated new invite link for ${ctx.from.first_name}:\n`,
        inviteLink
      )

      ctx.answerCbQuery('🥳 Here is your claim link:')
      return ctx.reply(`Claim tokens and try a dapp: ${inviteLink.shortUrl}`)
    } catch (error) {
      console.error(error)
    }
  })
})

bot.startPolling()
