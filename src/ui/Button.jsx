/* eslint-disable react/prop-types */
function Button({ children, handleOnClick, disabled, type, options }) {
  if (type === "primary") {
    return (
      <button
        className={`${options} rounded-full bg-gray-500 hover:bg-gray-600 hover:text-neutral-300 p-2 text-neutral-200 text-center text-lg`}
        disabled={disabled}
        onClick={handleOnClick}
      >
        {children}
      </button>
    );
  }

  if (type === "secondary") {
    return (
      <button
        className={`${options} rounded-full bg-neutral-200 hover:bg-neutral-300 text-gray-500 hover:text-gray-600 p-2 text-center text-lg`}
        disabled={disabled}
        onClick={handleOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} onClick={handleOnClick} className="text center">
      {children}
    </button>
  );
}

export default Button;
