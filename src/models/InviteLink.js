import { Schema, model } from 'mongoose'

const inviteLinkSchema = new Schema({
    userId: { type: String, required: true },
    first_name: { type: String},
    last_name: { type: String},
    username: { type: String },
    language_code: { type: String },
    linkId: { type: String, required: true },
    linkKey: { type: String, required: true },
    url: { type: String, required: true },
    shortUrl: { type: String, required: true }
})

const InviteLink = model('InviteLink', inviteLinkSchema)

export default InviteLink
