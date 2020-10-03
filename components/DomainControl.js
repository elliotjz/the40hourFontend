import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

import { chartDomains } from "../helpers";

const DomainControl = () => {
  const { changeDomain, chartDomainIndex } = useContext(AppContext);

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
