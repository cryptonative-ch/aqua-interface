// External
import React, { useState, useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import { typography, TypographyProps } from 'styled-system'
import dayjs from 'dayjs'

// Components
import { Flex } from 'src/components/Flex'
import { Sale } from 'src/interfaces/Sale'
import { secondsTohms } from 'src/views/Sale/components/Timer'
import { InfoTooltip } from 'src/components/InfoTooltip'

// Aqua Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

type HeaderTitleProps = TypographyProps & {
  color: string
}
type HeaderDescProps = TypographyProps & {
  error?: boolean
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

const HeaderDescription = styled.div<HeaderDescProps>(
  props => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '29px',
    marginTop: '7px',
    fontFeatureSettings: 'ss01 on',
    color: props.error ? '#E15F5F' : '#000629',
  }),
  typography
)

const MobileHeaderDescription = styled.div<HeaderDescProps>(
  props => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    color: props.error ? '#E15F5F' : '#000629',
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
  tooltip?: ReactNode
  error?: boolean
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
  tooltip,

  error = false,
}: HeaderItemProps) {
  // setting state to update the timer more frequently than the bids
  const [, setTime] = useState<number>(0)
  const [descriptionText, setDescriptionText] = useState<string>(description)

  const runTimer = () => {
    if (!saleLive || !sale) return

    setTime(PrevTime => (PrevTime + 1) % 2)
    const localTimeStamp = dayjs(Date.now()).unix()
    const timeDiffEnd = Math.abs(localTimeStamp - convertUtcTimestampToLocal(sale.endDate))
    setDescriptionText(secondsTohms(timeDiffEnd))
  }

  // re-renders component every second
  useEffect(() => {
    if (saleLive && sale) {
      runTimer()
      const interval = setInterval(runTimer, 1000)

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
        {title} {tooltip && <InfoTooltip>{tooltip}</InfoTooltip>}
      </HeaderTitle>
      {isMobile ? (
        <MobileHeaderDescription textAlign={textAlign === 'left' ? 'left' : 'right'} error={error}>
          {descriptionText}
        </MobileHeaderDescription>
      ) : (
        descriptionText.length > 0 && (
          <HeaderDescription error={error} textAlign={textAlign === 'left' ? 'left' : 'right'}>
            {descriptionText}
          </HeaderDescription>
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
