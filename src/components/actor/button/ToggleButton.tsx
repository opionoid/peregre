import React from 'react'
import { space } from 'src/assets/style'
import { IImage } from 'src/interfaces'
import styled from 'styled-components'
import { ButtonBase } from './ButtonBase'

export interface IToggleButtonProps {
  readonly defaultImage: IImage
  readonly defaultLabel: string
  readonly reversedImage: IImage
  readonly reversedLabel: string
  readonly isReversed?: boolean
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const ToggleButton: React.VFC<IToggleButtonProps> = ({
  defaultImage,
  defaultLabel,
  reversedImage,
  reversedLabel,
  isReversed = false,
  onClick,
}) => {
  return (
    <ToggleButtonWrapper isReversed={isReversed}>
      <ButtonBase onClick={onClick}>
        {isReversed ? (
          <Content>
            <Icon {...reversedImage} />
            <p>{reversedLabel}</p>
          </Content>
        ) : (
          <Content>
            <p>{defaultLabel}</p>
            <Icon {...defaultImage} />
          </Content>
        )}
      </ButtonBase>
    </ToggleButtonWrapper>
  )
}

const ToggleButtonWrapper = styled.div<IToggleButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 60px;
  transition: border-radius 0.3s ease-in-out;
  border-radius: ${(props) => (props.isReversed ? '12px' : '36px')};

  &:hover {
    border-radius: 24px;
    opacity: 0.98;
    transform: translateZ(1.8);
  }
` as any /** children関連でバグるのでいったん any で放置 */

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: ${space.xs};
`
const Icon = styled.img`
  width: 48px;
  height: 48px;
`
