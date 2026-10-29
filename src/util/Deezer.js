// deezer's api doesn't allow normal fetch calls from the browser (no cors),
// so this loads the results through a script tag instead (jsonp)
function jsonp(url) {
  return new Promise((resolve, reject) => {
    // unique name so two searches in a row don't clash
    const callbackName = `deezerCallback${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const script = document.createElement('script');

    // removes the script tag and the global function once we're done
    function cleanUp() {
      delete window[callbackName];
      script.remove();
    }

    // deezer's response calls this function with the data
    window[callbackName] = (data) => {
      resolve(data);
      cleanUp();
    };

    script.onerror = () => {
      reject(new Error('Deezer search could not load'));
      cleanUp();
    };

    script.src = `${url}&output=jsonp&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

const Deezer = {
  // searches deezer and turns each result into a track object
  async search(term) {
    const data = await jsonp(
      `https://api.deezer.com/search?q=${encodeURIComponent(term)}&limit=10`
    );

    // deezer puts errors inside the data instead of failing the request
    if (data.error) {
      throw new Error(`Deezer search failed: ${data.error.message}`);
    }

    return data.data.map((track) => ({
      id: String(track.id),
      name: track.title,
      artist: track.artist.name,
      album: track.album.title,
    }));
  },
};

export default Deezer;
