import React from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
const Contact = () => {
    const CreateNameTokenContract = useSelector((state) => state.LoadContracts.CreateNameTokenContract);
    const BscsimpletokenContract = useSelector((state) => state.LoadContracts.BscsimpletokenContract);
    console.log(CreateNameTokenContract);
    console.log(BscsimpletokenContract);

    return <div></div>;
};

export default Contact;
