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
    date: 2011-06-27T04:00:00.000Z,
    title: 'Hofstadter',
    safeTitle: 'Hofstadter',
    transcript: '[...]',
    altText: '[...]',
    imageURL: 'https://imgs.xkcd.com/comics/hofstadter.png',
    xkcdURL: 'https://xkcd.com/917',
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

### `xkcd.fetchRelevant(query)`
Fetches a comic relevant to query.  
`=> Promise<Comic>`  

### `xkcd.fetchAllRelevant(query)`
Fetches comics relevant to query.  
Comics are sorted by descending relevancy.  
`=> Promise<Comic[]>`  

### `comic.fetchImage()`
Fetches the image buffer of a comic.  
`=> Promise<Buffer>`  
