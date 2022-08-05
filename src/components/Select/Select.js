import React, { useRef, useMemo, useEffect, useCallback } from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import Icon from "../Icon";
import { getDisplayedValue } from "./Select.helpers";

const ICON_SIZE = "24px";

const Select = ({ label, value, onChange, children }) => {
  const displayedValue = useMemo(() => getDisplayedValue(value, children), [
    children,
    value
  ]);
  const selectWrapperRef = useRef();
  const helperElementRef = useRef();

  const initResize = useCallback(() => {
    if (!helperElementRef.current) return;
    helperElementRef.current.innerHTML = displayedValue;
    resize(helperElementRef.current.offsetWidth);
  }, [displayedValue]);

  const resize = width => {
    selectWrapperRef.current.style.setProperty("--select-width", `${width}px`);
  };

  useEffect(() => {
    initResize();
  }, [initResize]);

  return (
    <Wrapper>
      <SelectWrapper
        value={value}
        onChange={onChange}
        ref={selectWrapperRef}
        aria-label={label}>
        {children}
      </SelectWrapper>
      <IconWrapper
        id="chevron-down"
        size={ICON_SIZE.replace("px", "")}
        strokeWidth="2"
      />
      <Helper ref={helperElementRef} aria-hidden="true"></Helper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  color: ${COLORS.gray700};

  &:hover {
    color: ${COLORS.black};
  }
`;

const SelectWrapper = styled.select`
  --iconDistance: 24px;
  box-sizing: content-box;
  width: var(--select-width);
  display: inline-block;
  padding: 12px 16px;
  padding-right: calc(16px + var(--iconDistance) + ${ICON_SIZE});
  background-color: ${COLORS.transparentGray15};
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  line-height: 1;
  color: inherit;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const IconWrapper = styled(Icon)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px; // should have been 16px but the svg box has an inner padding for the polyline
  margin: auto;
  pointer-events: none;
  color: inherit;
`;

const Helper = styled.span`
  position: absolute;
  top: 0;
  left: -9999px;
`;

export default Select;
