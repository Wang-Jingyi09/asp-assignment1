# asp-assignment 1
 
Name: Jingyi Wang

## Overview

## Features

1. mustWatch tests
   

1. filtering tests


1. add reviews tests

   This code in addReviews.cy.js first visits the home page and selects a movie as a favorite. Then jump to
   the Favorites page and click the Add Comment icon to go to the comment form page. Then fill in the comments and submit. Finally, check whether a successful submission message is displayed, and jump back to the favorites page by clicking on any location to confirm.
   Then I add a className "write-review-icon" in components/cardIcons/writeReview.js to locate this icon,


1. pagination tests

To ensure that the movies that appear on the first page don't appear on the second page, I store the movie titles loaded on the first page in an array, and then verify that those titles don't appear in the movie list on the second page after switching to the second page.
    


1. actor navigation tests

The test directly navigates to a movie detail page
Remove the target attribute to ensure the link opens in the same tab. After clicking the link, the script checks if the current URL includes the path /person/2037-cillian-murphy, confirming that the navigation to the actor's TMDB page occurred as expected.

A className '.cast-list' selector is added in components/movieDetails/index.js to assert the existence of the cast list.


