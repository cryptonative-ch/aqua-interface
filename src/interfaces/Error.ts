export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}
