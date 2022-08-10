module Components.App where

import Prelude (pure, bind, ($))
import React.Basic.DOM as R
import React.Basic.Hooks (Component, component)
import Components.SubComp (mkSubComp)

mkApp :: Component {}
mkApp = do
  -- component "App" \_ -> React.do
  --   pure (R.text "Hellox!")
  -- bind the subcomponent(s) here
  subComp <- mkSubComp
  component "App" \_ -> React.do
    pure
      $ R.div_
          [ R.text "Helloa!"
          , R.text "Hellob!"
          , subComp 99
          , subComp 44
          ]
