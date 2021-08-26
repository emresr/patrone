import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

const Payment = () => {
  async function addPayment() {
    await axios
      .put(
        `${process.env.REACT_APP_API_LINK}/addpayment`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJpYXQiOjE2Mjk5MjMxOTAsImV4cCI6MTYzMjUxNTE5MH0.3Q0pYNHpYOSR2Pb6yioqFlBIAw97eOhq-UH3t6lCkC0',
          },
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <h1>Payment page</h1>
      <button onClick={addPayment}>LMao</button>
    </div>
  );
};

export default Payment;
