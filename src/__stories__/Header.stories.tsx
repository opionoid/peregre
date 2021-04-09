import { Story, Meta } from '@storybook/react';

import { Header, HeaderProps } from '~/components/common/Header';

export default {
  title: 'Example/Header',
  component: Header,
  decorators: [(Story) => <div style={{ padding: '32px', backgroundColor: '#fef8e7' }}><Story/></div>]
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
