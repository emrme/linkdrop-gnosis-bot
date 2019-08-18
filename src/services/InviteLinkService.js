import InviteLink from '../models/InviteLink'
import { LinkdropSDK } from '@linkdrop/sdk'
import linkdropService from './linkdropService'
import bitlyService from './bitlyService'

class InviteLinkService {
  async find (userId) {
    return InviteLink.findOne({ userId })
  }

  async getCount () {
    return InviteLink.countDocuments({})
  }

  async create (userId, user) {
    try {
      let {
        url,
        linkId,
        linkKey,
        linkdropSignerSignature
      } = await linkdropService.generateLink()

      const { last_name, first_name, language_code, username } = user
      const shortUrl = await bitlyService.shortenUrl(url)

      const inviteLink = new InviteLink({
        userId,
        linkId,
        linkKey,
        url,
        last_name,
        first_name,
        language_code,
        username,
        shortUrl
      })
      await inviteLink.save()
      return inviteLink
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}

export default new InviteLinkService()
