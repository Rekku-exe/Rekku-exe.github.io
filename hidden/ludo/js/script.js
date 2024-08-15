const main = document.getElementById('main')
for (video of sources) {
    videoTitle = document.createElement('h3')
    videoTitle.innerText = video.name
    videoTitle.setAttribute('class', 'videoTitle')
    videoIframe = document.createElement('iframe')
    videoIframe.setAttribute('class', 'videoIframe')
    videoIframe.setAttribute('src', video.url)
    videoIframe.setAttribute('allowfullscreen', '')
    videoIframe.setAttribute('scrolling', 'no')
    videoDiv = document.createElement('div')
    videoDiv.appendChild(videoTitle)
    videoDiv.appendChild(videoIframe)
    main.appendChild(videoDiv)
}
