# Gocomet-Assignment

It’s a frontend assignment of Gocomet where I have created a shopping web clone using ReactJS/ Javascript.
All the features and pages which are mentioned in PDF provided in email are perfectly done.  It’s a Myntra clone and data I take from its network as dummy data.

Technology used :  ReactJs, HTML, Vanilla CSS, Javascript, Javascript Libraries

React libraries used: lodash, react-dom, react-router,  react-router-dom, react-icons, react-img-hover-zoom, react-lottie, react-modal, @tippyjs/react, react-rating-stars-component


Implemented Feature : 
1. List page
    1. Filters :  Brand filter, Colour filter and Season filter
    2. Sorting : Recommended, Low to high, High to low
    3. Search : Search Top  results
    4. Wishlist : Add items to Wishlist from listing as well as product page
    5. User can see all images like it’s in Myntra : Images show with special image loading functionality
    6. You can also see the similar products of specific product 
2. Details Page
    1. Image click should show the image and you can zoom also: Show images stack with click on image opens the modal where you can zoom the image
    2. You can select a size and add it to your bag: Select the size and add to bag and remove from bag
    3. Own version of bag:
        1. You can add to bag from listing page as well as product bag.
        2. When you click on cart, It opens the modal where all the products are listed 
        3. In same modal, you can increase the quantity of product and price will be altered in accordance.
        4. Total price will also be reflected and altered when item is added, remove and change in quantity.

Note : All the features, added item to bag, Wishlist persist until we reloads the page. Redirection from one tab to another, one page to another will not empty or loose the added or saved data as mentioned in PDF. 

Special Features: 
1. Shimmer effect when image takes time to load. When you switch between tabs, the images takes some time till then the image loader viz. shimmer will be shown in that respective view.
2. UI animations and interaction when data is empty, cart is empty, search is null and also when we redirect to unknown route, 404 animation is there.
3. Similar products is visible when we hover the listing data image and it will show all the similar products available.
4. On cart page, we can alter the price to low and high and updated price will be reflected to specific product as well as total cart price.
5. When click on any filter will update the product list at same time and when we go to specific product and comes back, the added filter will persist on product list.
6. Added item to bag, added item to Wishlist will add the product to bags and Wishlist with counter of products added and also added item will also reflects in product listing item too.
