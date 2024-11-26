export default function Layout( {children}) {
    return (
        <div class="background" > {/*background css*/}
            {children}
        </div>
    )
}
//파라미터는 children으로 받아야함. 
//react에서 children이라는 파라미터를 props를 받아오는 특정 기능으로 인식하기 때문


    // <ul class="background__block__event"> {/*backgroud css*/}
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    //     <li></li>
    // </ul>

    //?? 화면에 컨텐츠가 추가될 때마다 height를 유동적으로 변하게 하고, 애니메이션이 밑에서부터 시작하게
    //?? 변동하려고 했는데, height를 useState로 클래스를 바꿔가며 하기엔 너무 어렵고
    //?? height를 정적으로 부여하니 계속 컨텐츠가 렌더링 되지 않았을 땐 빈 공백이 생기고
    //?? explanation, main, result에 각각 layout을 적용하려 했으나 여전히 height 문제로 해결이 안된다...
    //?? 애니메이션 삭제 해야 될 듯 ㅠ


