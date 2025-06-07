import React from "react";
import styled from "styled-components";
import { SoundUtils } from "@/lib/sound-utils";

interface StyledSwitchProps {
  isOn?: boolean;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
}

const StyledSwitch: React.FC<StyledSwitchProps> = ({
  isOn = false,
  disabled = false,
  label,
  onClick,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      // Play sound before state change
      SoundUtils.playMechanicalSwitch(!isOn);
      onClick();
    }
  };

  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          checked={isOn}
          disabled={disabled}
          onChange={handleClick}
        />
        <div className="slider">
          <div className="slider-btn">
            <div className="light" />
            <div className="texture" />
            <div className="texture" />
            <div className="texture" />
            <div className="light" />
          </div>
        </div>
      </label>
      {label && (
        <div className="label-container">
          <span className="label-text">{label}</span>
          <div className={`status-dot ${isOn ? "active" : ""}`} />
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .switch {
    width: 100px;
    height: 45px;
    display: block;
    position: relative;
  }

  .switch input {
    display: none;
  }

  .slider {
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgb(8, 8, 8);
    transition: all 0.4s cubic-bezier(0.99, 0.1, 0.1, 0.99);
    border-radius: 5px;
    box-shadow: inset 0px 0px 1px 0px rgba(0, 0, 0, 1),
      inset 90px 0px 50px -50px rgba(126, 4, 4, 0.56);
    border: 2px solid black;
  }

  .slider-btn {
    position: absolute;
    width: 39px;
    height: 39px;
    border-radius: 3px;
    left: 2px;
    top: 2px;
    background: linear-gradient(to bottom, #333333, #242323);
    border: 1px solid #2b2b2b;
    box-shadow: 0px 10px 5px 1px rgba(0, 0, 0, 0.15),
      inset 10px 0px 10px -5px rgba(126, 4, 4, 0.1);
    transition: all 0.4s cubic-bezier(0.99, 0.1, 0.1, 0.99);
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .texture {
    width: 2px;
    height: 70%;
    background-color: #202020ea;
    box-shadow: -0.7px -1.5px 1px 0px rgba(192, 192, 192, 0.3),
      0px 2px 3px rgb(0, 0, 0, 0.3);
    transition: 0.25s;
  }

  .light {
    width: 4px;
    height: 4px;
    border: 1px solid #222121;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.99, 0.1, 0.1, 0.99);
    background-color: rgb(230, 14, 14);
    box-shadow: 0px 0px 10px 1px rgb(241, 28, 28);
  }

  .switch input:checked + .slider {
    box-shadow: inset 0px 0px 1px 0px rgba(0, 0, 0, 1),
      inset -85px 0px 50px -50px rgba(1, 78, 4, 0.6);
  }

  .switch input:checked + .slider .slider-btn {
    transform: translateX(55px);
    box-shadow: 0px 10px 5px 1px rgba(0, 0, 0, 0.15),
      inset -10px 0px 10px -5px rgba(1, 112, 4, 0.1);
  }

  .switch input:checked + .slider .slider-btn .light {
    background-color: rgb(35, 158, 4);
    box-shadow: 0px 0px 10px 0px rgb(57, 230, 14);
  }

  .label-container {
    text-align: center;
    margin-top: 12px;
  }

  .label-text {
    font-size: 14px;
    font-weight: 500;
    color: #cbd5e1;
    display: block;
    margin-bottom: 4px;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 auto;
    transition: all 0.3s ease;
    background-color: #64748b;
  }

  .status-dot.active {
    background-color: #4ade80;
    box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
  }
`;

export default StyledSwitch;
