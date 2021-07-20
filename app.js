
/*
* Global JQUERY Variables
*/
const $container = $('#gif-container');
const $form = $('#search-form');
const $input = $('#search');
const $clear = $('#clear');


async function getGIF(descrip) {
    try {
        const api_key = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"; 
        const url = "http://api.giphy.com/v1/gifs/search"; // basic URL for GIPHY search
        // submit get request with query string params of gif to search for, and API key
        const res = await axios.get(url, {params: {q : descrip, api_key}}); 

        const imageArray = res.data.data;

        if(imageArray) {
            const rand = Math.floor(Math.random() * res.data.data.length); // generate random number within length of returned gif list
            const imgSrc = (res.data.data[rand].images.original.url); // select random gif, get its giphy URL
            $container.append(`<img src=${imgSrc}>`); // make a new image with source equal to the gif URL, then append to containing div
        } else {
            alert("No GIFs found that match your search!");
        }
    } catch(e) {
        alert("A problem occured " + e.message); // if no GIFs found, alert the user
    }
}

/**
 * Event handlers for form submission, and clear button
 */
$form.submit((e) => {
    e.preventDefault();
    getGIF($input.val());
    $input.val('');
});

$clear.on('click', () => {
    $container.children().remove();
});
   


