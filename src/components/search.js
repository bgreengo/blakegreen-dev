import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"
import { rhythm } from "../utils/typography"

const Search = ({ hit }) => {
  return (
    <div>
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: `none` }} to={hit.slug}>
          <Highlight hit={hit} attribute="title" tagName="mark" />
        </Link>
      </h3>
      <small>{new Date(hit.date).toLocaleDateString()}</small>
      {/* <p
        dangerouslySetInnerHTML={{
          __html: hit.frontmatter.description || hit.excerpt,
        }}
      /> */}
      <p>
        <Highlight hit={hit} attribute="excerpt" tagName="mark" />
      </p>
    </div>
  )
}

export default Search