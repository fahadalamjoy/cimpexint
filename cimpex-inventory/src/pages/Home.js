import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Itme";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
import Chart from "react-apexcharts";

function Home() {
  const [itemsData, setItemsData] = useState([]);

  const dispatch = useDispatch();



  // ---------------------------------------------------------------------------

  const [selected_product, setSelected_Product] = useState([]);
  const [sale, setSale] = useState([]);

  useEffect(() => {
    const getStudentdata = async () => {
      const Selected_product = [];
      const Sale = [];
      dispatch({ type: "showLoading" });
      axios
        .get("/api/sale/get-all-sales")
        .then((response) => {
          dispatch({ type: "hideLoading" });
          console.log(response.data);
          const data = response.data;
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            Selected_product.push(parseInt(data[i].selected_product));
            Sale.push(data[i].sale);
          }
          console.log("selected", selected_product);
          console.log("selected", sale);

          setSelected_Product(Selected_product);
          setSale(Sale);
          // setItemsData(data);
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          console.log(error);
        });

      //console.log(resData);
    };

    getStudentdata();
  }, []);

  // -----------------------------------------------------

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <Chart
          type="pie"
          width={450}
          height={450}
          series={sale}
          options={{
            title: { text: "Product Sale" },

            // colors:["#f90000","#f0f"],
            labels: selected_product,
          }}
        ></Chart>
        <Chart
          type="bar"
          width={450}
          height={450}
          series={[
            {
              name: selected_product,
              data: sale,
              style: { fontSize: 2 },
            },
          ]}
          options={{
            title: { text: "Product Sale" },

            // colors:["#f90000","#f0f"],
            labels: selected_product,
          }}
        ></Chart>
      </div>
    </DefaultLayout>
  );
}

export default Home;
