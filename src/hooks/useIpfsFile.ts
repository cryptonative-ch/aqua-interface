import React, { useState, useEffect } from "react"
import { FIX_LATER } from "src/interfaces";

// Mocks
import mockData from "src/views/Sale/saleInfo.mock.json";

/**
 * Obtains and returns a file by its IPFS hash.
 */
export function useIpfsFile(ipfsHash: string) {
  const [file, setFile] = useState<FIX_LATER>(null)

  useEffect(() => {
    // Contract is empty or no address
    if (!ipfsHash) {
      return
    }

    setFile(mockData);
  }, [ipfsHash])

  return file
}
