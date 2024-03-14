import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonColor, ButtonSize, ButtonIconStyle } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({
  size,
  color,
  iconSrc,
  iconStyle,
  children,
}) => (
  <div style={{ padding: 10 }}>
    <Button color={color} size={size} iconSrc={iconSrc} iconStyle={iconStyle}>
      {children}
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  children: "Button CTA",
  iconSrc: "http://localhost:3000/icons/alert-circle.svg",
  iconStyle: ButtonIconStyle.none,
};
Default.parameters = {
  viewMode: "docs",
};
