import React from "react"
import {css} from "@emotion/core"
import {StaticQuery, Link, graphql} from "gatsby"
import {Helmet} from "react-helmet";

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem`}}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({children}) => (
  <StaticQuery query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  }
  render={data => (
    <div
      css={css`
        margin: 3rem auto;
        max-width: 650px;
        padding: 1rem;
      `}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <header style={{ marginBottom: `1.5rem` }}>
        <Link to="/">
          <h3>{data.site.siteMetadata.title}</h3>
        </Link>
        <ul css={css`list-style: none; float: right;`}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about">About</ListLink>
          <ListLink to="/contact">Contact</ListLink>
        </ul>
      {children}
      </header>
    </div>
    )}
  />
)
