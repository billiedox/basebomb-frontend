import { Box, Flex, FlexProps } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { CopyButton } from '../../CopyButton'

interface CopyAddressProps extends FlexProps {
  account: string
}

const Wrapper = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-radius: 16px;
  position: relative;
`

const Address = styled.div`
  flex: 1;
  position: relative;
  padding-left: 16px;

  & > input {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.text};
    display: block;
    font-weight: 600;
    font-size: 16px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }
`

const CopyAddress: React.FC<CopyAddressProps> = ({ account, ...props }) => {
  const { t } = useTranslation()
  return (
    <Box position="relative" {...props}>
      <Wrapper>
        <Address title={account}>
          <input type="text" readOnly value={account} />
        </Address>
        <Flex margin="12px">
          <CopyButton width="24px" text={account} tooltipMessage={t('Copied')} tooltipTop={-40} />
        </Flex>
      </Wrapper>
    </Box>
  )
}

export default CopyAddress
