export function displayModal(e) {
    const modal = document.querySelector('#contact_modal');
    console.log(e);
    const mask = document.createElement('div');
    mask.setAttribute('id', 'mask')
    modal.appendChild(mask);
    // console.log(e.target);
	modal.style.display = "block";
}

export function closeModal(e) {
    // console.log(e.target.parentNode.parentNode);
    const modal = e.target
        .parentNode.
        parentNode.parentNode;
    const mask = document.querySelector('#mask');
    modal.removeChild(mask);
    modal.style.display = "none";
}


