import React, {useState} from "react";
import "../../App.css"
import HamburgerMenu from "react-hamburger-menu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header>
            <div className="Header__text__container">
                <h1 className="Header__COU">COU</h1>
                <h1 className="Header__r">r</h1>
                <h1 className="Header__s">s</h1>
                <h1 className="Header__e">e</h1>
            </div>
            
            
            <button className="Header__button" onClick={handleOpen}>
            <HamburgerMenu
                    isOpen={isOpen}
                    height={25}
                    strokeWidth={4}
                    className='Hamburger'   
                />
            카테고리 종류
            </button>
            <div>
                <p>쿠팡 구매 품목 추천 사이트</p>
            </div>
        </header>
    );
}
