# Relevant XKCD
Simple XKCD comic fetcher.  
Uses Promises and not callbacks!  

## Example

```js
const xkcd = require('relevant-xkcd');
xkcd.fetchRelevant('meta').then(console.log);
```

## Output

```js
  {
    id: 917,
    day: 27,
    month: 6,
    year: 2011,
    date: 2011-06-27, // Date object.
    title: 'Hofstadter',
    safeTitle: 'Hofstadter',
    transcript: '[...]', // Too long for here!
    altText: '[...]',
    xkcdURL: 'https://xkcd.com/917',
    imageURL: 'https://imgs.xkcd.com/comics/hofstadter.png',
    explainURL: 'http://www.explainxkcd.com/wiki/index.php/917'
  }
```

## Methods

### `xkcd.fetchComic([id])`
Fetches a comic.  
ID can be left blank for current comic.  
`=> Promise<Comic>`  

### `xkcd.fetchCurrent()`
Fetches the current comic.  
`=> Promise<Comic>`  

### `xkcd.fetchRandom()`
Fetches a random comic.  
`=> Promise<Comic>`  

### `xkcd.fetchRelevant(query)`
Fetches a comic relevant to query.  
Uses [Relevant XKCD](https://relevantxkcd.appspot.com/).  
`=> Promise<Comic>`  

### `xkcd.fetchAllRelevant(query)`
Fetches comics relevant to query.  
Comics are sorted by descending relevancy.  
`=> Promise<Comic[]>`  

### `comic.fetchImage()`
Fetches the image buffer of a comic.  
`=> Promise<Buffer>`  
