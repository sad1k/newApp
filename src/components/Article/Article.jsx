import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneArticle } from "../../http/articleAPI";
import Markdown from "https://esm.sh/react-markdown@9";
const Article = (props) => {
  let params = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchOneArticle(params.id).then((data) => {
      setArticle(data);
    });
});
let markdown;
  if (article) {
    markdown = `#${article.title}
        ${article.description}
        `;
  }

  return (
    <div>
      <Markdown>{markdown && false}</Markdown>
    </div>
  );
};

export default Article;
