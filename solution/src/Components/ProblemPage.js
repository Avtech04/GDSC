import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import GooglePayButton from '@google-pay/button-react'
import { Appstate } from "../contextApi";

const ProblemPage = ({ headline, description }) => {
   
    const {problemHeadline} = Appstate();
    const {problemDescription} = Appstate();
  const notify = () => toast("Wow so easy!");
  return (
    <>
      <div style={{textAlign:"center"}}>
        <h1>{problemHeadline}</h1>
      </div>

      <div className='problem-container'>
        <div className='left-problem-container'>
          <div className='image-problems'>
            <img
              className="d-block w-100"
              src="https://picsum.photos/1800/300"
              alt="Problem slide" 
            />
          </div>
          <div>
              {/* <button className='Donate-button' onClick={notify} style={{textAlign:"center"}}>Donate now</button> */}
              <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    const gatewayMerchantId = paymentRequest.allowedPaymentMethods[0].tokenizationSpecification.parameters.gatewayMerchantId;
    console.log('Gateway Merchant ID:', gatewayMerchantId);
  }}
/>

          </div>
        </div>
        <div className='right-problem-container'>{problemDescription}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default ProblemPage;
