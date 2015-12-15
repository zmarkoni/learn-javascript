#Instructions

1. In this excesise you will practice what you learned about creating an object
that "inherits from" (aka, "delegates it's behavior to") another object.
The "prototype-vs-module-vs-oloo.js" file provides you a simple definition for a 'Widget' object, as the start of a 'Button' object.

2. Finish out the definition of the 'Button' object:
    - define 'Button' so that it "inherits from" (aka, "delegates it's behavior to") from 'Widget'.
    - the Button constructor should have a 'width' and 'height' and 'label' passed to it.
    - uncomment the Button's 'render' and 'onClick' function shells, and correctly define them.
    - make the 'onClick' handler print with the console "Button ___ clicked", where "___" is that particular Button 'label'.
3. Uncomment the '$(document).ready(...)' handler at the bottom of the bottom of the file, and correct the instructions of the two button objects, so that they create buttons with 2 different sizes and labels.

4. BONUS: The code given to you is clearly in the "old style" function/constructor/new style defining objects and "inheritance". Using what we learned about "OLOO-style" code with Object.create, rewrite the code using behaviour delegation and OLOO style.