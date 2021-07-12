// External
import styled from 'styled-components'
import { space, SpaceProps, color, ColorProps } from 'styled-system'
import { Property } from 'csstype'

// Components
import { FlexProps, Flex } from 'src/components/Flex'

export type ColumnLabelProps = SpaceProps

export const ColumnLabel = styled.div<ColumnLabelProps>(
  props => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '140%',
    color: props.color || '#7B7F93',
    marginLeft: '8px',
  }),
  space
)

export const TokenPriceLabel = styled.div<ColorProps & SpaceProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    padding: '4px 8px',
    color: '#000629',
  }),
  color,
  space
)

export const InfoImg = styled.img({
  width: '14px',
  height: '14px',
  marginLeft: '4px',
})

type ModalContainerProps = {
  itemIndex: number
}

export const ModalContainer = styled.div<ModalContainerProps>(props => ({
  width: '147px',
  height: '90px',
  padding: '8px 16px',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  right: '24px',
  top: `${props.itemIndex * 50 + 58}px`,
  background: '#FFFFFF',
  boxShadow: '0px 4px 12px rgba(0, 6, 41, 0.1)',
  zIndex: 200,
}))

export const ModalMenu = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
  color: '#7B7F93',
  padding: '8px 0',
  cursor: 'pointer',
  ':hover': {
    color: '#304FFE',
  },
})

export type IconImgProps = SpaceProps & {
  isButton?: boolean
}

export const IconImg = styled.img<IconImgProps>(
  props => ({
    width: '16px',
    height: '16px',
    cursor: props.isButton ? 'pointer' : 'auto',
  }),
  space
)

export const HeaderColumn = styled(Flex)<FlexProps>(props => ({
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  flex: (props.flex as Property.Flex) || '3',
}))

export const TableRow = styled(Flex)({
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: '50px',
  borderTop: '1px dashed #DDDDE3',
  justifyContent: 'space-evenly',
})

export const TableColumn = styled(HeaderColumn)({})

export const TableContainer = styled(Flex)({
  maxHeight: '200px',
  flexDirection: 'column',
  position: 'relative',
})
export const TableHead = styled(Flex)({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '8px',
})

export const TableBody = styled(Flex)({
  flexDirection: 'column',
  minHeight: '50px',
})
