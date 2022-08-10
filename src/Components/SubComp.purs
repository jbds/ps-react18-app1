module Components.SubComp where

import Prelude
import React.Basic.Hooks (Component, component)
import React.Basic.DOM as R

mkSubComp :: Component Int
mkSubComp =
  component "SubComp" \n ->
    pure
      $ R.div_
          [ R.text "My input value is: "
          , R.strong_ [ R.text (show n) ]
          ]
