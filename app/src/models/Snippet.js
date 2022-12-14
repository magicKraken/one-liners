import dayjs from 'dayjs'

export class Snippet
{
  constructor (publicKey, accountData) {
    this.publicKey = publicKey
    this.author = accountData.author
    this.timestamp = accountData.timestamp.toString()
    this.language = accountData.language
    this.description = accountData.description
    this.code = accountData.code
  }

  get key () {
    return this.publicKey.toBase58()
  }

  get author_display () {
    const author = this.author.toBase58()
    return author.slice(0, 4) + '..' + author.slice(-4)
  }

  get created_at () {
    return dayjs.unix(this.timestamp).format('lll')
  }

  get created_ago () {
    return dayjs.unix(this.timestamp).fromNow()
  }
}
