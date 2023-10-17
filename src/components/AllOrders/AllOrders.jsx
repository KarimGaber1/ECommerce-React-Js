import React from 'react'
import './AllOrders.module.css'
import payment from '../../assets/images/payment.png'
import { Link } from 'react-router-dom'

export default function AllOrders() {
  return (
    <div className="container">
      <div className=" p-4 my-5 text-center">
        <img className='img-fluid p-4' src={payment} alt="" />
        <h3>Your Payment is Successful</h3>
        <p>Thank you for your payment. An automated payment receipt 
          will be send to your registered email.
        </p>
        <Link
         to={"/"}
        >
         <button className='btn bg-main text-white fw-bold '>Back to home</button> 
        </Link>
        
      </div>
    </div>
  )
}
