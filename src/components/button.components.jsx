import "./index.scss";

export const Button = ({ children, onClick }) => {
  return (
    <button className={`button-86`} onClick={onClick}>
      {children}
    </button>
  );
};

export const Button2 = ({ children, onClick }) => {
  return (
    <button className={`download-button`} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};
