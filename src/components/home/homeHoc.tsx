import React from "react";
import { BookObject } from "../../interfaces/bookinterface";

const withHome = (WrappedComponent: React.FC<BookObject>) => {
  const HOC: React.FC<BookObject> = (props) => {
    return <WrappedComponent {...props} />;
  };
  return HOC;
};

export default withHome;