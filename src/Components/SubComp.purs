module Components.SubComp where

import Prelude
import Effect.Class.Console (logShow)
import React.Basic.DOM as R
import React.Basic.Events (handler_)
import React.Basic.Hooks (Component, component, useEffect, useState, (/\))
import React.Basic.Hooks as React

-- mkSubComp :: Component Int
-- mkSubComp = do
--   component "SubComp" \n -> do
--     pure
--       $ R.div_
--           [ R.text "My inputx value is: "
--           , R.strong_ [ R.text (show n) ]
--           ]
mkSubComp :: Component Int
mkSubComp = do
  component "SubComp" \n -> React.do
    count /\ setCount <- useState 0
    useEffect n do
      logShow n
      pure mempty
    let
      handleClick = handler_ <<< setCount
    pure
      $ R.div_
          [ R.button { onClick: handleClick (_ - 1), children: [ R.text "-" ] }
          , R.div_ [ R.text (show count) ]
          , R.button { onClick: handleClick (_ + 1), children: [ R.text "+" ] }
          ]
