import React from 'react'
import './Card.css'

export default function Card({ as:Tag='div', href, target='_blank', rel='noreferrer', children, className='' }){
  const classes = ['card', className].filter(Boolean).join(' ')
  if(href){
    return <a className={classes} href={href} target={target} rel={rel}>{children}</a>
  }
  return <Tag className={classes}>{children}</Tag>
}
