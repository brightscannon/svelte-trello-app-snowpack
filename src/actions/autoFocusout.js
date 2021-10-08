export function autoFocusout(el, focusoutListner) {

    const focusinListener = event => {
        //해당 요소영역을 클릭할때(삭제를 위해 함수를 지정)
        event.stopPropagation() //event bubbling 제거 (부모의 부모까지 클릭되는것을 방지)
    }

    setTimeout(() => { //클릭하자마자 focusoutListener를 수행 --> 다시 없어지므로 setTimeout 추가
        el.addEventListener('click', focusinListener)
        window.addEventListener('click', focusoutListner)
        // window.addEventListener('click', () => {
        //     // 모든 영역을 클릭할때
        //     focusoutListner()
        // })
    }, 0)

    return {
        // update(){

        // },
        destroy(){
            el.removeEventListener('click', focusinListener)
            window.removeEventListener('click', focusoutListner)
        }
    }
}