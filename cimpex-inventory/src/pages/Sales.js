import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";

export default function Sales() {
  const [itemsData, setItemsData] = useState([]);
  const [addEditModalVisbility, setAddEditModalVisbility] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [printItem, setPrintItem] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [printBillModalVisbility, setPrintBillModalVisbility] = useState(false);

  const dispatch = useDispatch();
  const componentRef = useRef();

  const getAllItmes = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/sale/get-all-sales")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        console.log(response.data);
        const data = response.data;
        data.reverse();
        setItemsData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/sale/delete-sale", { itemId: record._id })
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Item deleted successfully");
        getAllItmes();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrrong");
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Invoice No",
      dataIndex: "invoice_no",
    },
    {
      title: "ID",
      dataIndex: "id",
      
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setSelectedKeys([]);
                confirm({ closeDropdown: true });
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.customer_name.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Product",
      dataIndex: "selected_product",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setSelectedKeys([]);
                confirm({ closeDropdown: true });
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.selected_product
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Contact",
      dataIndex: "customer_number",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
    },
    {
      title: "Unit Sold",
      dataIndex: "unit_sold",
    },

    {
      title: "Shipping Date",
      dataIndex: "shipping_date",
    },
    {
      title: "Delivery",
      dataIndex: "delivery",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setSelectedKeys([]);
                confirm({ closeDropdown: true });
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.delivery.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Payment",
      dataIndex: "payment",
      
      
    },
    
    {
      title: "Delivery Charge",
      dataIndex: "d_charge",
    },
    {
      title: "Advance",
      dataIndex: "advance",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Comments",
      dataIndex: "comments",
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisbility(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              deleteItem(record);
            }}
          />
          <Link to={`/find-id/${record._id}`}>
            <EyeOutlined
              className="mx-2"
              onClick={() => {
                setSelectedBill(record);
                setPrintBillModalVisbility(true);
                setPrintItem(record);
              }}
            />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllItmes();
  }, []);

  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if (editingItem === null) {
      axios
        .post("/api/sale/add-sale", values)
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item added successfully");
          setAddEditModalVisbility(false);
          getAllItmes();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("something went wrong");
          console.log(error);
        });
    } else {
      axios
        .post("/api/sale/edit-sale", { ...values, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item edited successfully");
          setEditingItem(null);
          setAddEditModalVisbility(false);
          getAllItmes();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("something went wrong");
          console.log(error);
        });
    }
  };

  // Page layout section wuth Table, Modal
  return (
    <DefaultLayout className="default">
      <div className="d-flex justify-content-between add-sell">
        <Button
          type="primary"
          className=""
          onClick={() => setAddEditModalVisbility(true)}
        >
          Add Sell
        </Button>
      </div>
      {/* Showing data with table where important data is based on column */}
      <Table
        id="salesDataTable"
        columns={columns}
        dataSource={itemsData}
        bordered
      />

      {addEditModalVisbility && (
        <Modal
          id="printInvoiceModal"
          className="scrool"
          onCancel={() => {
            setEditingItem(null);
            setAddEditModalVisbility(false);
          }}
          visible={addEditModalVisbility}
          title={`${editingItem !== null ? "Edit Item" : "Add New Item"}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="invoice_no" label="Invoice No">
              <Input />
            </Form.Item>
            <Form.Item name="id" label="ID">
              <Input />
            </Form.Item>
            <Form.Item name="customer_name" label="Customer Name">
              <Input />
            </Form.Item>
            <Form.Item name="selected_product" label="Select Product">
              <Select>
                <Select.Option value="1F">1F</Select.Option>
                <Select.Option value="2F">2F</Select.Option>
                <Select.Option value="4F">4F</Select.Option>
                <Select.Option value="6F">6F</Select.Option>
                <Select.Option value="12F">12F</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="customer_number" label="Contact Number">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>
            <Form.Item name="unit_price" label="Unit Price">
              <Input />
            </Form.Item>
            <Form.Item name="unit_sold" label="Unit Sold">
              <Input />
            </Form.Item>
            <Form.Item name="total" label="Total">
              <Input />
            </Form.Item>
            <Form.Item name="d_charge" label="Delivery Charge">
              <Input />
            </Form.Item>
            <Form.Item name="advance" label="Advance">
              <Input />
            </Form.Item>
            <Form.Item name="discount" label="Discount">
              <Input />
            </Form.Item>
            <Form.Item name="shipping_date" label="Shipping Date">
              <Input />
            </Form.Item>
            <Form.Item name="payment" label="Payment Status">
              <Select>
                <Select.Option value="Paid">Paid</Select.Option>
                <Select.Option value="Due">Due</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="delivery" label="Payment Mode">
              <Select>
                <Select.Option value="Cash">Cash</Select.Option>
                <Select.Option value="Bank">Bank </Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item name="comments" label="Add Details or Comments">
              <Input />
            </Form.Item>
            <div className="d flex justify-content-end">
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}
