import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Card";
import Cardsdata from "./CardsData";
import "./style.css";
import {useDispatch} from "react-redux"
import { ADD } from "../redux/actions/Action";
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  console.log(data);

  const dispatch = useDispatch();

  const send =(e)=>{
    console.log(e, 'ghdhchd');
    dispatch(ADD(e))
    toast.success("Item added successfully!");

  }

  return (
    <div className="container mt-3">
      <h2>Add to Cart Projects</h2>

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => {
          return (
            <>
              <Card
                style={{ width: "18rem", border: "none" }}
                className="mx-2 mt-4 card_style"
              >
                <Card.Img
                  variant="top"
                  src={element.imgdata}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text>Price: ₹ {element.price}</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button variant="primary" className="col-lg-12" onClick={()=> send(element)}>
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
      <ToastContainer
        position="top-center"
        
      />    </div>
  );
};

export default Cards;
