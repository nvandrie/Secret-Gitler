# Secret-Gitler

Software Engineering IV Project
Made by Lily Rippeteau, Mia Siner, Nathan Van Drie, Grant Wasserman

Inspired by the social deduction game Secret Hitler. This game is protected under the Creative Commons license BY–NC–SA 4.0. All credit given to the creators of Secret Hilter. Main web page: https://secrethitler.com/. Secret Gitler was made for educational purposes only. The creators of Secret Gitler are not profiting from it commercially in any way.

<!-- Running the Game -->
<!--base directory -->

npm i

<!--Frontend -->

cd frontend
npm i
npm run dev

<!--In a seperate terminal -->
<!-- Backend -->

cd backend
npm i
npm run dev

<!--Game -->

Open up 6 tabs, log in in 6 accounts
Can use a, b, c, d, etc. as the 6 users with the passwords as the same letter
Will need to log in, log out, and log in with the new user on each screen
Inital log in attempt will automatically log in as previous user as users log in status is held in local storage
Have each 1 player create a lobby and the remaining 5 players join the game using lobby code

<!--Testing -->

Testing is under the branch 'testSuites'
cd frontend
npm test
