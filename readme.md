# Overview
I wanted to tweak a few of the ways that the Jam integration works. Feel free to take anything that looks interesting.

# Changes
- Added isomorphic keyboard separated by fourths and set to default.
- Made the horizontal clip view default rather than the vertical to match the Bitwig view.
- By default selecting an empty slot creates a clip. I introduced a config option "selectByDefault" which instead selects the slot and track so that I can generate the clip when recording instead.
- By default the sends match the mixer view and increment with each press of the AUX button. Because I work on one track at a time when adjusting sends, I changed AUX mode to show all of the sends on the currently selected track.
