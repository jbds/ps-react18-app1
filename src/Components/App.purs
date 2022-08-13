module Components.App where

import Prelude (pure, bind, ($), discard, unit)
import React.Basic.DOM as R
import React.Basic.Hooks (Component, component, useEffect)
import React.Basic.Hooks as React
import Components.SubComp (mkSubComp)
import Effect.Class.Console (logShow)

mkApp :: Component {}
mkApp = do
  -- component "App" \_ -> React.do
  --   pure (R.text "Hellox!")
  -- bind the subcomponent(s) here
  subComp <- mkSubComp
  component "App" \_ -> React.do
    useEffect unit do
      logShow "app() side effect"
      pure (pure unit)
    pure
      $ R.div_
          [ R.text "Helloa!"
          , R.text "Hellob!"
          , subComp 99
          , subComp 44
          ]
