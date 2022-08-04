/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

const STYLES = {
  small: {
    "--height": "8px",
    "--padding": "0px"
  },
  medium: {
    "--height": "12px",
    "--padding": "0px"
  },
  large: {
    "--height": "24px",
    "--padding": "4px"
  }
};

const MAX_VALUE = 100;
const DOUBLE_FACTOR = 2;

const ProgressBar = ({ value, size }) => {
  const styles = STYLES[size];

  const clamp = (value, min = 0, max = 100) => {
    if (value < min) return 0;
    else if (value > max) return 100;
    return value;
  };

  if (!styles) {
    throw new Error(`Invalid size "${size}" provided to ProgressBar`);
  }

  return (
    <>
      <VisuallyHidden id="progressbarlabel">Progress indicator</VisuallyHidden>
      <ProgressBarWrapper
        role="progressbar"
        tabIndex="0"
        aria-labelledby="progressbarlabel"
        aria-valuenow={clamp(value)}
        style={styles}>
        <SVGWrapper>
          <defs>
            <clipPath id="round-corner">
              <BarMask />
            </clipPath>
          </defs>
          <BarContainer />
          <Bar percentage={clamp(value)} />
        </SVGWrapper>
      </ProgressBarWrapper>
    </>
  );
};

const ProgressBarWrapper = styled.span`
  display: block;
  line-height: 0;

  &:focus {
    outline: 2px solid ${COLORS.primary};
    border-radius: 4px;
    outline-offset: 4px;
  }
`;

const SVGWrapper = styled.svg`
  --width: 100%;
  --borderRadius: 4px;
  width: var(--width);
  height: var(--height);
  /* for optical equi-distance at the rounded corners, added it here because of the inner box shadow */
  border-radius: calc(var(--borderRadius) + var(--padding));
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  outline-offset: 4px;
`;

const BarContainer = styled.rect`
  width: var(--width);
  height: var(--height);
  rx: calc(var(--borderRadius) + var(--padding)); /* for optical equi-distance at the rounded corners */
  fill: ${COLORS.transparentGray15};
`;

const Bar = styled.rect`
  --maxWidth: calc(var(--width) - var(--padding) * ${DOUBLE_FACTOR});
  --inversePercentage: calc(${MAX_VALUE} - ${props => props.percentage});
  --inversePercentageMaxWidth: calc(
    var(--maxWidth) * var(--inversePercentage) / ${MAX_VALUE}
  );
  width: calc(var(--maxWidth) - var(--inversePercentageMaxWidth));
  height: calc(var(--height) - var(--padding) * ${DOUBLE_FACTOR});
  fill: ${COLORS.primary};
  x: var(--padding);
  y: var(--padding);
  clip-path: url(#round-corner);
`;

const BarMask = styled(Bar)`
  width: calc(var(--width) - var(--padding) * ${DOUBLE_FACTOR});
  rx: var(--borderRadius);
`;

export default ProgressBar;
