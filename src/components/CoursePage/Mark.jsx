import Markdown from "react-markdown"
import rehypeHighlight from 'rehype-highlight'
const markdown = `
# Your markdown here
`

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('.preview')
)