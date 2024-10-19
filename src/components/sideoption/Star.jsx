import React, {useState} from 'react';
import { FaRegStar, FaStar} from 'react-icons/fa';
import '../../App.css';


export default function Star() {

    const [starScore, setStarScore] = useState(0);

    const handleratingsStar = () => {
        let result = [];
        for (let i=0; i<5; i++) {
            result.push(<span key={i+1} onClick={() => setStarScore(i+1)}>
                {
                    starScore >= i+1 ? <FaStar className='Fastar'/> : <FaRegStar className='FaRegstar' />
                    //FaStar: 별점 채우기
                    //FaRegStar: 별점 없애기
                }
                </span>);
        }
        return result; //반복문으로 별 5개 만들고, push로 배열에 추가하기
    }
    return (
        <>
        <div className='Star__rating__container'>
        <p>별점을 입력해주세요!</p>       
            {handleratingsStar()}
        </div>
        </>
    )
}

