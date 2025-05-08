fetch('sportss.m3u')
  .then(res => res.text())
  .then(data => {
    const lines = data.split('\n');
    const channelList = document.getElementById('channel-list');

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const name = lines[i].split(',')[1];
        const url = lines[i + 1];
        const btn = document.createElement('button');
        btn.innerText = name;
        btn.onclick = () => playStream(url);
        channelList.appendChild(btn);
      }
    }
  });

function playStream(url) {
  const video = document.getElementById('video');
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
  }
}