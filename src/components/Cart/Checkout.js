import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNumber = (value) => value.trim().length !== 5;
const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const NameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();

    const name = NameRef.current.value;
    const street = streetRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const codeIsValid = !isNumber(postalCode);
    const cityIsValid = !isEmpty(city);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: codeIsValid,
      city: cityIsValid,
    });
    const formIsValid =
      nameIsValid && streetIsValid && codeIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: name,
      city: city,
      postalCode: postalCode,
      street: street,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={NameRef} />
        {!formValidity.name && <p>Please Enter Name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && <p>Please Enter Street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeRef} />
        {!formValidity.postalCode && <p>Please Enter Valid Postal Code</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && <p>Please Enter City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
