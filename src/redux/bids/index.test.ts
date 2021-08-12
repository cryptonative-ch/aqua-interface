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
  InitialBidSuccessAction,
  InitialBidRequestAction,
  InitialBidFailureAction,
  UpdateBidRequestAction,
  UpdateBidSuccessAction,
  UpdateBidFailureAction,
  defaultState,
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
  describe('should handle INITIAL_BID_SUCCESS', () => {
    test('should handle empty return from subgraph', async () => {
      const emptyRequestFromSubgraph: InitialBidSuccessAction = {
        type: ActionTypes.INITIAL_BID_SUCCESS,
        payload: {},
      }
      expect(reducer(defaultState, emptyRequestFromSubgraph)).toEqual({
        isLoading: false,
        error: null,
        bidsBySaleId: {},
      })
    }),
      test('should handle data from subgraph after undefined', () => {
        const expectedActions: InitialBidSuccessAction = {
          type: ActionTypes.INITIAL_BID_SUCCESS,
          payload: {
            '0x141': {
              updatedAt: dayjs.utc().unix(),
              bids: [
                {
                  __typename: 'FixedPriceSaleCommitment',
                  id: '0x141/commitments/1',
                  status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                  amount: '150000000',
                  sale: {
                    __typename: 'FixedPriceSale',
                    id: '0x141',
                    tokenPrice: '10000000000000000000',
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
        expect(reducer(undefined, expectedActions)).toEqual({
          isLoading: false,
          error: null,
          bidsBySaleId: {
            '0x141': {
              updatedAt: dayjs.utc().unix(),
              bids: [
                {
                  __typename: 'FixedPriceSaleCommitment',
                  id: '0x141/commitments/1',
                  status: FixedPriceSaleCommitmentStatus.SUBMITTED,
                  amount: '150000000',
                  sale: {
                    __typename: 'FixedPriceSale',
                    id: '0x141',
                    tokenPrice: '10000000000000000000',
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
    const startAction: InitialBidRequestAction = {
      type: ActionTypes.INITIAL_BID_REQUEST,
      payload: true,
    }
    expect(reducer(undefined, startAction)).toEqual({
      bidsBySaleId: {},
      isLoading: true,
      error: null,
    })
  }),
    test('reducer should handle INITIAL_BID_FAILURE', () => {
      const startActions: InitialBidFailureAction = {
        type: ActionTypes.INITIAL_BID_FAILURE,
        payload: expect.any(Error),
      }
      expect(reducer(undefined, startActions)).toEqual({
        bidsBySaleId: {},
        error: expect.any(Error),
        isLoading: false,
      })
    })

  describe('should handle UPDATE_BID_SUCCESS', () => {
    test('should handle data from Blockchain after undefined', () => {
      const expectedActions: UpdateBidSuccessAction = {
        type: ActionTypes.UPDATE_BID_SUCCESS,
        payload: {
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
      }
      expect(reducer(undefined, expectedActions)).toEqual({
        isLoading: false,
        error: null,
        bidsBySaleId: {
          '0x141': {
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
      test('should handle data Update from Blockchain ', () => {
        const undefinedOfBid: BidsState = {
          isLoading: false,
          error: null,
          bidsBySaleId: {
            '0x141': {
              updatedAt: dayjs.utc().unix(),
              bids: [
                {
                  __typename: 'FixedPriceSaleCommitment',
                  id: '0x141/commitments/1',
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

        const dataupdated: UpdateBidSuccessAction = {
          type: ActionTypes.UPDATE_BID_SUCCESS,
          payload: {
            __typename: 'FixedPriceSaleCommitment',
            id: '0x141/commitments/2',
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
        }
        expect(reducer(undefinedOfBid, dataupdated)).toEqual({
          isLoading: false,
          error: null,
          bidsBySaleId: {
            '0x141': {
              updatedAt: dayjs.utc().unix(),
              bids: [
                {
                  __typename: 'FixedPriceSaleCommitment',
                  id: '0x141/commitments/1',
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
                  id: '0x141/commitments/2',
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
      const undefinedOfBid: BidsState = {
        isLoading: false,
        error: null,
        bidsBySaleId: {
          '0x141': {
            updatedAt: 1585654141,
            bids: [
              {
                __typename: 'FixedPriceSaleCommitment',
                id: '0x141/commitments/1',
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

      const dataupdated: UpdateBidSuccessAction = {
        type: ActionTypes.UPDATE_BID_SUCCESS,
        payload: {
          __typename: 'FixedPriceSaleCommitment',
          id: '0x141/commitments/1',
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
      }
      expect(reducer(undefinedOfBid, dataupdated)).toEqual({
        isLoading: false,
        error: null,
        bidsBySaleId: {
          '0x141': {
            updatedAt: 1585654141,
            bids: [
              {
                __typename: 'FixedPriceSaleCommitment',
                id: '0x141/commitments/1',
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
})
