import React from "react";
import "../../App.css"
import Hamburger from "../sideoption/Hamburger";

export default function Header() {

    return (
        <>
        <header>
            <div className="Header__text__container">
                <h1 className="Header__COU">COU</h1>
                <h1 className="Header__r">r</h1>
                <h1 className="Header__s">s</h1>
                <h1 className="Header__e">e</h1>
            </div>
            
            <div className="Header__hamburger">
                <Hamburger />
            </div>

            <div>
                <p>쿠팡 구매 품목 추천 사이트</p>
            </div>
        </header>
        </>
    );
}
