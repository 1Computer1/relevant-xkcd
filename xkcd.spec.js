const XKCD = require('./xkcd')

test('fetches the correct comic', async () => {
  const comic = await XKCD.fetchComic(111)
  const expected = new XKCD.Comic({
    num: 111,
    day: 5,
    month: 6,
    year: 2006,
    title: 'Firefox and Witchcraft - The Connection?',
    safe_title: 'Firefox and Witchcraft - The Connection?',
    transcript: 'membership in wicca\n'
    + 'total firefox downloads\n'
    + '[[positive slope graph]]\n'
    + '[[Internet Explorer icon]]\n'
    + 'Keep the Faith\n'
    + '[[Outline of a cross]]',
    alt: 'ThisadpaidforbythecounciltopromoteMicrosoftandChristianity.  Remember, The Bible is Closed Source.',
    img: 'https://imgs.xkcd.com/comics/firefox_wicca.png',
  })
  expect(comic).toEqual(expected)
})
