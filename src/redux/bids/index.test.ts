// Redux components
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationTime from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'

//redux
import {
  ActionTypes,
  reducer,
  BidsState,
  initialBidSuccessAction,
  initialBidRequestAction,
  initialBidFailureAction,
} from 'src/redux/bids'

// interface
import { FixedPriceSaleCommitmentStatus } from 'src/subgraph/__generated__/globalTypes'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

describe('Bid Reducer', () => {
  const initialState: BidsState = {
    bidsBySaleId: {},
    error: null,
    isLoading: false,
  }
  describe('should handle INITIAL_BID_SUCCESS', () => {
    test('should handle empty return from subgraph', async () => {
      const emptyRequestFromSubgraph: initialBidSuccessAction = {
        payload: { isLoading: false, error: null, bidsBySaleId: {} },
      }
      expect(reducer(initialState, emptyRequestFromSubgraph)).toEqual(initialState)
    }),
      test('should handle data from subgraph after initialState', async () => {
        const expectedActions: initialBidSuccessAction = {
          payload: {
            bidsBySaleId: {
              ['ABC']: {
                updatedAt: dayjs.utc().unix(),
                bids: [
                  {
                    __typename: 'FixedPriceSaleCommitment',
                    id: '0x141',
                    status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                    amount: '150000000',
                    sale: {
                      __typename: 'FixedPriceSale',
                      id: '0x141',
                      tokenPrice: '14342343242',
                    },
                    user: {
                      __typename: 'FixedPriceSaleUser',
                      address: '362873668463264',
                    },
                  },
                ],
              },
            },
          },
        }
        expect(reducer(initialState, expectedActions)).toEqual({
          isLoading: false,
          error: null,
          bidsBySaleId: {
            ['ABC']: {
              updatedAt: dayjs.utc().unix(),
              bids: [
                {
                  __typename: 'FixedPriceSaleCommitment',
                  id: '0x141',
                  status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                  amount: '150000000',
                  sale: {
                    __typename: 'FixedPriceSale',
                    id: '0x141',
                    tokenPrice: '14342343242',
                  },
                  user: {
                    __typename: 'FixedPriceSaleUser',
                    address: '362873668463264',
                  },
                },
              ],
            },
          },
        })
      }),
      test('should handle data update from subgraph ', () => {
        const initialStateOfBid: BidsState = {
          isLoading: false,
          error: null,
          bidsBySaleId: {
            ['ABC']: {
              updatedAt: dayjs.utc().unix(),
              bids: [
                {
                  __typename: 'FixedPriceSaleCommitment',
                  id: '0x142',
                  status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                  amount: '150000000',
                  sale: {
                    __typename: 'FixedPriceSale',
                    id: '0x141',
                    tokenPrice: '14342343242',
                  },
                  user: {
                    __typename: 'FixedPriceSaleUser',
                    address: '362873668463264',
                  },
                },
              ],
            },
          },
        }

        const dataUpdated: initialBidSuccessAction = {
          payload: {
            bidsBySaleId: {
              ['ABC']: {
                updatedAt: dayjs.utc().unix(),
                bids: [
                  {
                    __typename: 'FixedPriceSaleCommitment',
                    id: '0x142',
                    status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                    amount: '150000000',
                    sale: {
                      __typename: 'FixedPriceSale',
                      id: '0x141',
                      tokenPrice: '14342343242',
                    },
                    user: {
                      __typename: 'FixedPriceSaleUser',
                      address: '362873668463264',
                    },
                  },
                ],
              },
            },
          },
        }
        expect(reducer(initialStateOfBid, dataUpdated)).toEqual({
          isLoading: false,
          error: null,
          bidsBySaleId: {
            ['ABC']: {
              updatedAt: dayjs.utc().unix(),
              bids: [
                {
                  __typename: 'FixedPriceSaleCommitment',
                  id: '0x141',
                  status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                  amount: '150000000',
                  sale: {
                    __typename: 'FixedPriceSale',
                    id: '0x141',
                    tokenPrice: '14342343242',
                  },
                  user: {
                    __typename: 'FixedPriceSaleUser',
                    address: '362873668463264',
                  },
                },

                {
                  __typename: 'FixedPriceSaleCommitment',
                  id: '0x142',
                  status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                  amount: '150000000',
                  sale: {
                    __typename: 'FixedPriceSale',
                    id: '0x141',
                    tokenPrice: '14342343242',
                  },
                  user: {
                    __typename: 'FixedPriceSaleUser',
                    address: '362873668463264',
                  },
                },
              ],
            },
          },
        })
      })

    test('should handle data duplication', () => {
      const initialStateOfBid: BidsState = {
        isLoading: false,
        error: null,
        bidsBySaleId: {
          ['ABC']: {
            updatedAt: 1585654141,
            bids: [
              {
                __typename: 'FixedPriceSaleCommitment',
                id: '0x142',
                status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                amount: '150000000',
                sale: {
                  __typename: 'FixedPriceSale',
                  id: '0x141',
                  tokenPrice: '14342343242',
                },
                user: {
                  __typename: 'FixedPriceSaleUser',
                  address: '362873668463264',
                },
              },
            ],
          },
        },
      }

      const dataUpdated: initialBidSuccessAction = {
        payload: {
          bidsBySaleId: {
            ['ABC']: {
              updatedAt: dayjs.utc().unix(),
              bids: [
                {
                  __typename: 'FixedPriceSaleCommitment',
                  id: '0x141',
                  status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                  amount: '150000000',
                  sale: {
                    __typename: 'FixedPriceSale',
                    id: '0x141',
                    tokenPrice: '14342343242',
                  },
                  user: {
                    __typename: 'FixedPriceSaleUser',
                    address: '362873668463264',
                  },
                },
              ],
            },
          },
        },
      }
      expect(reducer(initialStateOfBid, dataUpdated)).toEqual({
        isLoading: false,
        error: null,
        bidsBySaleId: {
          ['ABC']: {
            updatedAt: 1585654141,
            bids: [
              {
                __typename: 'FixedPriceSaleCommitment',
                id: '0x141',
                status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                amount: '150000000',
                sale: {
                  __typename: 'FixedPriceSale',
                  id: '0x141',
                  tokenPrice: '14342343242',
                },
                user: {
                  __typename: 'FixedPriceSaleUser',
                  address: '362873668463264',
                },
              },
            ],
          },
        },
      })
    })
  })
  test('reducer should handle INITIAL_BID_REQUEST', () => {
    const startAction: initialBidRequestAction = {
      type: ActionTypes.INITIAL_BID_REQUEST,
      payload: true,
    }
    expect(reducer(initialState, startAction)).toEqual({
      bidsBySaleId: {},
      isLoading: true,
      error: null,
    })
  }),
    test('reducer should handle INITIAL_BID_FAILURE', () => {
      const startActions: initialBidFailureAction = {
        type: ActionTypes.INITIAL_BID_FAILURE,
        payload: expect.any(Error),
      }
      expect(reducer(initialState, startActions)).toEqual({
        bidsBySaleId: {},
        error: expect.any(Error),
        isLoading: false,
      })
    })
})
