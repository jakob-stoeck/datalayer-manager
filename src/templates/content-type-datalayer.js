import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {css} from "@emotion/core"

const Tableify = ({values}) => {
  if (!(values && values[0])) return null;
  const columns = Object.keys(values[0])
  return (
    <table>
      <thead>
        {columns.map((column, index) => <th key={index}>{column}</th>)}
      </thead>
      <tbody>
        {values.map((value, i) => (<tr key={i}>{columns.map((column, j) => <td key={`$i $j`}>{value[column]}</td>)}</tr>))}
      </tbody>
    </table>
  )
}

export default ({data}) => {
  const node = data.contentfulDataLayer
  return (
    <Layout>
      <h2>DataLayer: {node.name}</h2>
      <h3>Pages</h3>
      <Tableify values={node.pages} />
      <h3>Events</h3>
      <Tableify values={node.events} />
      <h3>Components</h3>
      <Tableify values={node.components} />
      <h2>JSON</h2>
      <pre><code>
        {JSON.stringify(node, null, 2)}
      </code></pre>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    contentfulDataLayer(id: {eq: $id}) {
      name
      pages {
        pageType
        breadcrumb
        geoRegion
        language
      }
      events {
        eventId
        eventLabel
        eventValue
      }
      components {
        brand
        domain
        category
      }
    }
  }
`
