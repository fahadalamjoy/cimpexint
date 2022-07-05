import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import cimpex from "../resourses/cimpex.png";
import "../resourses/invoice.css";

import { Button, Modal, Table } from "antd";
import ReactToPrint, { useReactToPrint } from "react-to-print";

export default function CustomerById() {
  const [billsData, setBillsData] = useState({});
  // console.log(billsData)
  const [printBillModalVisbility, setPrintBillModalVisbility] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);

  let navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();
  const componentRef = useRef();

  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    console.log(id);
    axios
      .get(`/api/sale/find-id/${id}`)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data;
        console.log(data);
        setBillsData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  
  useEffect(() => {
    getAllBills();
  }, []);

  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  return (
    <DefaultLayout>
      {printBillModalVisbility && (
        <Modal
          id="printInvoiceModal"
          onCancel={(e) => {
            setPrintBillModalVisbility(false);
            navigate(-1);
          }}
          onClick={(e) => console.log(e)}
          visible={printBillModalVisbility}
          footer={false}
          width={800}
        >
          <div
            className=" "
            visible={printBillModalVisbility}
            ref={componentRef}
          >
            <div className="container">
              <div className="brand-section">
                <div className="row">
                  <div className="col-6">
                    <img src={cimpex} alt="cimpex_logo" />
                  </div>
                  <div className="col-6">
                    <div className="company-details">
                      <p className="text-white">
                        3rd floor, Sheltech Sierra-236, New Elephant Road, Dhaka
                      </p>
                      <p className="text-white number">
                        +8801763713751 <br /> +88017108425051{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="body-section">
                <div className="row">
                  <div className="col-6">
                    <h2 className="heading">Invoice No: {billsData.invoice_no}</h2>
                    {/* <p className="sub-heading">Tracking No. fabcart2025 </p> */}
                    <p className="sub-heading">
                      Order Date: {billsData.shipping_date}
                    </p>
                    <p className="sub-heading">
                      Customer ID: {billsData.id}
                    </p>
                    {/* <p className="sub-heading">
                      Cell: {billsData.customer_number}
                    </p> */}
                  </div>
                  <div className="col-6 right-details">
                    <p className="sub-heading">{billsData.customer_name} </p>
                    <p className="sub-heading number">{billsData.address} </p>
                    <p className="sub-heading">
                      Cell: {billsData.customer_number}
                    </p>
                  </div>
                </div>
              </div>

              <div className="body-section">
                <h3 className="heading">Ordered Items</h3>
                <br />
                <table className="table-bordered">
                  <thead>
                    <tr>
                      <th className="w-20">Item No</th>
                      <th className="w-20">Item Name</th>
                      <th className="w-20">Price Per Unit</th>
                      <th className="w-20">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Usha Martin {billsData.selected_product}</td>
                      <td>{billsData.unit_price}</td>
                      <td>{billsData.unit_sold}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">
                        Total
                      </td>
                      <td> {billsData.total}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">
                        Delivery Charge
                      </td>
                      <td> {billsData.d_charge}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">
                        Advance
                      </td>
                      <td> {billsData.advance}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">
                        Discount
                      </td>
                      <td> {billsData.discount}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right final_amount">
                        Final Amount
                      </td>
                      <td>
                        {" "}
                        {billsData.total +
                          billsData.d_charge -
                          billsData.advance}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <p className="heading">Payment Status: <b>{billsData.payment}</b></p>
                <p className="heading">Payment Mode: <b>{billsData.delivery}</b></p>
              </div>

              {/* <div className="body-section">
                <p>
                  &copy; Copyright 2021 - Fabcart. All rights reserved.
                  <a
                    href="https://www.fundaofwebit.com/"
                    className="float-right"
                  >
                    www.fundaofwebit.com
                  </a>
                </p>
              </div> */}
            </div>
          </div>
          <div
            className="d-flex justify-content-end"
            // onClick={(e) => {
            //   navigate("/sales");
            // }}
          >
            <Button type="primary" className="print_button" onClick={handlePrint}>
              Print Bill
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}
