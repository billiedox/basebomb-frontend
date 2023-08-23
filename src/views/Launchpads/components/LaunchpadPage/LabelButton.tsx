import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Button, Text } from '@pancakeswap/uikit'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  label?: string
  buttonLabel: string
  disabled?: boolean
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px;
  border-radius: 100px;
  border-color: ${({ theme }) => theme.colors.cardBorder};
  padding-left: 16px;
`

const LabelButton: React.FC<Props> = ({ value, label, buttonLabel, onClick, disabled = false }) => {
  return (
    <div>
      {label && (
        <Text fontSize="14px" color="textSubtle">
          {label}
        </Text>
      )}
      <ButtonWrapper>
        <Text bold fontSize="20px">
          {value}
        </Text>
        <Button onClick={onClick} disabled={disabled} variant={!disabled ? "primary" : "none"}>
          {buttonLabel}
        </Button>
      </ButtonWrapper>
    </div>
  )
}

export default LabelButton
