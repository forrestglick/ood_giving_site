import React from 'react'
import { Link } from "gatsby"
import SbEditable from 'storyblok-react'

const OodTileCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={`su-card su-card--link ood-tile-card
             ${(props.blok.image.filename && props.blok.showImage === true) ? "ood-tile-card--has-image" : "ood-tile-card--no-image"}
             ${(props.blok.backgroundColor !== "white" && props.blok.backgroundColor !== "fog-light") ? "su-text-white" : ""}`
    }>
      <a href={props.blok.link} rel="nofollow noopener" className={`ood-tile-card__link su-bg-${props.blok.backgroundColor}`}>
        {(props.blok.image.filename && props.blok.showImage === true) && (
          <figure className="su-media ood-tile-card__media">
            <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
              <img className="ood-tile-card__image" src={props.blok.image.filename} alt="" />
            </div>
          </figure>
        )}
        <section className="su-card__contents ood-tile-card__contents">
          {props.blok.superheadline && (
            <span className="ood-tile-card__superhead su-uppercase su-semibold">{props.blok.superheadline}</span>
          )}
          <h2 className="ood-tile-card__headline su-semibold">{props.blok.headline}</h2>
        </section>
      </a>
    </article>
  </SbEditable>
)

export default OodTileCard