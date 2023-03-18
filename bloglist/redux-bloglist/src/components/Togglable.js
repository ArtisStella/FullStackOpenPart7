import React, { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return toggleVisibility;
  });

  return (
    <div className="mb-2">
      <div className="row" style={hideWhenVisible}>
        {props.text ? <span className="col-sm-3 collapsedText">{props.text}</span> : null}
        <span className="col-sm-4">
          <button className="btn btn-primary btn-sm toggleButton" onClick={toggleVisibility}>
            {props.buttonLabel}
          </button>
        </span>
      </div>
      <div className="toggleContent" style={showWhenVisible}>
        {props.children}
        {props.closeButtonLabel ? (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={toggleVisibility}
          >
            {props.closeButtonLabel}
          </button>
        ) : (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={toggleVisibility}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
