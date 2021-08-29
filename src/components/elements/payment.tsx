import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
const Payment = () => {
  const history = useHistory();
  async function addPayment() {
    await axios
      .put(
        `${process.env.REACT_APP_API_LINK}/addpayment`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        Swal.fire('Thank you', 'for supporting me!', 'success').then(() => {
          history.push('/');
        });
      })

      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="payment_container">
      <div>
        <h1 className="payment_title">You can choose any payment method here.</h1>
        <button onClick={addPayment} className="payment_button">
          Make payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
