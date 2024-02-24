import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function AllOrders(){

    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    

    async function getAllOrders(id){
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + id)
        setOrders(data)
        setIsLoading(false)
    }
    

    useEffect(()=>{
        const {id} = jwtDecode(localStorage.getItem('token'));
        getAllOrders(id)
    },[])

    return (
        <>
            {isLoading ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                <i className='fas fa-spin fa-spinner fa-2x'></i>
            </div>
            :
            <>
            {orders.map((order) => {
            return <div key={order.id} className="row">
                    <div className="order shadow rounded p-4 my-5">
                        <div className="d-flex align-items-center">
                            <h2 className='fw-bolder h1'>#{order.id}</h2>
                            <h4 className='fw-bold text-primary mx-4'>Processing</h4> 
                        </div>
                    <p>You have ordered {order.cartItems.length} items.</p> 
                    <div className="d-flex">
                        {order.cartItems.map((item) => {
                        return <img key={item._id} src={item.product.imageCover} style={{ width: 150 }} className="img-thumbnail" />
                        })} 
                        </div>
                            <hr />
                            <p><strong>Total amount: </strong> {order.totalOrderPrice} EGP</p>
                        </div>
                    </div>})
            }
            </>
            } 
        
        
        </>
    )
    }