import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCartItems,
  removeItem,
  increase,
  decrease,
  calculateTotal,
  getCartItems,
} from "./reduxtk/features/cart/cartSlice";
import { toogleModal } from "./reduxtk/features/modal/modalSlice";
function App() {
  //! USEDISPATCH => to call the reducer functions
  const dispatch = useDispatch();

  //! USESELECTOR => to get values from the store (state)
  const { cartItems, amount, total, isLoading } = useSelector(
    (store) => store.cart
  );
  const { isOpen } = useSelector((store) => store.modal);
  const handleClearCartItems = () => {
    dispatch(clearCartItems());
    // dispatch(toogleModal());
  };
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  return (
    <div>
      <h2>{isLoading ? "Loading" : "Fulfilled"}</h2>
      <h1>Total : {total.toFixed(0)} $</h1>
      {cartItems.map((cartItem) => {
        return (
          <div key={cartItem.id}>
            <h1>{cartItem.title}</h1>
            <p>{cartItem.price} $</p>
            <p>{cartItem.amount} db</p>
            <button
              type="button"
              onClick={() => {
                dispatch(increase(cartItem.id));
              }}
            >
              {" "}
              + 1{" "}
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch(decrease(cartItem.id));
              }}
            >
              {" "}
              - 1{" "}
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch(removeItem(cartItem.id));
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
      <br />
      <br />
      <button type="button" onClick={handleClearCartItems}>
        Clear Cart{" "}
      </button>
      <button
        onClick={() => {
          dispatch(toogleModal());
        }}
        type="button"
      >
        Toogle to {isOpen ? "OPEN" : "CLOSED"}
      </button>
    </div>
  );
}

export default App;
