import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";


export default class blogPost extends Component {
  render() {
    const data = this.props.data.contentfulBlogs;

    const siteurl = this.props.data.contentfulSiteInformation.siteUrl + "/";
    const twiteerhandle = this.props.data.contentfulSiteInformation
      .twiteerHandle;
    const socialConfigss = {
      site: {
        siteMetadata: { siteurl, twiteerhandle }
      },
      title: data.title,
      slug: data.slug
    };
    const style = {
      padding: '5px',
      border: '2px solid'
    };
    let output = data.tags.map(e => e.split(' ').map(f => <span style= {style}> {f} </span>));
    return (
      <Layout>
        <SEO
          title={data.title}
          keywords={[
            `Blake Green`,
            `Cloud Architect`,
            `${data.title}`
          ]}
        />
        <div className="site-container blog-post">
          <div className="container">
            <Img
              className="feature-img"
              fixed={data.featureImage.fluid}
              objectFit="cover"
              objectPosition="50% 50%"
            />
            <div className="details">
              <h1 className="title">{data.title}</h1>
              <span className="date">
                <i class="fas fa-calendar-alt"></i>{" "}
                {moment(data.date).format("LL")}
              </span>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description.childMarkdownRemark.html
                }}
              />
              <div className="tags">
                <i className="fas fa-tags"></i>{" "}
                {output}
              </div>
            </div>
            <Share
              socialConfig={{
                ...socialConfigss.site.siteMetadata.twiteerhandletitle,
                config: {
                  url: `${siteurl}${socialConfigss.slug}`,
                  title: `${socialConfigss.title}`
                }
              }}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query SinglePostQuery($slug: String!) {
    contentfulBlogs(slug: { eq: $slug }) {
      id
      title
      slug
      featureImage {
        fluid(maxWidth: 1500) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      createdAt
      date
      tags
    }
    contentfulSiteInformation {
      siteUrl
      twiteerHandle
    }
  }
`;
