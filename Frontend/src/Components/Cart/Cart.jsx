import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { DashCircleFill, PlusCircleFill } from "react-bootstrap-icons";
import "./Cart.css";
import { useCart } from "../Contexts/CartContext";
import PriceDetails from "../PriceDetails/PriceDetails";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartProducts,
    setCartProducts,
    handleQuantityChange,
    totalPrice,
    totalItems,
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        //jwt strore in localstorage
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login to add to cart");
          navigate("/login");
        }
        // Fetch product IDs from the cart API
        const cartResponse = await axios.get("http://localhost:5000/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //jwt token sending to the backen
            authorization: token,
          },
        });
        const productIds = cartResponse.data.map((item) => item.productId);

        // Fetch product details for each product ID
        const productDetailsPromises = productIds.map((productId) =>
          axios.get(`http://localhost:5000/api/products/${productId}`)
        );

        const productResponses = await Promise.all(productDetailsPromises);
        const products = productResponses.map((response, index) => ({
          ...response.data,
          quantity: cartResponse.data[index].quantity,
        }));

        // Update cart products in the context
        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartProducts();
  }, []);

  const handleRemove = async (productId) => {
    try {
      // Send a DELETE request to remove the item from the cart
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`);

      // Update the cart products in the context after successful removal
      const updatedCart = cartProducts.filter(
        (product) => product.id !== productId
      );
      setCartProducts(updatedCart);
    } catch (error) {
      console.error(`Error removing product ${productId} from cart:`, error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid pl-5">
        <div className="row">
          <div className="col-md-8 padding-left">
            {cartProducts.length === 0 ? (
              <div>Your cart is empty.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="img-fluid"
                          style={{ maxWidth: "100px" }}
                        />
                        <br />
                        <DashCircleFill
                          onClick={() => handleQuantityChange(product.id, -1)}
                          style={{ cursor: "pointer" }}
                        />
                        <span className="mx-2">{product.quantity}</span>
                        <PlusCircleFill
                          onClick={() => handleQuantityChange(product.id, 1)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      <td>
                        {product.title}
                        <br />
                        <br />
                        <span className="text-primary">Price:</span>$
                        {product.price}
                        <br />
                        <span className="text-success">Quantity:</span>
                        {product.quantity}
                        <br />
                        <br />
                        <br />
                        <br />
                        <p
                          className="font-weight-bold remove-text"
                          onClick={() => handleRemove(product.id)}
                        >
                          REMOVE
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-md-4 pt-2-5rem">
            <PriceDetails totalPrice={totalPrice} totalItems={totalItems} />{" "}
            {/* Render the PriceDetails component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
