README (OLD)

So far we have completed the ridgeplots example extension. We have adapted the example given into a constructor
function in a seperate file, to match the preexisting visualisations. We have also added an "onResize" function,
similar to the needles example, which ensures that the ridge plots stay centered and are an appropriate size
when the window has its size changed or is fullscreened. This had the side effect of introducing gaps and double
lines into the visualisation when it is resized, and so we empty the array on resize to keep it looking clean.

We intend to develop the project by adding more visualisations, as well as some more complex features such as
microphone input and the ability to record the visualisations and export them to a video format. We also want to
give the program a more professional presentation, by adjusting the menu display and changing the hotkeys used as
controls, as well as possibly adding more music choices and altering the preexisting visualisations to be more
uniform in their display. If we find a planned feature too difficult to implement, we may swap it out for a
different idea to ensure the project continues to make steady progress.