const deleteProduct = (btn) => {
    const id = btn.parentNode.querySelector('[name="id"]').value;
    const _csrf = btn.parentNode.querySelector('[name="_csrf"]').value;

    console.log(id);
    console.log(_csrf);
};