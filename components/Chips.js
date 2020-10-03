import React from 'react'
import PropTypes from 'prop-types'

const truncateName = (name, n) =>
  name.length > n ? `${name.substr(0, n - 1)}...` : name

const Chips = props => {
  const {
    donorAmounts,
    colors,
    onClick,
    excludedPeople
  } = props

  return (
    <div className="chips">
      {donorAmounts.map((player, index) => {
        const color = excludedPeople.includes(player[0])
          ? '#bbb'
          : colors[index]
        const [name, score] = player
        const truncatedName = truncateName(name, 15)

        return (
          <button
            type="button"
            onClick={() => onClick(player[0])}
            key={index}
            className="chips__player-button"
            style={{
              outlineColor: color,
              border: `solid 3px ${color}`,
            }}
          >
            <span className="chips__player-button-text">
              {truncatedName} <b>${score}</b>
            </span>
          </button>
        )
      })}
    </div>
  )
}

Chips.propTypes = {
  donorAmounts: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  excludedPeople: PropTypes.array.isRequired,
}

export default Chips;
