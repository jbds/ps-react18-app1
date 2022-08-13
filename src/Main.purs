module Main where

import Prelude
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Exception (throw)
import React.Basic.DOM.Client (createRoot, renderRoot)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toNonElementParentNode)
import Web.HTML.Window (document)
import Components.App (mkApp)
import Effect.Console (logShow)

main :: Effect Unit
main = do
  doc <- document =<< window
  root <- getElementById "root" $ toNonElementParentNode doc
  case root of
    Nothing -> throw "Could not find root."
    Just container -> do
      reactRoot <- createRoot container
      app <- mkApp
      logShow "app render start"
      renderRoot reactRoot (app {})
      logShow "app render end"
