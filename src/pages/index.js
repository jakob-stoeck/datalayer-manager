import React from "react"
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"
import {css} from "@emotion/core"


const PostList = ({node}) => (
  <div>
    <h3 css={css`margin-bottom: 0.25rem;`}><Link to={node.fields.slug}>{node.frontmatter.title}</Link> - {node.frontmatter.date}</h3>
    <p>{node.excerpt}</p>
  </div>
)

const ContentfulList = ({node}) => (
  <li>
    <h3 css={css`margin-bottom: 0.25rem;`}><Link to={`/page/${node.id}`}>{node.name}</Link> - Last update: {node.updatedAt}</h3>
  </li>
)


export default ({data}) => (
  <Layout>
    <img style={{maxWidth: `100%`}} src="https://source.unsplash.com/random/800x600" alt="Random!" />
    <h2>All Contentful DataLayers</h2>
    <ul>
    {data.allContentfulDataLayer.edges.map(({node}) => (
      <ContentfulList node={node} key={node.id} />
    ))}
    </ul>
    {/* These are Markdown files which you may statically
    <h2>{data.allMarkdownRemark.totalCount} Blog Posts</h2>
    {data.allMarkdownRemark.edges.map(({node}) => (
      <PostList node={node} key={node.id} />
    ))}
    */}
  </Layout>
)

export const query = graphql`
{
  allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
    totalCount
    edges {
      node {
        id
        fields {
          slug
        }
        excerpt
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
        }
      }
    }
  }
  allContentfulDataLayer(sort: {fields: updatedAt, order: DESC}) {
    edges {
      node {
        id
        updatedAt(formatString: "DD MMMM, YYYY @ HH:mm Z")
        name
      }
    }
  }
}
`
