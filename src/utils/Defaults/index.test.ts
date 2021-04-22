// Utils
import { formatDecimal, fromBigDecimalToBigInt, formatBigInt } from './index'

describe('tests the helper functions', () => {
  test('should convert bigdecimal string into BigInt string', () => {
    expect(fromBigDecimalToBigInt('1.234500000000000000')).toBe('1234500000000000000')
    expect(fromBigDecimalToBigInt('1.230000')).toBe('1230000')
    expect(fromBigDecimalToBigInt('1.23450000')).toBe('123450000')
    expect(fromBigDecimalToBigInt('19.9888877777')).toBe('199888877777')
    expect(fromBigDecimalToBigInt('1.23450000')).toBe('123450000')
  }),
    test('should convert BigDecimals into Bignumbers', () => {
      expect(formatDecimal('1.234500000000000000')).toMatchObject({ _hex: '0x1121d33597384000', _isBigNumber: true })
      expect(formatDecimal('19.9888877777')).toMatchObject({ _hex: '0x2e8a4e38d1', _isBigNumber: true })
    }),
    test('should convert from BigInt into number', () => {
      expect(formatBigInt('1234500000000000000')).toBe(1.2345)
      expect(formatBigInt('1230000', 6)).toBe(1.23)
    })
})
