import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data: {contentfulPage: page} }) => {
  return (
    <Layout>
      <div>
        <h1>{page.name}</h1>
        <p><Link to={page.pageInfo.destinationUrl}>{page.pageInfo.destinationUrl}</Link></p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    contentfulPage(id: {eq: $id}) {
      name
      pageInfo {
        destinationUrl
      }
    }
  }
`
