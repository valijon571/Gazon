import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Gazon = () => {
  const [category, setCategory] = useState([]);
  const [tab, setTab] = useState(0);
  const [product, setProduct] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);
  const getCategory = () => {
    setLoading(true);
    axios
      .get("https://api.gazon-tashkent.uz/api/v1/utils/category-list/")
      .then((r) => {
        setCategory(r.data);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getAll = () => {
    setTab(0);
  };
  const getProduct = () => {
    setLoading(true);
    axios
      .get("https://api.gazon-tashkent.uz/api/v1/utils/product-list/")
      .then((r) => {
        setProduct(r.data);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <h1>Gazon</h1>
      <br />
      {loading ? (
        <div>yuklanmoqda.....</div>
      ) : (
        <div>
          <div>
            {category?.map((item, index) => (
              <>
                <div key={index}>
                  <div>{item?.name}</div>
                  <div>{item?.description}</div>
                  <div>{item?.id}</div>
                  <img
                    src={`https://api.gazon-tashkent.uz/media/${item?.banner_image}`}
                  />
                </div>
              </>
            ))}
          </div>
          <h2>BIZNING MAHSULOT VA XIZMATLAR</h2>
          <div>
            <button onClick={() => setTab(0)}>Barchasi</button>
            {category
              .map((item, index) => (
                <button key={index} onClick={() => setTab(item?.id)}>
                  {item?.name}
                </button>
              ))}
          </div>

          <div>
            {console.log(tab, "tab")}
            {tab === 0 ? (
              <>
                {product.map((item, index) => (
                  <>
                    {
                      <div key={index}>
                        <div>{item?.category}</div>
                        <div>{item?.category__name}</div>
                        <div>{item?.description}</div>
                        {/* <div>{item?.id}</div> */}
                        <img
                          src={`https://api.gazon-tashkent.uz/media/${item?.image}`}
                          style={{ width: "30%", margin: 10 }}
                        />
                        <div>{item?.name}</div>
                      </div>
                    }
                  </>
                ))}
              </>
            ) : (
              product
                .filter((o) => o?.id === parseInt(tab))
                .map((item, index) => (
                  <>
                    {
                      <div key={index}>
                        <div>{item?.category}</div>
                        <div>{item?.category__name}</div>
                        <div>{item?.description}</div>
                        {/* <div>{item?.id}</div> */}
                        <img
                          src={`https://api.gazon-tashkent.uz/media/${item?.image}`}
                          style={{ width: "30%", margin: 10 }}
                        />
                        <div>{item?.name}</div>
                      </div>
                    }
                  </>
                ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gazon;
