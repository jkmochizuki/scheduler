import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {

   // Using classnames library -> gives us access to the classNames function
   const buttonClass = classNames(
      'button', {
         'button--confirm': props.confirm,
         'button--danger': props.danger
      })

   return (
      <button
         disabled={props.disabled}
         onClick={props.onClick}
         className={buttonClass}
      >
         {props.children}
      </button>
   );
}
