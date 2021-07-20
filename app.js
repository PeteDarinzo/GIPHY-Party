
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
        console.log(res.status);

        const imageArray = res.data.data;

        if(imageArray.length > 0) {
            const rand = Math.floor(Math.random() * imageArray.length); // generate random number within length of returned gif list
            const imgSrc = (imageArray[rand].images.original.url); // select random gif, get its giphy URL
            $container.append(`<img src=${imgSrc}>`); // make a new image with source equal to the gif URL, then append to containing div
        } else {
            alert("No GIFs found that match your search!");
        }
    } catch(e) {
        if(e.response) {
            alert("404 PAGE NOT FOUND");
        } else if(e.request) {
            alert("NETWORK ERROR");
        }
    }
}

/**
 * Event handlers for form submission, and clear button
 */
$form.submit((e) => {
    e.preventDefault();
    if($input.val()) {
        getGIF($input.val());

    } else {
        alert("Enter a gif to search for!");
    }
    $input.val('');
});

$clear.on('click', () => {
    $container.children().remove();
});
   


