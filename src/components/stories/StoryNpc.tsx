
import React from 'react'
import { useToggle } from 'react-use'
import { Icons } from 'src/assets/icons'
import { space } from 'src/assets/style'
import { ISkill } from 'src/interfaces'
import { useBattle } from 'src/utils/hooks/useBattle'
import styled from 'styled-components'
import { ButtonBase } from '../actor/button/ButtonBase'

export interface IStoryNpcProps {
  name: string
  hp: number
  skills: Omit<ISkill, 'icon'>[]
}

export const StoryNpc: React.VFC<IStoryNpcProps> = (props) => {
  const [shouldShowSkills, toggleShown] = useToggle(false)

  const { onClickSkill } = useBattle()
  const [depth, setDepth] = React.useState<0 | 1 | 2 | 3 | 4>(2)
  const handleClick = (skill: ISkill) => onClickSkill(skill, setDepth, props.name)

  return (
    <StoryNpcWrapper>
      <Info>
        <h4>{props.name}</h4>
        <Status>
          <label aria-label="魂魄量"><Icon src={Icons.MaxHp} /></label>
          <HpInput />
        </Status>
        <Status>
          <label aria-label="魂魄量"><Icon src={Icons.MaxDepth} /></label>
          <span>{depth}</span>
        </Status>
        <ToggleButton>
          <ButtonBase aria-controls="skills" onClick={() => toggleShown()}>{shouldShowSkills ? 'スキル非表示' : 'スキル表示'}</ButtonBase>
        </ToggleButton>
      </Info>
      <div id="skills" aria-hidden={!shouldShowSkills}>
        {props.skills.map(skill => (
          <Skill>
            <SkillRow>
              <SkillName>{skill.name}</SkillName>
              <SkillDepth><Icon src={Icons.MaxDepth} />{skill.depth}</SkillDepth>
            </SkillRow>
            <SkillDescription>{skill.description}</SkillDescription>
            <SkillButton>
              <ButtonBase onClick={() => handleClick({ ...skill, icon: { src: '' } })}>使用</ButtonBase>
            </SkillButton>
          </Skill>
        ))}
      </div>
    </StoryNpcWrapper>
  )
}

const StoryNpcWrapper = styled.div``
const Info = styled.div`
display: flex;
align-items: center;
height: fit-content;
flex-wrap: wrap;
& > *:not(:last-child) {
  margin-right: ${space.s};
}
`
const Status = styled.div`
display: flex;
align-items: center;
`
const Icon = styled.img`
width: 1.6rem;
margin-right: ${space.xxs};
`
const HpInput = styled.input``
const ToggleButton = styled.div`
width: 10rem;
height: 1.2rem;
`
const Skill = styled.div`
display: flex;
align-items: center;
flex-wrap: wrap;
& > * {
  margin-top: ${space.s};
}
`
const SkillRow = styled.div`
display: flex;
align-items: center;
min-width: 14rem;
flex-shrink: 0;
`
const SkillName = styled.div`
margin-right: ${space.xs};
`
const SkillDepth = styled.div`
display: flex;
flex-shrink: 0;
`
const SkillDescription = styled.p`
margin: ${space.s};
margin-bottom: 0;
`
const SkillButton = styled.div`
width: 8rem;
flex-shrink: 0;
`