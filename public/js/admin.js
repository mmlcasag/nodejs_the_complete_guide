const deleteProduct = (btn) => {
    const id = btn.parentNode.querySelector('[name="id"]').value;
    const _csrf = btn.parentNode.querySelector('[name="_csrf"]').value;

    console.log(id);
    console.log(_csrf);

    // this fetch request returns a promise
    fetch('/admin/product/' + id, {
        method: 'DELETE',
        // we need to pass the csrf somehow
        // and since these requests don't have a body
        // we can send them in the headers
        headers: {
            'csrf-token': _csrf
        }
    })
    // so we handle it here
    .then(result => {
        // as you can see in the log it doesn't really return my response
        // instead it returns a lot of stuff
        console.log(result);
        // in order to get my response, we need to do that
        // and this json() method also returns a promise
        return result.json();
    })
    // so we handle it here
    .then(data => {
        // and here it is my response
        console.log(data);

        // and now we need to remove the entire element from the screen
        // because we have already deleted the document from the database
        // so first we need to fetch the entire "tr" tag and its content
        const productRow = btn.closest('tr');
        console.log(productRow);
        // and this is how we remove the element from the DOM
        // we need to go up one level and then remove the child element
        productRow.parentNode.removeChild(productRow);
    })
    .catch(err => {
        console.log(err);
    });
};