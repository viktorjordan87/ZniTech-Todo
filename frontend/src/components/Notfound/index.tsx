/* 404 error page */
import "./index.scss";
import { Link } from "@tanstack/react-router";
import { ReactComponent as Page404 } from "@/assets/icons/404 Error-amico.svg";

//https://storyset.com/404
export const NotFound = () => {
  return (
    <div className="page_404">
      <div className="svg-container">
        <Page404 />
      </div>
      <div className="content">
        <h3>Hoppá! Ez az oldal nem létezik.</h3>
        <p>Elnézést kérünk, de a keresett oldal nem található.</p>
        <button type="button">
          <Link to="/">Vissza a kezdőlapra</Link>
        </button>
      </div>
    </div>
  );
};
