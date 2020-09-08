import React from 'react'
import Components from '../components.js';
import SbEditable from 'storyblok-react'

const GridThreeColumns = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`centered-container grid-3-column su-mb-${props.blok.bottomSpacing}`}>
        {props.blok.gridContent.map((blok) =>
          React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
        )}
      </div>
    </SbEditable>
  )
}

export default GridThreeColumns