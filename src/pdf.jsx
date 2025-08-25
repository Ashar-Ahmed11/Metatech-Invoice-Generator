import logo from './logo.svg';
import './App.css';
import { useContext, useRef } from 'react';
import AppContext from './components/context/appContext';
import { Switch, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import Logo from './components/logo.png'
import { Resolution } from 'react-to-pdf';
import { Margin } from 'react-to-pdf';
import generatePDF, { usePDF } from 'react-to-pdf';
import { Helmet } from 'react-helmet-async';
function Pdf() {
    const context = useContext(AppContext)
    const { helloworld, pdfData } = context
    console.log(helloworld);
    const { toPDF, targetRef } = usePDF({ filename: pdfData?.pdfName || "71236821", resolution: Resolution.HIGH });
    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=1024" />
            </Helmet>
            <div className="container">
                <button className="btn btn-outline-primary my-5" onClick={() => toPDF()}>Download</button>
            </div>
            <div ref={targetRef} style={{ width: "793px", height: "1122px", margin: "0 auto" }} className="container my-5 bg-black p-5 d-flex align-items-center">
                <div>
                    <div className="row">
                        <div className="col-6 flex column">
                            <div className="d-flex align-items-center">
                                <img src={Logo} style={{ width: "100px",height:"max-content" }} alt="" className="border border-light border-2 card-img-top rounded-4" />
                                <h1 className='text-light display-6 fw-normal py-3 mx-3'>Metatech Official</h1>

                            </div>
                            <h1 className='text-light display-6 fw-normal py-3'>{pdfData?.type == "Quotation" ? "Quotation" : "Invoice"} #{pdfData?.invoiceNumber}</h1>
                        </div>
                        <div className="col-6 row">
                            <div className="col-6 p-1">
                                <div className='h-100 p-3 border border-light rounded-4 flex-column d-flex'>
                                    <span className="text-light fw-bold">{pdfData?.type == "Quotation" ? "Quotation" : "Invoice"} Date</span>
                                    <span className="text-light opacity-75">{pdfData?.date}</span>
                                </div>
                            </div>
                            <div className="col-6 p-1">
                                <div className='h-100 p-3 border border-light rounded-4 flex-column d-flex'>
                                    <span className="text-light fw-bold">{pdfData?.type == "Quotation" ? "Quotation" : "Invoice"} For</span>
                                    <span className="text-light opacity-75">{pdfData?.to}</span>
                                </div>
                            </div>
                            <div className="col-6 p-1">
                                <div className='h-100 p-3 border border-light rounded-4 flex-column d-flex'>
                                    <span className="text-light fw-bold">Address</span>
                                    <span className="text-light opacity-75">{pdfData?.toAddress}</span>
                                </div>
                            </div>
                            <div className="col-6 p-1">
                                <div className='h-100 p-3 border border-light rounded-4 flex-column d-flex'>
                                    <span className="text-light fw-bold">From</span>
                                    <span className="text-light opacity-75">Metatech Official</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-5">
                        <table class="table bg-dark">
                            <thead>
                                <tr>

                                    <th scope="col">Description</th>

                                    <th scope="col" >Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...(pdfData?.services || []).map(({ description, cost }) =>
                                    <tr>

                                        <td>{description}</td>

                                        <td >{pdfData?.currency == "USD" ? "$" : "PKR "}{Number(cost?cost:"0").toLocaleString()}</td>
                                    </tr>
                                )]}


                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-6"></div>
                        <div className="col-6 p-1">
                            <div className='h-100 p-3 border border-light rounded-4 flex-column d-flex justify-content-center'>
                                <div className="d-flex justify-content-between">
                                    <span className="text-light fw-bold">Sub Total</span>
                                    <span className="text-light opacity-75">{pdfData?.currency == "USD" ? "$" : "PKR "}{pdfData?.total?.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="text-light fw-bold">Tax</span>
                                    <span className="text-light opacity-75">Included</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-light fw-bold">Total</span>
                                    <span className="text-light fw-bold h3">{pdfData?.currency == "USD" ? "$" : "PKR "}{pdfData?.total?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className='text-light display-6 py-3'>Notes</h1>
                    <div>
                        <p className='text-light fw-bold'>Payment Method</p>
                        <p className="text-light opacity-75">Any form of convenient payment method is acceptable</p>
                        {/* <p className="text-light opacity-75">Bank Details or Interac e-Transfer are available upon request</p> */}
                    </div>
                    <div>
                        <p className='text-light fw-bold'>Contact Details</p>
                        <p className="text-light"><span className="opacity-75">Website URL</span>: www.metatech-official.com</p>
                        <p className="text-light"><span className="opacity-75">CEO Phone</span>: 0347-2698189</p>
                        {/* <p className="text-light opacity-75">Bank Details or Interac e-Transfer are available upon request</p> */}
                    </div>
                </div>
            </div>

        </>

    );
}

export default Pdf;
