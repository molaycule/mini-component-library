import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";

import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const STYLES = {
  small: {
    "--fontSize": `${14 / 16}rem`,
    "--height": "24px",
    "--topPadding": "4px",
    "--bottomPadding": "4px",
    "--borderWidth": "1px"
  },
  large: {
    "--fontSize": `${18 / 16}rem`,
    "--height": "36px",
    "--topPadding": "8px",
    "--bottomPadding": "7px",
    "--borderWidth": "2px"
  }
};

const IconInput = ({ label, icon, width = 250, size, placeholder }) => {
  const iconSize = size === "small" ? 16 : size === "large" ? 24 : 0;

  if (!iconSize) throw new Error("Invalid size provided to IconInput");

  return (
    <Wrapper style={STYLES[size]}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <IconWrapper id={icon} size={iconSize} />
      <TextInput
        style={{ "--width": width + "px" }}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

const Wrapper = styled.label`
  position: relative;
  display: block;
  font-size: var(--fontSize);
  width: max-content;
  color: ${COLORS.gray700};

  &:hover {
    color: ${COLORS.black};
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: var(--borderWidth) solid ${COLORS.black};
  }
`;

const IconWrapper = styled(Icon)`
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  color: inherit;
`;

const TextInput = styled.input`
  width: var(--width);
  height: calc(var(--height) / 16)rem;
  color: inherit;
  border: none;
  padding-left: var(--height);
  padding-top: var(--topPadding);
  padding-bottom: var(--bottomPadding);
  font-size: inherit;
  font-weight: 700;
  line-height: 16px;

  &:focus {
    border-radius: 2px;
    outline: 2px solid currentColor;
    outline: 2px solid --webkit-focus-ring-color;
    outline-offset: 2px;
  }

  &::placeholder {
    color: ${COLORS.gray500};
    font-weight: 400;
  }
`;

export default IconInput;
