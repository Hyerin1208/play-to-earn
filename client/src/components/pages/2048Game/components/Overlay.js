import { Button } from "./Button";
import { OverlayStyle } from "./styles/OverlayStyle";

export const Overlay = ({ handleReset, score }) => {
 return (
  <OverlayStyle>
   <h1>Game Over!</h1>
   <p>
    Score: <span>{score}</span>
   </p>
   <Button onClick={handleReset} />
  </OverlayStyle>
 );
};
