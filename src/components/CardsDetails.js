// import React, { useEffect } from "react";
// import { Table } from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import {useParams} from "react-router-dom";
// import { useSelector } from "react-redux";

// const CardsDetails = () => {


//     const getData = useSelector((state) => state.cartreducer.carts);
//     console.log(getData, 'gchsc');

//     const {id} = useParams();
//     console.log(id,'gyguy');

//     const compare = ()=>{
//         let compareData = getData.filter((e)=>{
//             return e.id == id
//             console.log(compareData);
//         });
//     }

//     useEffect(()=>{
//         compare();
//     },[id])

//   return (
//     <>
//       <div className="container mt-2">
//         <h2 className="text-center">Items Details Page</h2>
//         <section className="container mt-3">
//           <div className="iteamsdetails">
//             <div className="items_img">
//               <img
//                 src="https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp"
//                 alt=""
//               />
//             </div>
//             <div className="details">
//               <Table>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <p><strong>Restaurant</strong>: Massala Theoryy</p>
//                       <p><strong>Price</strong>: ₹ 350</p>
//                       <p><strong>Dishes</strong>: North Indian, Biryani, Mughlai</p>
//                       <p><strong>Total</strong>: ₹ 350</p>
//                     </td>
//                     <td>
//                       <p><strong>Rating :</strong><span style={{ background: "green", color: "#fff", padding: "2px", borderRadius: "5px" }}>3.5 ★</span></p>
//                       <p><strong>Order Review :</strong><span>1175+ order placed from here recently</span></p>
//                       <p><strong>Remove :</strong><span><FontAwesomeIcon icon={faTrash} style={{color:"red",fontSize:20,cursor:"pointer"}} /></span></p>
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default CardsDetails;


import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DLT, ADD, REMOVE } from "../redux/actions/Action";


const CardsDetails = () => {
  const { id } = useParams();
  const getData = useSelector((state) => state.cartreducer.carts);

  const [itemDetails, setItemDetails] = useState([]);

  const dispatch = useDispatch();

  ///////////////////add more items/////////////////////
  const send =(e)=>{
    console.log(e, 'ghdhchd');
    dispatch(ADD(e))
  }

  const dlt = (id) => {
    dispatch(DLT(id))
    navigate("/")
}

// remove one//////////
const remove = (item)=>{
    dispatch(REMOVE(item))
  }

const navigate = useNavigate();

  useEffect(() => {
    const compare = () => {
      const compareData = getData.filter((item) => item.id === parseInt(id));
      setItemDetails(compareData);
    };
    compare();
  }, [id, getData]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        <section className="container mt-3">
          <div className="iteamsdetails">
            {itemDetails.length ? (
              itemDetails.map((item) => (
                <>
                  <div className="items_img" key={item.id}>
                    <img
                      src={item.imgdata}
                      alt={item.rname}
                    />
                  </div>
                  <div className="details">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <p><strong>Restaurant</strong>: {item.rname}</p>
                            <p><strong>Price</strong>: ₹ {item.price}</p>
                            <p><strong>Dishes</strong>: {item.dishes}</p>
                            <p><strong>Total</strong>: ₹ {item.price * item.qnty}</p>
                            <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                    <span style={{fontSize:24}} onClick={item.qnty <=1 ? ()=>dlt(item.id) : ()=>remove(item)}>-</span>
                    <span style={{fontSize:22}}>{item.qnty}</span>
                    <span style={{fontSize:24}} onClick={()=>send(item)}>+</span>

                    </div>

                          </td>
                          <td>
                            <p><strong>Rating :</strong><span style={{ background: "green", color: "#fff", padding: "2px", borderRadius: "5px" }}>{item.rating} ★</span></p>
                            <p><strong>Order Review :</strong><span>{item.somedata} order placed from here recently</span></p>
                            <p ><strong>Remove :</strong><span><FontAwesomeIcon icon={faTrash} style={{ color: "red", fontSize: 20, cursor: "pointer" }}onClick={()=>dlt(item.id)} /></span></p>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </>
              ))
            ) : (
              <p>No item details found</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;


