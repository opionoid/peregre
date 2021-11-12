import { Icons } from "src/assets/icons";
import { ISkill } from "src/interfaces";

export const SkillInfo: React.VFC<ISkill> = (props) => (
  <>
    <div style={{ display: 'flex', columnGap: '32px', alignItems: 'center' }}>
      <h3 style={{ minWidth: '25%' }}>{props.name}</h3>
      <p style={{ fontSize: '1.4rem', lineHeight: '1', margin: '0' }}>
        <img
          src={Icons.Depth}
          alt=""
          width={24}
          height={24}
          style={{ marginRight: '0.625rem' }}
        />
        {props.depth}
      </p>
    </div>
    <p>{props.description}</p>
  </>
)