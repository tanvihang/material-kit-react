import React from 'react'

type TitleDescriptionProps = {
  title: string;
  description: string;
}

export default function TitleDescription({title, description}: TitleDescriptionProps): React.JSX.Element {
  return (
    <div className = "TitleDescription-component">
        <h6 className='TitleDescription-title'><b>{title}</b></h6>
        <p className='TitleDescription-description'>{description}</p>
    </div>
  )
}
