## Why I built this App?

As a historian, it is interesting to uncover what is happening today in history. In the past, I have mostly done this through google. After learning to program, I discovered that Wikimedia's API already provides the ability to extract this information from Wikipedia. All I had to do was make a simple user interface to render the datas, saving me from having to google all over again every day.

## Functionality

This is a simple web app which presents datas concerning "today in history." The Wikimedia "On this day" API provides five categories of datas concerning this theme:

- People who were born this day in history
- People who died this day in history
- Major Events happened this day in history
- Holidays on this day
- Selected major events

By clicking on the button for each category, the datas will be renderd to the website, each in a card component.

It also shows the total amount of items for each category. By default, the app renders the first six items in the selected collection. The user can choose which one he/she likes to check out by entering the number in the input form provided.

[Try Now](https://mmkrty.github.io/myprojects-history-today/)

## Difficulties encountered

The main difficulty is to handle different routes while extracting and rendering datas from the api. Presently I do that by creating a url for each. However, I believe there should be a better and more efficient way that needs less code.

## Improvements to be made

### Visually:

- A more dynamic UI: hide the rendering area before the user clicked on any button. Only shows when there are items rendered. And take the user to the rendering area automatically after the items are rendered.

### Efficiency:

- More efficient and dry code: as mentioned above, I believe I wrote too much code just to extract different categories of datas.
