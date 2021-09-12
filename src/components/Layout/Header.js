import React, { Fragment } from "react";
import foodie from "../../assets/food.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Foodies</h1>
        <HeaderCartButton onclick={props.onshowCart}></HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={foodie} alt="Foodies Images"></img>
      </div>
    </Fragment>
  );
};

export default Header;
