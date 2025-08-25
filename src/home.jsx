import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect } from 'react'
import AppContext from './components/context/appContext'
import { Helmet } from 'react-helmet-async'
const Home = () => {
    const { pdfData, setPdfData } = useContext(AppContext)
    const initialValue = 0;
    const TotalCost = [...(pdfData?.services || [])].reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue.cost),
        initialValue,
    );


    useEffect(() => {
        if (pdfData?.services) {
            setPdfData({ ...pdfData, total: TotalCost })
        }
    }, [TotalCost])



    console.log(pdfData);

    return (
        <div className="container">
            <Helmet>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <h1 className='my-5'>Metatech Official Quote Generator</h1>
            <div className="d-flex">
                <input value={pdfData?.pdfName} onChange={(({ target }) => setPdfData({ ...pdfData, pdfName: target.value }))} type="text" placeholder='PDF Name' className="form-control m-2" />


            </div>
            <div className="d-flex">
                <input value={pdfData?.invoiceNumber} onChange={(({ target }) => setPdfData({ ...pdfData, invoiceNumber: target.value }))} type="number" placeholder='Invoice Nunber' className="form-control m-2" />
                <input value={pdfData?.date} onChange={(({ target }) => setPdfData({ ...pdfData, date: target.value }))} type="text" placeholder='Date' className="form-control m-2" />
            </div>
            <div className="d-flex">
                <input value={pdfData?.to} onChange={(({ target }) => setPdfData({ ...pdfData, to: target.value }))} type="text" placeholder='Recipient' className="form-control m-2" />
                <input value={pdfData?.toComapny} onChange={(({ target }) => setPdfData({ ...pdfData, toComapny: target.value }))} t type="text" placeholder='Recipient Company' className="form-control m-2" />
            </div>
            <div className="d-flex">
                <input value={pdfData?.toAddress} onChange={(({ target }) => setPdfData({ ...pdfData, toAddress: target.value }))} type="text" placeholder='Recipient Location' className="form-control m-2" />


            </div>

            <div className="d-flex justify-content-center">
                <button onClick={() => setPdfData({ ...pdfData, type: "Quotation" })} className={`btn btn-outline-primary m-2 ${pdfData?.type == "Quotation" && "active"}`}>Quotation</button>
                <button onClick={() => setPdfData({ ...pdfData, type: "Invoice" })} className={`btn btn-outline-primary m-2 ${pdfData?.type == "Invoice" && "active"}`}>Invoice</button>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={() => setPdfData({ ...pdfData, currency: "USD" })} className={`btn btn-outline-primary m-2 ${pdfData?.currency == "USD" && "active"}`}>USD</button>
                <button onClick={() => setPdfData({ ...pdfData, currency: "PKR" })} className={`btn btn-outline-primary m-2 ${pdfData?.currency == "PKR" && "active"}`}>PKR</button>
            </div>
            <h1 className="py-2">Services</h1>
            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-primary" onClick={() => setPdfData({ ...pdfData, services: [...(pdfData?.services || []), { description: "", cost: null }] })}>Add Service</button>
            </div>
            {pdfData?.services && pdfData.services.map((e, index) =>
                <div key={index} className="d-flex align-items-center">
                    <input type="text"
                        value={e.description}
                        onChange={({ target }) => {
                            pdfData.services[index].description = target.value;
                            setPdfData({ ...pdfData })
                        }
                        }
                        placeholder='Service Description' className="form-control m-2" />

                    <input
                        value={e.cost}
                        onChange={({ target }) => {
                            pdfData.services[index].cost = target.value;
                            setPdfData({ ...pdfData })
                        }

                        }
                        type="Number" placeholder='Service Cost' className="form-control m-2" />
                    <i
                        onClick={() => {
                            let arr = [...(pdfData.services)]
                            let filterdArr = arr.filter((e, i) => index !== i)
                            console.log(filterdArr);

                            setPdfData({ ...pdfData, services: filterdArr })
                        }}
                        class="fa fa-trash-o fa-lg border-1 border border-danger p-2 rounded-3 text-danger" aria-hidden="true"></i>

                </div>
            )}
            <div className="d-flex justify-content-center py-3">
                <Link to="/pdf" style={{ width: '100%', textDecoration: "none" }} > <div className=" btn btn-outline-success w-100">Generate PDF</div></Link>
            </div>
        </div>
    )
}

export default Home