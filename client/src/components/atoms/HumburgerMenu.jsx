import styled from "styled-components";

const StyledBurger = styled.div`
  width: 24px;
  height: 15px;
  cursor: pointer;
  position: relative;

  div {
    width: 24px;
    height: 3px;
    background-color: white;
    border-radius: 10px;
    transform-origin: 12px;
    transition: all 0.3s linear;
    position: absolute;

    &:nth-child(1) {
      top: 0;
      transform: ${(props) =>
        props.$isOpen ? "translateY(6px)" : "translateY(0)"};
      opacity: ${(props) => (props.$isOpen ? 0 : 1)};
    }

    &:nth-child(2) {
      top: 6px;
      transform: ${(props) => (props.$isOpen ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(3) {
      top: 6px;
      transform: ${(props) => (props.$isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }

    &:nth-child(4) {
      bottom: 0;
      transform: ${(props) =>
        props.$isOpen ? "translateY(-6px)" : "translateY(0)"};
      opacity: ${(props) => (props.$isOpen ? 0 : 1)};
    }
  }
`;

const HumburgerMenu = ({ isOpen }) => {
  return (
    <StyledBurger $isOpen={isOpen}>
      <div />
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default HumburgerMenu;
