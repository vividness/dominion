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

next 
----
- ~~Implement card `play` functionality for Treasure Cards~~
- !!Player.playCard("Copper") works, Card["Copper"].play applied against the Player object~~
- Implement card `buy` functionality.
