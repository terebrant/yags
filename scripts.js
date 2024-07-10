/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"sIi2Hspx5aHWkUfg","label":"doomscroll","bookmarks":[{"id":"eUcJNrxHHU0D15fM","label":"r/","url":"https://www.reddit.com/"},{"id":"E7IDSA3dxSwEWKYE","label":"bsky","url":"https://bsky.app/"},{"id":"wYhDThITk4o9IFTG","label":"mastodon","url":"https://witches.town"}]},{"id":"eqSmK82cYhtCdzak","label":"tsundoku","bookmarks":[{"id":"0Nx9G3vE2XJU0784","label":"omnivore","url":"https://omnivore.app"},{"id":"px3xjSJoCRThm508","label":"rss","url":"https://www.inoreader.com/all_articles"},{"id":"Hz907y5GQM4q4A7q","label":"raindrop","url":"https://raindrop.io"},{"id":"CjAjZsoCtBccMBFg","label":"goodreads","url":"https://www.goodreads.com"}]},{"id":"65N3JTYOQPrtUAWc","label":"media","bookmarks":[{"id":"fbje0KPpCwGZxAdR","label":"yt","url":"https://www.youtube.com"},{"id":"mUoLmNaMwZaOk4Kx","label":"bandcamp","url":"https://bandcamp.com/Ashuu"},{"id":"4Rc5mssLYpkBtsJg","label":"letterboxd","url":"https://letterboxd.com"}]},{"id":"HhTe4YH1If4TxYxT","label":"dev","bookmarks":[{"id":"P2hNZ9xa4mVDGDwD","label":"musicForProgramming();","url":"https://musicforprogramming.net/latest/"},{"id":"mCbNjDb5C19gIWbr","label":"tools","url":"https://tiny-helpers.dev"},{"id":"mM85qCbWG772X3kL","label":"devdocs","url":"https://devdocs.io"},{"id":"Yqwnuzb6BDmLyqxj","label":"github","url":"https://terebrant.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
