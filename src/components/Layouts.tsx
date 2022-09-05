import { memo } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const Layouts = memo(({ children }: Props) => {
  return (
    <div className="app">
      <div className="header">
        <Link to="/">
          <h1 className="link">Expense Tracker</h1>
        </Link>
      </div>
      <div className="main">
        <div className="container">{children}</div>
      </div>
      <div className="footer">&copy;2022 Learn with Sumit</div>
    </div>
  );
});

export default Layouts;
