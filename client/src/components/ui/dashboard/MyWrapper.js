import styled from "styled-components";

export const MyWrapper = styled.div`
  .slick-arrow {
    background-color: #4938ff;
    height: 30px;
    width: 30px;
    border-radius: 100px;
  }
  .slick-arrow:hover,
  .slick-arrow:active,
  .slick-arrow:focus {
    background-color: black !important;
  }

  .slide-arrow {
    position: absolute;
    top: 50%;
    margin-top: -15px;
  }

  .prev-arrow {
    left: -40px;
    width: 0;
    height: 0;
    border-left: 0 solid transparent;
    border-right: 15px solid #113463;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .next-arrow {
    right: -40px;
    width: 0;
    height: 0;
    border-right: 0 solid transparent;
    border-left: 15px solid #113463;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
`;
