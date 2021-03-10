import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionAmount } from './index'



// defaults
import { getAuctionDefault } from "src/utils/Defaults";

//clean up

afterEach(cleanup)

// tests

const auction = getAuctionDefault({tokenAmount: 5000})

describe('AuctionAmount tests', () => {
  test('should display correct Amount', () => {
    const { getByText } = render(<AuctionAmount auction={auction} />)
    expect(getByText('5,000')).toBeInTheDocument();
  })
})
