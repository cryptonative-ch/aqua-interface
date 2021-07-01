// External
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'

// Svg
import ExternalLinkSVG from 'src/assets/svg/External-Link.svg'
import MessageSVG from 'src/assets/svg/Message.svg'
import GithubSVG from 'src/assets/svg/Github.svg'
import CloseImg from 'src/assets/svg/Close-white.svg'

//Internal
import {
  ModalWrapper,
  Header,
  FeedbackModal,
  CloseIcon,
  HeaderTitle,
  HeaderBrand,
  Content,
  FeedbackButton,
  FeedbackWrapper,
  FeedbackCard,
  Backdrop,
  FeedbackCardIcon,
  FeedbackCardRow,
  FeedbackCardTitle,
  FeedbackCardDescription,
  FeedbackCardTitleIcon,
} from 'src/components/FeedbackOverlay/style'

// Constants
import { FEEDBACK_FORM_URL, GITHUB_BUG_REPORT_URL } from 'src/constants'

interface FeedbackListItemProps {
  title: string
  description: string
  icon: string
  link: string
}

const FeedbackListCard: React.FC<FeedbackListItemProps> = ({ title, description, icon, link }) => (
  <FeedbackCard href={link} target="_blank">
    <FeedbackCardRow>
      <div>
        <FeedbackCardIcon src={icon} />
      </div>
      <div>
        <FeedbackCardTitle>
          {title} <FeedbackCardTitleIcon src={ExternalLinkSVG} />
        </FeedbackCardTitle>
        <FeedbackCardDescription>{description}</FeedbackCardDescription>
      </div>
    </FeedbackCardRow>
  </FeedbackCard>
)

export const FeedbackOverlay: React.FC = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const [t] = useTranslation()

  const overlay = (
    <FeedbackWrapper>
      <FeedbackButton onClick={() => setIsModalActive(!isModalActive)}>?</FeedbackButton>

      {isModalActive && (
        <>
          <Backdrop onClick={() => setIsModalActive(false)} />
          <ModalWrapper>
            <FeedbackModal>
              <Header>
                <HeaderBrand>
                  <strong>Aqua</strong> from DXdao
                </HeaderBrand>
                <HeaderTitle>{t('texts.haveFeedback')}</HeaderTitle>
                <CloseIcon src={CloseImg} onClick={() => setIsModalActive(false)} />
              </Header>
              <Content>
                <FeedbackListCard
                  title={t('buttons.sendFeedback')}
                  description={t('buttons.sendFeedbackDescription')}
                  icon={MessageSVG}
                  link={FEEDBACK_FORM_URL}
                />
                <FeedbackListCard
                  title={t('buttons.reportBug')}
                  description={t('buttons.reportBugDescription')}
                  icon={GithubSVG}
                  link={GITHUB_BUG_REPORT_URL}
                />
              </Content>
            </FeedbackModal>
          </ModalWrapper>
        </>
      )}
    </FeedbackWrapper>
  )

  return ReactDOM.createPortal(overlay, document.body)
}
