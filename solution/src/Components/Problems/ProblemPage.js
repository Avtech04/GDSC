import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import GooglePayButton from '@google-pay/button-react'
import { Appstate } from "../../contextApi";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';



const ProblemPage = ({ headline, description }) => {
  const navigate = useNavigate();
  const { problemHeadline, problemDescription, setProblemHeadline, setProblemDescription, problemImage, setProblemImage } = Appstate();
  const [amount, setAmount] = useState();
  const [showModal, setShowModal] = useState(false);
  const fetchProblem = async (id) => {
    try {
      let data = await axios.get('http://localhost:6005/api/problem',
        {
          params: {
            id: id
          }
        });
      setProblemDescription(data.data.description);
      setProblemHeadline(data.data.headline);
      setProblemImage(data.data.filename);
    } catch (error) {
      console.log("hi");
    }
  }
  useEffect(() => {
    let url = window.location.href
    let id = url.substring(30);
    fetchProblem(id);
  }, [])


  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          <h4>Success</h4>
          <p>
            You Have Successfully Donated for {problemHeadline}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const notify = () => toast("Payment Successfull!");
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ paddingTop: '12px', }}>{problemHeadline}</h1>
      </div>

      <div className='problem-container'>
        <div className='left-problem-container'>
          <div className='image-problems'>
            <img
              className="d-block w-100"
              src={`http://localhost:6005/files/${problemImage}`}
              alt="Problem slide"
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            {/* <button className='Donate-button' onClick={notify} style={{textAlign:"center"}}>Donate now</button> */}
            <input type='number' placeholder='Enter the amount you want to donate' value={amount} style={{
              width: '20vw',
              margin: '12px',
              height: '35px',
            }} onChange={(e) => { setAmount(e.target.value) }}></input>
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"]
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId"
                      }
                    }
                  }
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant"
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: `${amount}`,
                  currencyCode: "USD",
                  countryCode: "US"
                },
                shippingAddressRequired: false,
                callbackIntents: ["PAYMENT_AUTHORIZATION"]
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("Success", paymentRequest);
                setShowModal(true);
                setTimeout(() => {
                  navigate('/');
                }, 3000)


              }}
              onPaymentAuthorized={(paymentData) => {
                console.log("Payment Authorised Success", paymentData);
                return { transactionState: "SUCCESS" };
              }}
              // onPaymentDataChanged={(paymentData) => {
              //   console.log("On Payment Data Changed", paymentData);
              //   return {};
              // }}
              existingPaymentMethodRequired="false"
              buttonColor="default"
              buttonType="short"
            />
          </div>
        </div>
        <div className='right-problem-container'>{problemDescription}
        </div>
      </div>
      <ToastContainer />
      <MyVerticallyCenteredModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  )
}

export default ProblemPage;
