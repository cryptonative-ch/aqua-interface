/* eslint-env worker */
import randomBytes from 'randombytes'
import secp256k1 from 'secp256k1'
import keccak from 'keccak'

/**
 * Transform a private key into an address
 */
const privateToAddress = (privateKey: any) => {
  const publicKeyString = secp256k1.publicKeyCreate(privateKey, false).slice(1).toString()

  return keccak('keccak256').update(publicKeyString).digest().slice(-20).toString('hex')
}

/**
 * Create a wallet from a random private key
 */
export const getRandomWallet = (): WalletResponse => {
  const randbytes = randomBytes(32)
  return {
    address: privateToAddress(randbytes).toString(),
    privKey: randbytes.toString('hex'),
  }
}

interface WalletResponse {
  address: string
  privKey: string
}
