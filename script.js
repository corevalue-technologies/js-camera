const camera = document.querySelector('.camera');
const canvas = document.querySelector('.cameraScreen');
const photoButton = document.querySelector('.photobtn')
const ctx = canvas.getContext('2d');
const pic = document.querySelector('.pic');
const click = document.querySelector('.sound');

function getCamera () {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            camera.srcObject = localMediaStream
            camera.play()
        })
        .catch(err => {
            console.log('There is an error which says', err)
        })
}

function paintToCanvas () {
    const width = camera.videoWidth
    const height = camera.videoHeight
    canvas.width = width
    canvas.height = height
    setInterval(() => {
        ctx.drawImage(camera, 0, 0, width, height)
    }, 16)
}

function takePhoto () {
    const data = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', 'Photo')
    link.innerHTML = `<img src="${data}" alt="Photo">`
    pic.insertBefore(link, pic.firstChild)
    click.currentTime = 0
    click.play()
}

getCamera()


camera.addEventListener('canplay', paintToCanvas)
photoButton.addEventListener('click', takePhoto)