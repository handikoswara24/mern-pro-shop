import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, color }: any) => {
    let ratingStar = [1, 2, 3, 4, 5];
    return (
        <div className="rating">
            {ratingStar.map((r, index) => (
                <span key={index}>
                    <i style={{ color }} className={value >= r ? "fas fa-star" : value >= r - 0.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
                </span>
            ))}
            <span>{text}</span>
        </div>
    )
};

Rating.defaultProps = {
    color: '#f8e825'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default Rating;