import SDK from '@linkdrop-widget/sdk'
import { ethers } from 'ethers'

require('dotenv').config()

class LinkdropService {
  constructor () {
    this.sdk = new SDK({
      apiHost: 'http://localhost:5000',
      claimHost: process.env.CLAIM_HOST,
      jsonRpcUrl: process.env.JSON_RPC_URL
    })
  }

  async generateLink () {
    return this.sdk.generateLink({
      signingKeyOrWallet: process.env.LINKDROP_MASTER_PRIVATE_KEY,
      linkdropModuleAddress: process.env.LINKDROP_MODULE_ADDRESS,
      weiAmount: process.env.WEI_AMOUNT,
      tokenAddress: process.env.TOKEN_ADDRESS,
      tokenAmount: process.env.TOKEN_AMOUNT,
      expirationTime: process.env.EXPIRATION_TIME
    })
  }
}

export default new LinkdropService()
