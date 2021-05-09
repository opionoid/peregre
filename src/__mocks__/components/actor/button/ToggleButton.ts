import { IToggleButtonProps } from 'src/components/actor/button/ToggleButton'
import { Icons } from 'src/assets/icons'

const MOCK_TOGGLE_BUTTON_PROPS: IToggleButtonProps = {
  defaultImage: {
    src: Icons.Hidden,
    alt: 'でふぉ',
  },
  defaultLabel: 'ON',
  reversedImage: {
    src: Icons.Enlightenment,
    alt: 'ひっくり返ってる',
  },
  reversedLabel: 'OFF',
}

export default MOCK_TOGGLE_BUTTON_PROPS
