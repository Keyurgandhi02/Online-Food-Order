import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const [btnHighlight, setBtnHighliht] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const { items } = cartCtx;
  const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighliht(true);
    const timer = setTimeout(() => {
      setBtnHighliht(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onclick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
