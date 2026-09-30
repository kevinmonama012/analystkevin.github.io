/* Loads the YouTube player only after the visitor clicks play (faster page, no tracking until then). */
document.querySelectorAll('.video-frame').forEach((frame) => {
  const id = frame.dataset.video;
  const list = frame.dataset.playlist;
  if (!id) return;

  frame.style.backgroundImage = `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;

  const title = frame.dataset.title || 'Play video';
  frame.innerHTML = `
    <button class="video-frame__play" type="button" aria-label="${title}">
      <span class="video-frame__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </span>
    </button>`;

  frame.querySelector('button').addEventListener('click', () => {
    const params = new URLSearchParams({ autoplay: 1, rel: 0, playsinline: 1 });
    if (list) params.set('list', list);
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?${params}`;
    iframe.title = title;
    iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
    iframe.focus();
  });
});
