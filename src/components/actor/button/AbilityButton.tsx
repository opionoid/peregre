import React from 'react'
import styled from 'styled-components'
import { ButtonBase } from './ButtonBase'

export interface IAbilityButtonProps {
  isEditMode?: boolean;
}

export const AbilityButton: React.VFC<IAbilityButtonProps> = ({ isEditMode }) => {
 // const [ability, setAbility] = React.useState(null)
  const handleClick = () => {
    console.log('AbilityButton handleClick is rendered');
    if (isEditMode) return
  }

  return (
    <AbilityButtonWrapper>
      <ButtonBase onClick={handleClick}>{isEditMode ? 'アビリティセット' : 'アビリティ使用'}</ButtonBase>
    </AbilityButtonWrapper>
  )
}

const AbilityButtonWrapper = styled.div`
  width: 160px;
  height: 120px;
`
