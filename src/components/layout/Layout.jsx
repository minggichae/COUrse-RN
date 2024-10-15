export default function Layout( {content}) {
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
            {content}
        </div>
    )
}

//?? Product에 있는 background를 컴포넌트화 하고, layout 형태로 감싸고 싶은데
//?? 안되는 중.. ㅠㅠ 위 코드는 test 로직
 