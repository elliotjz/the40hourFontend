import React, { useContext } from "react";
import PropTypes from "prop-types";

import { AppContext } from "../contexts/AppContext";
import { colors } from "../helpers";

const truncateName = (name, n) =>
  name.length > n ? `${name.substr(0, n - 1)}...` : name;

const Chips = () => {
  const { donorAmounts, excludedPeople, onChipClick } = useContext(AppContext);

  return (
    <div className="chips">
      {donorAmounts.map((player, index) => {
        const color = excludedPeople.includes(player[0])
          ? "#bbb"
          : colors[index];
        const [name, score] = player;
        const truncatedName = truncateName(name, 15);

        return (
          <button
            type="button"
            onClick={() => onChipClick(player[0])}
            key={index}
            className="chip"
            style={{
              borderColor: color,
            }}
          >
            <span className="chip-text">
              {truncatedName} <b>${score}</b>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Chips;
