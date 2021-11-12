import { IAbility } from "src/interfaces";

export const AbilityInfo: React.VFC<IAbility> = (props) => (
  <>
    <h3>{props.name}</h3>
    <p>{props.description}</p>
  </>
)