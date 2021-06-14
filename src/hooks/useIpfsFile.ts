import { useState, useEffect } from 'react'
import { IPFS_GATEWAY_URL } from 'src/constants'
import { FIX_LATER } from 'src/interfaces'

/**
 * Obtains and returns a file by its IPFS hash.
 */
export function useIpfsFile(ipfsCID: string, isJson?: boolean) {
  const [file, setFile] = useState<FIX_LATER>(null)

  async function getFileByCID(cid: string) {
    const res = await fetch(`${IPFS_GATEWAY_URL}/ipfs/${cid}`)
    if (res.ok) {
      return isJson ? res.json() : res.body
    } else {
      return null
    }
  }

  useEffect(() => {
    if (!ipfsCID) {
      return
    }

    getFileByCID(ipfsCID).then(file => setFile(file))
  }, [ipfsCID])

  return file
}
