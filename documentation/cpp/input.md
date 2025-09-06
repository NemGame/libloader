# Input documentation
### I didn't like how `cin` would jump to a new line every time Enter was pressed, before any other character was
### Let's say the instructions are: [Enter, Enter, W, A, S, D, Enter]
### `cin` would do: newline, newline, W, A, S, D, return WASD
### My solution does: returns ""
### Because Enter is also called Return, so I believe it should return stuff when it's pressed
## Functions
### input(string pre="", string post="\n") - Uses hyper-super-future-technology (`_getch()`) to get characters from the user, until Enter (Return) is pressed, compatible with Backspace
### inputLong(string pre="", string post="\n") - Calls `input(pre, post)` and converts the output to a long
### inputInt(string pre="", string post="\n") - Returns `inputLong(pre, post)`, but the compiler SHOULD turn the value into an integer
