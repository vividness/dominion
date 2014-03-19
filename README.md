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
- Chancellor rules
- Market rules
- Militia
- Mine
- Moat
- Remodel
- Smithy
- Village
- Woodcutter


next 
----
- Implement the rules for the first game set of cards
- Action object {name: CardName, callback: function (), params: Array[]}
- Player phases
- Event log queue (for the views)
