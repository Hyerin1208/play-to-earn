import { ButtonStyle } from "./styles/ButtonStyle";

export const Button = ({ onClick }) => {
  return <ButtonStyle onClick={onClick}>Restart</ButtonStyle>;
};

export const Sutton = ({ onClick }) => {
  return <ButtonStyle onClick={onClick}>점수등록</ButtonStyle>;
};

export const Vutton = ({ onClick }) => {
  return <ButtonStyle onClick={onClick}>점수갱신</ButtonStyle>;
};
