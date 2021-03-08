import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Components
import { AuctionClock } from './index'

// Interface
import { Auction } from 'src/interfaces/Auction'

//clean up

afterEach(cleanup)

// tests

  

describe('Testing Auction Clock', () => {
    test('should display Timeframe when auction is upcoming', () => {
        const auction: Auction = {
            id: jest.fn(),
            startBlock: 1646500442,
            endBlock: 1678036442,
            tokenIcon: jest.fn(),
            tokenAddress: jest.fn(),
            tokenSymbol: jest.fn(),
            tokenAmount:  jest.fn(),
            tokenName: jest.fn(),
            bids: jest.fn(),
          }
        const {getByText} = render(<AuctionClock auction={auction}/>)
        expect(getByText('Timeframe')).toBeInTheDocument();
    }),
    test('should display closed when auction is Closed', () => {
        const auction: Auction = {
            id: jest.fn(),
            startBlock: 1520270042,
            endBlock: 1551806042,
            tokenIcon: jest.fn(),
            tokenAddress: jest.fn(),
            tokenSymbol: jest.fn(),
            tokenAmount:  jest.fn(),
            tokenName: jest.fn(),
            bids: jest.fn(),
          }
        const {getByText} = render(<AuctionClock auction={auction}/>)
        expect(getByText('Closed')).toBeInTheDocument();
    })
    ,
    test('should display Time remaining when auction is open', () => {
        const auction: Auction = {
            id: jest.fn(),
            startBlock: 1551806042,
            endBlock: 1646500442,
            tokenIcon: jest.fn(),
            tokenAddress: jest.fn(),
            tokenSymbol: jest.fn(),
            tokenAmount:  jest.fn(),
            tokenName: jest.fn(),
            bids: jest.fn(),
          }
        const {getByText} = render(<AuctionClock auction={auction}/>)
        expect(getByText('Time Remaining')).toBeInTheDocument();
    })
    
    
    
})
