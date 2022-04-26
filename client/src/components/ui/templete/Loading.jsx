import React from "react";
import FadeIn from "react-fade-in";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div>
      <FadeIn height={600}>
        <ReactLoading type={"bars"} color={"white"} />
      </FadeIn>
    </div>
  );
};

export default Loading;
