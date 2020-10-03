import React from "react";

import { chartDomains } from "../helpers";

const DomainControl = (props) => {
  const { changeDomain, chartDomainIndex } = props;

  return (
    <div className="domain-control">
      {chartDomains.map((domain, index) => {
        const className =
          chartDomainIndex === index
            ? "domain-button domain-button--active"
            : "domain-button";

        return (
          <button
            key={index}
            className={className}
            onClick={() => changeDomain(index)}
          >
            {domain.text}
          </button>
        );
      })}
    </div>
  );
};

export default DomainControl;
