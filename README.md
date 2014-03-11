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

next 
----
- Methods for removing points (action, buy)
- More card rules
- Encapsulation of private members in the Game object