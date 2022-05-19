export async function sendNoti(message, status, showTime=4000){
    var noti = document.querySelector('.notiBox')
    console.log(noti)
    if ( noti === undefined || noti === null) {
        console.log(`Creating noti box`)
        noti = createNotiBox()
    }

    let newNoti = document.createElement('div')
    newNoti.setAttribute('class', 'notification')
    newNoti.innerHTML = message
    noti.appendChild(newNoti)
    
    // console.log('Sending a noti')
    
    // noti[0].innerHTML = message
    // noti[0].className = 'notification noti--'+status
    setTimeout(() => {
        newNoti.setAttribute('class', 'notification noti--'+status)
    }, 100)
    
    setTimeout(() => {
        // noti[0].className = 'notification'
        newNoti.setAttribute('class', 'notification')
        setInterval(() => {
            newNoti.remove()
        }, 1500)
    }, showTime)
  }

  export function createNotiBox(){
    var next = document.querySelector('#__next')
    var noti = document.createElement('div')
    noti.setAttribute('class', 'notiBox');
    next.insertBefore(noti, next.firstChild)
    return noti
  }