import TelegramSVG from 'src/assets/svg/Telegram.svg'
import DiscordSVG from 'src/assets/svg/Discord.svg'
import TwitterSVG from 'src/assets/svg/Twitter.svg'
import GithubSVG from './svg/Github.svg'

interface SocialIconsMap {
  [key: string]: string
}

export const socialIcons: SocialIconsMap = {
  Github: GithubSVG,
  Twitter: TwitterSVG,
  Discord: DiscordSVG,
  Telegram: TelegramSVG,
}
