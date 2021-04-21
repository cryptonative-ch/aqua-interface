// Externals

// Components
import { formatDecimal, fromBigDecimalToBigInt } from './index'

describe('tests the helper functions', () => {
  test('should convert bigdecimal string into BigInt string', () => {
    expect(fromBigDecimalToBigInt('1.2345e+18')).toBe('1234500000000000000')
    expect(fromBigDecimalToBigInt('1.23e+6')).toBe('1230000')
    expect(fromBigDecimalToBigInt('1.2345e+4')).toBe('12345')
  }),
    test('should convert BigDecimals into Bignumbers', () => {
      expect(formatDecimal('1.2345e+18')).toMatchObject({ _hex: '0x1121d33597384000', _isBigNumber: true })
      expect(formatDecimal('1.23e+6')).toMatchObject({ _hex: '0x12c4b0', _isBigNumber: true })
      expect(formatDecimal('1.2345e+4')).toMatchObject({ _hex: '0x3039', _isBigNumber: true })
    })
})
