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

test('fetches all relevant without current comic', async () => {
  const currentComic = await XKCD.fetchCurrent()
  const relevantComics = await XKCD.fetchAllRelevant('random')
  const relevantIds = relevantComics.map(comic => comic.id)
  expect(relevantIds).not.toContain(currentComic.id)
})

test('fetches the latest entries with correct ids', async () => {
  const latestComic = await XKCD.fetchCurrent()
  const actual = await XKCD.fetchNLatest(3)
  const actualIds = actual.map(comic => comic.id)
  expect(actualIds).toEqual([latestComic.id, latestComic.id - 1, latestComic.id - 2])
})

test('fetches latest entries with offset', async () => {
  const latestComic = await XKCD.fetchCurrent()
  const offset = 10
  const actual = await XKCD.fetchNLatest(3, offset)
  const actualIds = actual.map(comic => comic.id)
  expect(actualIds).toEqual([latestComic.id - offset, latestComic.id - offset - 1, latestComic.id - offset - 2])
})