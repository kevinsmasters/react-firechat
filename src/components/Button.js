import React from 'react';

const Button = ({ onClick = null, children = null }) => (
    <button className="px-1 py-0.5 bg-blue-500" onClick={onClick}>{children}</button>
);

export default Button;
