import React from 'react'
import Layout from './src/components/Layout'
import './src/styles/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './src/styles/style.css'
import Modals from './src/components/Modals'
import { AvailableModalsViews, useBrowserStore } from './src/store'

// Logs when the client route changes
export function onRouteUpdate({ location, prevLocation }) {
  console.log('[Layout] render')
  console.log('[gatsby-browser]@onRouteUpdate new pathname', location)
  // update zustand with search params, if any
  if (location.search) {
    const params = new URLSearchParams(location.search)
    const view = params.get('view')
    if (AvailableModalsViews.includes(view)) {
      console.log('[gatsby-browser]@onRouteUpdate view:', view)
      useBrowserStore.setState({ view })
    } else {
      console.log(
        '[gatsby-browser]@onRouteUpdate view not recognized, close everything:',
        view
      )
      useBrowserStore.setState({ view: null })
    }
  } else {
    useBrowserStore.setState({ view: null })
  }
}

// Wraps every page in a component
export function wrapRootElement({ element, props }) {
  console.log('[gatsby-browser]@wrapRootElement')
  return (
    <>
      <Modals />
      <Layout {...props}>{element}</Layout>
    </>
  )
}
