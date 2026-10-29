// from google cloud credentials, fine to be public since this flow has no secret
const clientId = '889033056157-6m8e3sb6880kg0opi8k1r303n60c55cn.apps.googleusercontent.com';
// where google sends the user back, has to match the redirect uri in google cloud exactly
const redirectUri = window.location.origin + import.meta.env.BASE_URL;
// lets the app search youtube and create playlists on the user's account
const scope = 'https://www.googleapis.com/auth/youtube';

let accessToken;
let tokenExpiresAt = 0;

// sends the user to google's sign in and approval page
function redirectToGoogleLogin() {
  // random value we check when google sends the user back, blocks forged logins
  const state = crypto.randomUUID();
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'token',
    scope,
    state,
  });
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

// youtube titles come back with html codes like &#39; and &amp;, this turns them into normal text
function decodeHtml(text) {
  return new DOMParser().parseFromString(text, 'text/html').documentElement.textContent;
}

const YouTube = {
  // gives back a valid token, or sends the user to sign in
  getAccessToken() {
    // still good, reuse it
    if (accessToken && Date.now() < tokenExpiresAt) return accessToken;

    // a refresh wipes the variables above, so check sessionStorage too
    const savedToken = sessionStorage.getItem('access_token');
    const savedExpiry = Number(sessionStorage.getItem('token_expires_at'));
    if (savedToken && Date.now() < savedExpiry) {
      accessToken = savedToken;
      tokenExpiresAt = savedExpiry;
      return accessToken;
    }

    // google puts the token after the # in the url, not after a ?
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const tokenFromUrl = hashParams.get('access_token');
    const expiresIn = hashParams.get('expires_in');
    const returnedState = hashParams.get('state');
    const error = hashParams.get('error');

    // clean the token or error out of the address bar so it can't be reused
    if (tokenFromUrl || error) {
      window.history.replaceState({}, document.title, redirectUri);
    }

    // user clicked cancel on google's page
    if (error) {
      console.error(`Google sign in was not completed: ${error}`);
      return;
    }

    if (tokenFromUrl && expiresIn) {
      // only trust the token if google sent back the same state we made
      if (returnedState !== sessionStorage.getItem('oauth_state')) {
        console.error('Sign in state did not match, ignoring the token');
        return;
      }
      sessionStorage.removeItem('oauth_state');

      accessToken = tokenFromUrl;
      // expires_in is in seconds, Date.now() is in milliseconds
      tokenExpiresAt = Date.now() + Number(expiresIn) * 1000;

      // saved so a page refresh doesn't force another sign in
      sessionStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('token_expires_at', tokenExpiresAt);
      return accessToken;
    }

    // no token anywhere yet, so start the sign in
    redirectToGoogleLogin();
  },

  // searches youtube music videos and turns them into track objects
  async search(term) {
    const token = this.getAccessToken();
    // no token means getAccessToken is sending the user to sign in
    if (!token) return [];

    // category 10 is music, max 10 keeps each search cheap on the daily quota
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      videoCategoryId: '10',
      maxResults: '10',
      q: term,
    });

    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`YouTube search failed: ${response.status}`);
    }

    const data = await response.json();
    return data.items.map((item) => ({
      id: item.id.videoId,
      name: decodeHtml(item.snippet.title),
      // auto-made artist channels end in " - Topic", so trim that off
      artist: decodeHtml(item.snippet.channelTitle).replace(' - Topic', ''),
    }));
  },

  // makes a playlist on the signed in user's channel and adds each video to it
  async savePlaylist(name, videoIds) {
    const token = this.getAccessToken();
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // first make the empty playlist, private so only the owner sees it
    const playlistResponse = await fetch(
      'https://www.googleapis.com/youtube/v3/playlists?part=snippet,status',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          snippet: { title: name, description: 'Made with Jammming' },
          status: { privacyStatus: 'private' },
        }),
      }
    );

    if (!playlistResponse.ok) {
      throw new Error(`Creating the playlist failed: ${playlistResponse.status}`);
    }
    const playlist = await playlistResponse.json();

    // then add videos one at a time so they stay in order
    for (const videoId of videoIds) {
      const itemResponse = await fetch(
        'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            snippet: {
              playlistId: playlist.id,
              resourceId: { kind: 'youtube#video', videoId },
            },
          }),
        }
      );

      if (!itemResponse.ok) {
        throw new Error(`Adding a video failed: ${itemResponse.status}`);
      }
    }

    return playlist.id;
  },
};

export default YouTube;
