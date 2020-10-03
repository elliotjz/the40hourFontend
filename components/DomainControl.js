import React from "react";

import { chartDomains } from "../helpers";

const DomainControl = (props) => {
  const { changeDomain } = props;

  return (
    <div className="domain-control">
      {chartDomains.map((domain, index) => (
        <button key={index} onClick={() => changeDomain(index)}>
          {domain.text}
        </button>
      ))}
    </div>
  );
};

export default DomainControl;
