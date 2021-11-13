import styled from 'styled-components'
import { color, space } from 'src/assets/style'
import { Icons } from "src/assets/icons";
import { ISkill } from "src/interfaces";

export const SkillInfo: React.VFC<{currentSkill: ISkill}> = ({ currentSkill }) => (
  <InfoArea>
    <div style={{ display: 'flex', columnGap: '32px', alignItems: 'center' }}>
      <h3 style={{ minWidth: '25%' }}>{currentSkill.name}</h3>
      <p style={{ fontSize: '1.4rem', lineHeight: '1', margin: '0' }}>
        <img
          src={Icons.Depth}
          alt=""
          width={24}
          height={24}
          style={{ marginRight: '0.625rem' }}
        />
        {currentSkill.depth}
      </p>
    </div>
    <p>{currentSkill.description}</p>
  </InfoArea>
)

const InfoArea = styled.div`
  margin-top: ${space.s};
  padding: calc(0.8rem + 1.2vmin) calc(1.2rem + 2.6vmin) calc(1rem + 2.4vmin)
    calc(1.2rem + 2.6vmin);
  border-radius: 1.5em;
  color: ${color.fontInHighContrast};
  background-color: ${color.backgroundHighContrast};
  min-height: 80px;
`