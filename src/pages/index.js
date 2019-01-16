import React from "react"
import {graphql, Link} from "gatsby"
import Header from "../components/header"
import Layout from "../components/layout"
import {css} from "@emotion/core"


const PostList = ({node}) => (
  <div>
    <h3 css={css`margin-bottom: 0.25rem;`}><Link to={node.fields.slug}>{node.frontmatter.title}</Link> - {node.frontmatter.date}</h3>
    <p>{node.excerpt}</p>
  </div>
)

const ContentfulList = ({page}) => (
  <div>
    <h3 css={css`margin-bottom: 0.25rem;`}><Link to={`/page/${page.id}`}>{page.name}</Link></h3>
  </div>
)


export default ({data}) => (
  <Layout>    
    <div>
      <Header headerText="Hi there!" />
      <p>What a world.</p>
      <img src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg" alt="" />
    </div>
    <h2>All Contentful Pages</h2>
    {data.allContentfulPage.edges.map(({node: page}) => (
      <ContentfulList page={page} key={page.id} />
    ))}
    <h2>{data.allMarkdownRemark.totalCount} Blog Posts</h2>
    {data.allMarkdownRemark.edges.map(({node}) => (
      <PostList node={node} key={node.id} />
    ))}
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
  allContentfulPage {
    edges {
      node {
        id
        name
        pageInfo {
          destinationUrl
        }
      }
    }
  }
}
`
