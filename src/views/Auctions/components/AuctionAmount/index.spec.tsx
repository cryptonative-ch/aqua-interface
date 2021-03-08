import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionAmount } from './index'

// Interface
import { Auction } from 'src/interfaces/Auction'

//clean up

afterEach(cleanup)

// tests

const auction: Auction = {
  id: jest.fn(),
  startBlock: jest.fn(),
  endBlock: jest.fn(),
  tokenIcon: jest.fn(),
  tokenAddress: jest.fn(),
  tokenSymbol: jest.fn(),
  tokenAmount: 5000,
  tokenName: jest.fn(),
  bids: jest.fn(),
}

describe('Auction Amount tests', () => {
  test('should display correct Amount', () => {
    const { getByText } = render(<AuctionAmount auction={auction} />)
    expect(getByText('5,000')).toBeInTheDocument();
  })
})
