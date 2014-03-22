dominion
========

Dominion card game engine for solitaire play

progress
--------
- Card objects implemented

> for easier and dynamic access the cards live inside the `Cards` object
> (prefer accessing by using `Cards["Copper"]` over `Cards.Copper`

- Player starting hand (3 estates, 7 coppers)
- Turn mechanics (draw card, reshuffle the discard pile)
- Init board with the "First game" preset
- Play treasure cards
- Buy cards
- Basic Game object with methods to interact with the internals
- Cellar card rule implemented; Call back based interaction introduced.
- Chapel card rule implemented;
- First game card rules


next 
----
- Action object {name: CardName, callback: function (), params: Array[]} - Find alternative to this, define an api
- Player phases; Switch phases on treasure/action card play
- Event log queue (for the views)
- Command line client
- followUp() api instead of call back for interactions
- Other cards rules