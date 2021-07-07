// Internal
import { ConnectorNames } from 'src/providers/web3'

// SVG
import TelegramSVG from 'src/assets/svg/Telegram.svg'
import DiscordSVG from 'src/assets/svg/Discord.svg'
import TwitterSVG from 'src/assets/svg/Twitter.svg'
import GithubSVG from 'src/assets/svg/Github.svg'
import MetaMaskSVG from 'src/assets/svg/metamask.svg'
import WalletConnectSVG from 'src/assets/svg/wallet-connect.svg'

interface SocialIconsMap {
  [key: string]: string
}

export const socialIcons: SocialIconsMap = {
  Github: GithubSVG,
  Twitter: TwitterSVG,
  Discord: DiscordSVG,
  Telegram: TelegramSVG,
}

export const Web3ProviderIcons: { [connectorName in ConnectorNames]: string } = {
  [ConnectorNames.Injected]: MetaMaskSVG,
  [ConnectorNames.WalletConnect]: WalletConnectSVG,
}