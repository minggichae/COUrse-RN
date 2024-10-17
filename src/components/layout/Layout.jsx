export default function Layout( {children}) {
    return (
        <div class="background" > {/*background css*/}
            <ul class="background__block__event"> {/*backgroud css*/}
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
            {children}
        </div>
    )
}

//파라미터는 children으로 받아야함. 
//react에서 children이라는 파라미터를 props를 받아오는 특정 기능으로 인식하기 때문

//TODO: 애니메이션 끝까지 올라오게 만들기