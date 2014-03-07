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

next 
----
- make Hand, Board and Cards objects private within Dominion module
- dominion module returns singleton Game object (Game.start(), Game.state(), Game.continue(), Game.exit())