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
  CommitmentsState,
  InitialCommitmentSuccessAction,
  InitialCommitmentRequestAction,
  InitialCommitmentFailureAction,
  UpdateCommitmentRequestAction,
  UpdateCommitmentSuccessAction,
  UpdateCommitmentFailureAction,
  defaultState,
} from 'src/redux/commitments'

// interface
import { FixedPriceSaleCommitmentStatus } from 'src/subgraph/__generated__/globalTypes'

// Extends dayjs
dayjs.extend(DayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
dayjs.extend(relativeTime)
dayjs.extend(durationTime)

describe('Commitment Reducer', () => {
  describe('should handle INITIAL_COMMITMENT_SUCCESS', () => {
    test('should handle empty return from subgraph', async () => {
      const emptyRequestFromSubgraph: InitialCommitmentSuccessAction = {
        type: ActionTypes.INITIAL_COMMITMENT_SUCCESS,
        payload: {},
      }
      expect(reducer(defaultState, emptyRequestFromSubgraph)).toEqual({
        isLoading: false,
        error: null,
        bidsBySaleId: {},
      })
    }),
      test('should handle data from subgraph after undefined', () => {
        const expectedActions: InitialCommitmentSuccessAction = {
          type: ActionTypes.INITIAL_COMMITMENT_SUCCESS,
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
  test('reducer should handle INITIAL_COMMITMENT_REQUEST', () => {
    const startAction: InitialCommitmentRequestAction = {
      type: ActionTypes.INITIAL_COMMITMENT_REQUEST,
      payload: true,
    }
    expect(reducer(undefined, startAction)).toEqual({
      bidsBySaleId: {},
      isLoading: true,
      error: null,
    })
  }),
    test('reducer should handle INITIAL_COMMITMENT_FAILURE', () => {
      const startActions: InitialCommitmentFailureAction = {
        type: ActionTypes.INITIAL_COMMITMENT_FAILURE,
        payload: expect.any(Error),
      }
      expect(reducer(undefined, startActions)).toEqual({
        bidsBySaleId: {},
        error: expect.any(Error),
        isLoading: false,
      })
    })

  describe('should handle UPDATE_COMMITMENT_SUCCESS', () => {
    test('should handle data from Blockchain after undefined', () => {
      const expectedActions: UpdateCommitmentSuccessAction = {
        type: ActionTypes.UPDATE_COMMITMENT_SUCCESS,
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
        const undefinedOfCommitment: CommitmentsState = {
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

        const dataupdated: UpdateCommitmentSuccessAction = {
          type: ActionTypes.UPDATE_COMMITMENT_SUCCESS,
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
        expect(reducer(undefinedOfCommitment, dataupdated)).toEqual({
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
      const undefinedOfCommitment: CommitmentsState = {
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

      const dataupdated: UpdateCommitmentSuccessAction = {
        type: ActionTypes.UPDATE_COMMITMENT_SUCCESS,
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
      expect(reducer(undefinedOfCommitment, dataupdated)).toEqual({
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
