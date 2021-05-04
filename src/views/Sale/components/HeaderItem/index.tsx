// External
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { typography, TypographyProps } from 'styled-system'
import dayjs from 'dayjs'

// Components
import { Flex } from 'src/components/Flex'
import { Sale } from 'src/interfaces/Sale'
import { secondsTohms } from 'src/views/Sale/components/Timer'

// Mesa Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

type HeaderTitleProps = TypographyProps & {
  color: string
}

const HeaderTitle = styled.div<HeaderTitleProps>(
  props => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: props.color,
  }),
  typography
)

const HeaderDescription = styled.div<TypographyProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '29px',
    marginTop: '7px',
    fontFeatureSettings: 'ss01 on',
    color: '#000629',
  }),
  typography
)

const MobileHeaderDescription = styled.div<TypographyProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#000629',
    marginLeft: 'auto',
  }),
  typography
)

interface HeaderItemProps {
  title: string
  description: string
  color: string
  textAlign: string
  isMobile: boolean
  saleLive?: boolean
  sale?: Sale
  flexAmount?: number
}

export function HeaderItem({
  title,
  description,
  color,
  textAlign,
  isMobile,
  flexAmount,
  saleLive,
  sale,
}: HeaderItemProps) {
  // setting state to update the timer more frequently than the bids
  const [, setTime] = useState<number>(0)
  const [descriptionText, setDescriptionText] = useState<string>(description)

  // re-renders component every second
  useEffect(() => {
    if (saleLive && sale) {
      const interval = setInterval(() => {
        setTime(PrevTime => (PrevTime + 1) % 2)
        const localTimeStamp = dayjs(Date.now()).unix()
        const timeDiffEnd = Math.abs(localTimeStamp - convertUtcTimestampToLocal(sale.endDate))
        setDescriptionText(secondsTohms(timeDiffEnd))
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
    setDescriptionText(description)
  }, [description])

  return (
    <Flex
      flexDirection={isMobile ? 'row' : 'column'}
      alignItems={isMobile ? 'center' : 'unset'}
      marginRight={isMobile ? '0' : textAlign === 'right' ? '0' : flexAmount !== 1 ? '20px' : '30px'}
      marginBottom={isMobile ? '16px' : '0'}
      flex={flexAmount}
    >
      <HeaderTitle textAlign={textAlign === 'left' ? 'left' : 'right'} color={color}>
        {title}
      </HeaderTitle>
      {isMobile ? (
        <MobileHeaderDescription textAlign={textAlign === 'left' ? 'left' : 'right'}>
          {descriptionText}
        </MobileHeaderDescription>
      ) : (
        descriptionText.length > 0 && (
          <HeaderDescription textAlign={textAlign === 'left' ? 'left' : 'right'}>{descriptionText}</HeaderDescription>
        )
      )}
    </Flex>
  )
}

HeaderItem.defaultProps = {
  color: '#7B7F93',
  textAlign: 'left',
  isMobile: false,
  flexAmount: 1,
  saleLive: false,
}
