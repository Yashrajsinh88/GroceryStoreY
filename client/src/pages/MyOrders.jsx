import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../assets/assets'

const MyOrders = () => {

    const [myorders, setMyOrders] = useState([])
    const {currency, axios, user} = useAppContext()

    const fetchMyOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/user')
            if(data.success){
                setMyOrders(data.orders)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(user){ 
            fetchMyOrders()
        }
    }, [user])

    return (
        <div className="mt-16 pb-16 px-4">

           <h2 className="text-2xl font-semibold mb-2 uppercase">My Orders</h2>
<div className="w-16 h-0.5 bg-primary rounded-full mb-6"></div>


            {myorders.map((order, index) => (
                <div
                    key={index}
                    className="border border-gray-300 rounded-2xl p-6 mb-8 shadow-sm bg-white max-w-4xl"
                >

                    {/* ------- Top Row -------- */}
                    <div className="flex justify-between text-gray-600 text-sm mb-6 max-md:flex-col max-md:gap-1">
                        <span>OrderId : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span>Total Amount : {currency}{order.amount}</span>
                    </div>

                    {/* ------- ITEMS -------- */}
                    {order.items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex justify-between max-md:flex-col max-md:gap-4 
                                items-center py-4 
                                ${order.items.length !== idx + 1 ? "border-b border-gray-200" : ""}`}
                        >

                            {/* PRODUCT left */}
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-4 rounded-xl">
                                    <img
                                        src={item.product.image[0]}
                                        alt=""
                                        className="w-16 h-16"
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {item.product.name}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Category: {item.product.category}
                                    </p>
                                </div>
                            </div>

                            {/* CENTER INFO */}
                            <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                                <p>Quantity: {item.quantity}</p>
                                <p>Status: {order.status}</p>
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>

                            {/* AMOUNT RIGHT */}
                            <p className="text-primary font-semibold text-lg">
                                Amount: {currency}{item.product.offerPrice * item.quantity}
                            </p>
                        </div>
                    ))}

                </div>
            ))}
        </div>
    )
}

export default MyOrders;