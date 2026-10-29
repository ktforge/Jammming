# Jammming

A React app from Codecademy's Full-Stack Engineer path. You search for songs, see the title, artist, and album for each one, and put together your own playlist right on the page.

**Live site:** https://ktforge.github.io/Jammming/

## What it does

Search by song title or artist and get up to 10 results from Deezer.

Each result shows the song name, artist, and album.

Click + to add a song to your playlist. The same song can't be added twice.

Click - to take a song back out.

Click the playlist name to rename it.

No account or sign in needed.

## Built with

React 19 and Vite

CSS Modules, one per component

Deezer's public search API

GitHub Actions to build and deploy to GitHub Pages

## How to run it

1. Install Node.js if you don't have it.
2. In this folder, run npm install.
3. Run npm run dev and open the link it prints (it ends in /Jammming/).

Searching "way maker" brings back results like:

```
Way Maker (Live)
Leeland | Better Word (Live)
```

## What I learned

The project is written around Spotify, but Spotify shut off the login flow Codecademy teaches (Implicit Grant) in November 2025, and new developer apps now need a Premium account. I'm on the free plan, so I had to find another API.

I tried the YouTube Data API next. I got Google sign in working and could search and save playlists to my own channel, but anyone else signing in either hits Google's "unverified app" screen or gets blocked unless I add them as a tester. That didn't fit an app people should be able to just open and try.

I ended up on Deezer's public search. It needs no key or login and it gives back the album, which YouTube doesn't. The catch is Deezer doesn't send CORS headers, so the browser blocks a normal fetch. That's how I learned about JSONP: loading the results through a script tag that calls a function with the data.

All the state lives in App, and the children get functions like onAdd, onRemove, and onNameChange as props. Tracklist and Track never change the playlist themselves, they just ask App to. That's when one-way data flow really clicked for me.

At one point the whole page went blank. I had left export default Track off the bottom of Track.jsx, so Tracklist had nothing to import.

I also named the project folder "Jamming" with two m's at first, so I had to rename it and point my git remote at the right repo.

## Future work

Save playlists to a real music account, either Spotify if I get Premium or Deezer if it opens developer apps again.

Play the 30 second preview Deezer sends with each song.

Show album art next to each track.

Keep the playlist after a page refresh.

Built by DeVante Bush
