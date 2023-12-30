import { Link } from "react-router-dom";
import React from "react";

function OtherPage() {
  return (
    <div>
      I'm some other page!
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default OtherPage;
