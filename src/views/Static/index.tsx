// External
import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import styled from 'styled-components'

// Hooks
// import { useElementWidth } from 'src/hooks/useElementWidth'
import { useWindowSize } from 'src/hooks/useWindowSize'
import { useMountEffect } from 'src/hooks/useMountEffect'

// Actions
import { setPageTitle } from 'src/redux/page'

// Components
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { BackButton } from 'src/components/BackButton'
import { StaticHeader } from '../Static/components/StaticHeader'
import { StaticContent } from '../Static/components/StaticContent'
import { Container } from 'src/components/Container'
import { CardBody } from 'src/components/CardBody'
import { MobileFooter } from 'src/components/MobileFooter'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'

import { HeaderItem } from '../Sale/components/HeaderItem'

interface StaticViewParams {
  staticId: string
}

export function StaticView() {
  const { isMobile } = useWindowSize()
  // const ref = useRef<HTMLElement>()
  // const { width: containerWidth, setWidth } = useElementWidth(ref)

  const params = useParams<StaticViewParams>()
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const theme = useTheme()

  useMountEffect(() => {
    dispatch(setPageTitle(t('pagesTitles.about')))
  })

  if (!params.staticId) {
    // return <NotFoundView />
  }

  return (
    <Container minHeight="100%" inner={false} noPadding={true}>
      <Header />
      <Container noPadding>
        {!isMobile && <BackButton />}
        <StaticHeader />
        <Flex flexDirection="row" justifyContent="space-between">
          <Flex flexDirection="column" flex={1}>
            <Card border="none" marginX={isMobile ? '8px' : '0'}>
              <StaticContent />
            </Card>
          </Flex>
          <Flex flexDirection="column" width="377px" marginLeft="24px">
            <Card border="none">
              <CardBody display="flex" borderBottom="1px dashed #DDDDE3" padding={theme.space[4]}>
                <Flex flexDirection="row" alignItems="center" flex={1}>
                  <HeaderItem title="Side Content" description="" color="#000629" />
                </Flex>
              </CardBody>
              <CardBody display="flex" padding={theme.space[4]}></CardBody>
            </Card>
          </Flex>
        </Flex>
      </Container>
      {!isMobile && <Footer />}
      {isMobile && <MobileFooter />}
    </Container>
  )
}
