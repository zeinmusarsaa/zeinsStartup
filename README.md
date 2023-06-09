# zeinsStartup
 I have added only testing to the file

 For some reason I get some error sometimes but other times I do not. This change resulted in me just printing hey to see if I would get an error

 I have made various edits to conflicttest because of the assignment and a few more to learn more accurately how to handle merge conflicts. I have also added a notes.md file to my github repo.
 

## Middle-Eastern Recipe Hub

**Introducing the Middle Eastern Recipe Hub, the ultimate application for people looking to share and learn about Middle Eastern Recipes. With this app, you can post your favorite dishes, comment on other's posts, add and message friends. You can also search for Middle Eastern Markets near you! Participate in a lively application where you can connect about food-related discussions. The sleek and modern design will be easy to navigate, join us on a culinary journey through the Middle East!**

- The reason behind my idea comes from a few things. Firstly, as a Palestinian student away from home, it is hard for me to get in contact with my family often enough to have them teach me certain recipes. The time zone difference means that I am at work when they are having dinner, then I am at school when they're going to bed. This way, I can learn on my own. Secondly, other than a few cookbooks and a couple of facebook pages, there aren't many applications or websites that have a collection of various recipes for middle-eastern dishes. It's a one-stop Middle Eastern recipe application. There is large variety in middle eastern food, and each region has influenced certain dishes differently. Through creating this application, I am able to list out different recipes, and varieties for specific dishes. This application will also have a social aspect to it, you can view posts, comment, message and even favorite certain recipes!
 
 
For this application, I would like to create different features in order to make it user friendly:

1. **Profile Page with posted recipes by the user, ability to edit old posts.**
2. **Page that allows to look through posts as though it is a newsfeed**
3. **Adding a page that filters posts based on dish name, region, and type**
4. **Messaging Board and adding friends (as well as suggested friends)**
5. **Nearest Middle-Eastern Market Locater (Google Maps)**

**Here are a few depictions or mock-up drawings of what the page will function and look like:**

<img width="500" alt="Mock up of home page" src="https://user-images.githubusercontent.com/118689776/236571511-129dccbc-cc89-49c0-8274-96543b18afef.png">
<img width="500" alt="Mock up of profile, recipe navigator, my recipes page and ME markets" src="https://user-images.githubusercontent.com/118689776/236571562-479b5968-ea3b-4a06-a17f-bbb0679bebf2.png">
<img width="500" alt="Mock up of messaging board" src="https://user-images.githubusercontent.com/118689776/236571668-3f77fee5-9bd8-4185-8445-b69db7b88112.png">


**Technologies that will be used:**
1. **Authentication:** This part of the app will be used in order to access the application features. You will have a sign up page on the homepage wich will take you to a confirmation page. You will also have a login page as well, you can log in through google or facebook.
2. **Database Data:** This application will display a rendering of Middle-Eastern dishes stored in the database. This database will keep uploading based on the posts. Users can search for recipes based on name, dish type, and region of the dish. You are also able to favorite recipes, which will be displayed on your profile page.
3. **WebSocket Data:** This application will provide real-time updates of posts on the Recipe Navigator page, real time updates of your own posts on the 'My Recipe's' page, as well as provide real-time updates on Middle-Eastern Markets near the user's location based on the ZIP code which can be edited through the profile page.

**HTML, JS, and CSS:**
1. I will use HTML in creating the structure and format of my webpage, defining the structure in headers, footers, and content areas.
2. I will use CSS in the design of my website, I plan to have different images for foods, people will be able to post and input their own images, and all that will be styled through CSS.
3. I will use Java in the interactive aspect of my site, because this is like facebook/ME recipes, I will use java in the posting, filtering, commenting and messaging aspect of my application. I will also use java for my user log-in/signup part.



## Startup HTML:
  For my HTML startup deliverable, I added a lot to my webpage.
  I began by adding elements of design to my webpage. including a background picture to the login and signup page. I made the front page the login page, but it will look way better once I advance more in HTML, CSS and Java. Both my name and Github page were linked to my index file. I added all the pages I want to include, since I overcomplicated some of the websites features, I simply don't have the skills yet to create the website fully as I wanted it to be. I had to reduce a few pages and perhaps combine some pages together. 
  1. I created the index html file which includes my login page and links to my sign up page
  2. Once you click log in or sign up, you are then taken to the profile page.
  3. The profile Page contains a favorites tab of favorited recipes, as well as a place to post recipes. I plan to include more to this tab.
  4. I included a recipe navigator page, which looks exactly like the favorites site, but will be completely different once I add more CSS and JS.
  5. I also added a ME markets near you. Google maps has an embedded code and since I am in Utah, that will show, but in the future I hope to make it according to the zipcode the user provides.


**I look forward to the websites we are making!**

 For the CSS assignments. I followed the assignments as much as I could, referring to the links when problems arose. I enjoyed the practice we had and look forward to implementing some of these parts to my own website in the future.

For the CSS Startup assignment, I have added padding and format for my pages, I made sure that all my pages had a similar format and mostly similar css files with minor changes between each. I have also added different looking buttons as I like the oval shape more, I also implemented some of the styles we used in our CSS homework, such as the navigation bar and how that looks. I implemented the resizing part as well that I learned from that assignment.

 For my Java array assignment, I utilized the information we learned as well as the example solution, and the deep dive reading in order to create the codepen for the requirements.
I implemented object classes with constructors and connect methods

For the Java aspect, I have been doing extensive research and learning through videos on how to make my website more functional, I think that if I am able to implement this website correctly, it could be a great place for people to come for ME recipes. 
I started this process by adding the button features and added the onclick attribute to the html. I then proceeded to look at different functionalities i wanted. For example, when I post, I wanted it to actually post. Although it doesn't look like what i want it to, it works for the purpose of this class. i added a window onload function, which checks the username if it's stored, and then generated a welcome message with that username. If a username is not stored or doesn't exist, it redirects you to the login page. 
It also loads the favorites tab and adds an event listener for the recipe form. The addUser function pushes a name to the database.users array i predefined. Load favorite recipes populates all favorited recipes and defines the style I want it to look like. Updating the news feed, in this section, you add a post, has a star element in order to add it to favorites, i just enjoy the way this looks more rather than putting buttons all over my page. I will be substituting the star with an actual star icon. This also adds the newest on top. when you logout, it removes the username from the database as i found that if it doesn't, it would start refreshing the page multiple times, and automatically logging you in without the ability to log out.

I have made multiple changes to my code, adding a server-side APIs in order to double check the usernames, I also added a third-party extension, the same one as the one in simon as I had to reset my entire code yesterday.I have made changes to the DB, adding code to the front, backend and adding API endpoints to each. My debugger does not work anymore, so I can't check the debugger for any mistakes. However, overall, I think my code meets the requirements

I've made my newsfeed part look more nice and more like a social media application. I still have more I want to work on. For my WS assignment, I have added a way to like and comment on posts, although the commenting is faulty. I have also implemented the chat ws to my recipe nav page as I am not sure I will be using that page for actual recipe navigation yet.
