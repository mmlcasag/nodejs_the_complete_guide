const deleteProduct = (btn) => {
    const id = btn.parentNode.querySelector('[name="id"]').value;
    const _csrf = btn.parentNode.querySelector('[name="_csrf"]').value;

    console.log(id);
    console.log(_csrf);

    fetch('/admin/product/' + id, {
        method: 'DELETE',
        // we need to pass the csrf somehow
        // and since these requests don't have a body
        // we can send them in the headers
        headers: {
            'csrf-token': _csrf
        }
    })
    // this request returns a promise
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
};