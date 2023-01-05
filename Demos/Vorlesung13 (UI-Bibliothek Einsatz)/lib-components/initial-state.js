import { cuid } from "./cuid.js"

let initialState = {
  articles: [
    {
      id: cuid(),
      title: 'Article 1',
      summary: 'Article 1 Summary',
      display: 'none',
    },
    {
      id: cuid(),
      title: 'Article 2',
      summary: 'Article 2 Summary',
      display: 'none',
    },
    {
      id: cuid(),
      title: 'Article 3',
      summary: 'Article 3 Summary',
      display: 'none',
    },
    {
      id: cuid(),
      title: 'Article 4',
      summary: 'Article 4 Summary',
      display: 'none',
    },
  ],
  title: '',
  summary: '',
}

export { initialState }