async function handleUserSingUp(
    request,
    response,
) {
    response.status(200).send({ status: 1, msg: "handleUserSingUp page"});
}

async function handleUserSingIn(
    request,
    response,
) {
    response.status(200).send({ status: 1, msg: "handleUserSingIn page"});
}


module.exports = { handleUserSingUp, handleUserSingIn };